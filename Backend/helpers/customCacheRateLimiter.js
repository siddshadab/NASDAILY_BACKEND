var moment = require("moment");
var cache = require('../cache_plugin_custom/cache_custom.js')();
var config = require("../config");


const WINDOW_SIZE_IN_SECONDS = config.APP.THROTTLINGCOUNTINSEC;
const MAX_WINDOW_REQUEST_COUNT = config.APP.THROTTLINGCOUNTPERSEC;


const customCacheRateLimiter = (req, res, next) => {
  try {
    const currentRequestTime =  moment().format("YYYY-MM-DD HH:mm:ss"); 
    console.log(currentRequestTime)   
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);    
    // fetch records of current user using IP address, returns null when no record is found
    let record = cache.get(ip)
    if(record){
      // if record is found, parse it's value and calculate number of requests users has made wirhin the last window
      let data = JSON.parse(record);
      console.log(data)     
      let lastStoredDateTime = data.requestTimeStamp
        let req10SecAdd = moment(lastStoredDateTime).add(WINDOW_SIZE_IN_SECONDS, 'seconds').format('YYYY-MM-DD HH:mm:ss')        
        console.log("req10SecAdd",req10SecAdd)
        console.log("currentRequestTime",currentRequestTime)
         if(req10SecAdd > currentRequestTime && data.requestCount<MAX_WINDOW_REQUEST_COUNT){
          data.requestCount=data.requestCount+1 
          cache.set(req.ip, JSON.stringify(data));
          next()          
         }  else{     
          if(req10SecAdd < currentRequestTime) {
              let requestLog = {
                requestTimeStamp: moment().format("YYYY-MM-DD HH:mm:ss"),
                requestCount: 1
              };        
              cache.set(req.ip, JSON.stringify(requestLog)); 
            }
            res.json({code: 429, error_message: `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_SECONDS} seconds limit!`});                 
                  
         }             
         
      
    }else{      
      console.log(record);
      //  if no record is found , create a new record for user and store to Cache
      if (record == null) {
        
        let requestLog = {
          requestTimeStamp: moment().format("YYYY-MM-DD HH:mm:ss"),
          requestCount: 1
        };        
        cache.set(req.ip, JSON.stringify(requestLog));
        next();
      }
    }
    
  } catch (error) {
    next(error);
  }
};

module.exports = customCacheRateLimiter;
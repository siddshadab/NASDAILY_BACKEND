const express = require('express')
const app = express();
var bodyParser      = require("body-parser")
var methodOverride  = require("method-override")
var cors = require('cors')
require('dotenv').config()
var Constant = require("./helpers/Constant.js");
var customCacheRateLimiter = require("./helpers/customCacheRateLimiter.js");
var errorHandler = require("./helpers/errorHandler.js");
var config = require("./config");
var logger = require("./helpers/logger.js");
var car_parkin_system = require("./routes/car_parkin_system")


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride("_method"));
app.use(customCacheRateLimiter);





app.use("/api/v1/car_parking_system", car_parkin_system)


app.get("/", function(req, res){
    console.log("Dummy Server Test")
    res.send("Dummy Server Test");
})

app.listen(config.APP.PORT, () => {  
  console.log(config.APP.PORT)
  Constant.AVAILABLESLOT=[]
  Constant.CAR=[]
  Constant.CACHE={}
  //try {
      Constant.MAXSIZE = parseInt(config.APP.NOOFSLOT);
    //} catch (e) {
      console.log("Parameter is not a number!")
    //}
       
    for (let i = 1; i <= Constant.MAXSIZE; i++) {
      Constant.AVAILABLESLOT.push(i)
    }
    console.log(`Created a parking lot with ${Constant.AVAILABLESLOT} slots`); 
      console.log(`Dummy app listening on port ${config.APP.PORT}!`)
  
});


// // Initialize Global Error Handlers
app.use(errorHandler);
process.on('unhandledRejection', (reason, promise) => {
  throw reason;
});

process.on('uncaughtException', error => {
  logger.error(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
  // process.exit(1);
});

process.on('SIGINT', () => {
  logger.info(' Alright! Bye bye! ShutDownHooks');
  process.exit();
});
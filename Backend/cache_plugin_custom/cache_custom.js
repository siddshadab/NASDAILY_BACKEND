var Constant = require("../helpers/Constant.js");

var memoryCache = module.exports = function () {	
	return {
		get: function (key) { return Constant.CACHE[key]; },
		set: function (key, val) { 
			// if(!Constant.CACHE.hasOwnProperty(key)){
			// 	console.log('!!!!!', Constant.CACHE[key]);
			// 	console.log('!!!!!', key); 
			// 	Constant.CACHE[key] = val; 
			// }else{
			// 	console.log('delete', Constant.CACHE[key]);                 
			// 	console.log('delete', key); 
			// 	delete Constant.CACHE[key]
				Constant.CACHE[key] = val; 
				console.log('CCCCCC', key); 
				console.log('CCCCCC', Constant.CACHE[key]); 
			//}
			
		}
	}
  }
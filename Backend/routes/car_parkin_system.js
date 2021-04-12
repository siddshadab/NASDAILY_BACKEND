var express = require('express')
var router = express.Router()
var services = require('../services/car_parkin_system.js')

// router.route("/")
//     .get(services.getDummyRequest)

router.route("/")
    .get(services.getCarDetailsOnParams)    
    .post(services.parCar)    
    .delete(services.unParCar)

module.exports = router
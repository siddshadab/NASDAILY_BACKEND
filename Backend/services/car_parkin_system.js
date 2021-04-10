var Constant = require("../helpers/Constant.js");
const utils = require('../helpers/utils.js');


exports.getDummyRequest = function(req,res){    
    res.send('Hello World1111111111111!')
}

exports.parCar = async function(req,res){
    //IN case if slots is not initialize on server startup
    if (Constant.MAXSIZE === 0) {
        res.send(`parking lot is not initiated`);
      } else if (Constant.MAXSIZE === Constant.CAR.length) {
          //IF parking lot is full return this message 
          res.send(`Please Connect with Support Team as Parking Lot seems to be Full`);
      }else if(req.body.registratonNo===undefined){
        res.send(`Please Add Registartion Number before requesting`);
      }
      
      
      let carrObject = await utils.searchCarPresent(Constant.CAR,req.body.registratonNo)
      console.log(carrObject)
     //  if (carrObject.isPresent===true) {
        if (carrObject===true) {
           //IF parking lot is full return this message 
           res.send(`Car Already present in parking Slot: ${carrObject.slot}`);
      } else {
        let slot = Constant.AVAILABLESLOT[0];
        Constant.CAR.push({
          'slot': slot,
          'registratonNo': req.body.registratonNo,          
        });       
        Constant.AVAILABLESLOT.shift();
        res.send(`Allocated slot number: ${slot}`)
      }
}

exports.unParCar = async function(req,res){
    slot = parseInt(req.body.slot);
    //IN case if slots is not initialize on server startup
    if (Constant.MAXSIZE === 0) {
        res.send("parking lot is not initiated");
    } else if (Constant.CAR.length > 0) {  
      if (await utils.search(slot, 'slot', Constant.CAR)) {  
        Car = await utils.remove(slot, 'slot', Constant.CAR);  
        // Push SLot NOW After car gets removed  
        Constant.AVAILABLESLOT.push(slot);
        Constant.AVAILABLESLOT.sort();
        res.send(`Slot  numbmer ${slot} is free`);  
      } else {
        res.send(` Slot ${slot} is already  empty `);
      }
  
    } else {
        res.send(`Parking lot is empty`)
    }
}

exports.getCarDetailsOnParams = function(req,res){    
    var slot
    var registratonNo
    try {
        slot = parseInt(req.query.slot);    
    } catch (error) {        
    }    
        registratonNo = req.query.registratonNo;       
        //IN case if slots is not initialize on server startup
        if (Constant.MAXSIZE === 0) {
            res.send("parking lot is not initiated");
          } else if (Constant.CAR.length > 0) {
        let resultSet;
        Constant.CAR.forEach(function (row) {
          if (row.registratonNo === registratonNo) {
              if(slot && row.slot!==slot){
                resultSet = `Please Provide Either Slot/Car Number Or both Should be correct, Given Slot is diffrent than which car is parked`;
              }else{
                resultSet = `Slot Number : ${row.slot} having car Parked ${row.registratonNo}`;
              }            
          }else if (row.slot === slot) {
            if(registratonNo && row.registratonNo!==registratonNo){
                resultSet = `Please Provide Either Slot/Car Number Or both Should be correct, Given Car Number is diffrent than where car is parked`;
              }else{
                resultSet = `Slot Number : ${row.registratonNo} having car Parked ${row.registratonNo}`;
              }

          }else if (row.registratonNo === registratonNo && row.slot === slot) {
            resultSet = `Slot Number : ${row.slot} having car Parked ${row.registratonNo}`;
          }
        });
        if (resultSet === undefined) return `Not found`
        res.send(resultSet);
      } else {
        res.send(`Not found`)
      }
}
const express = require('express')
const app = express();
var bodyParser      = require("body-parser")
var methodOverride  = require("method-override")
var cors = require('cors')
require('dotenv').config()
var Constant = require("./helpers/Constant.js");




var port = process.env.PORT || 8000


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride("_method"));





var car_parkin_system = require("./routes/car_parkin_system")
app.use("/api/nasdaily", car_parkin_system)


app.get("/", function(req, res){
    console.log("Dummy Server Test")
    res.send("Dummy Server Test");
})

app.listen(port, () => {

    console.log(process.env.NOOFSLOT)
    Constant.AVAILABLESLOT=[]
    Constant.CAR=[]
    try {
        Constant.MAXSIZE = parseInt(process.env.NOOFSLOT);
      } catch (e) {
        console.log("Parameter is not a number!")
      }
         
      for (let i = 1; i <= Constant.MAXSIZE; i++) {
        Constant.AVAILABLESLOT.push(i)
      }
      console.log(`Created a parking lot with ${Constant.AVAILABLESLOT} slots`);
      console.log(`Dummy app listening on port ${port}!`)
  
});
#How to use this repository

Install all dependencies  "npm install"

Requirements
Node.js Express,

Startup up a project like so...
Changes to be done on .env file
Run the main program "npm start"


Problem Statement/Implementation Details
Data:
● Registration numbers of all cars which is park or to be parked.
● Slot Number where car is parked
● Slot Number where new Coming car can be parked
● Error scenarios coverd on bases of probabilties
● Get slots details if empty
● Park a Car
● Get car details if parked
● Checkout car
● Throttling of 10 second (Which is implemented by own)

APIs

/api/v1/car_parking_system    api having three method access [get,post,delete]
get api  /api/v1/car_parking_system   (?registratonNo=123 Or ?slot=123 ) (?registratonNo=123 And ?slot=123 )        - 
Post api  /api/v1/car_parking_system   req.body.registratonNo         - 
delete api  /api/v1/car_parking_system   req.body.slot

Throttling is based on evn on seconds bases, default is 10 seconds  





You can also interact with the API using command line tools such as curl. For example, to list the match endpoint:

Project created using Vs Code IDE

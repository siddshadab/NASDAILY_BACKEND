
class Constant {    

    constructor(CAR,MAXSIZE,AVAILABLESLOT,CACHE) {      
      this.CAR = CAR; 
      this.MAXSIZE = MAXSIZE; 
      this.AVAILABLESLOT = AVAILABLESLOT; 
      this.CACHE = CACHE;
    } 

    //TODO Dont call Var directly use it from functions later (Now using it dirctly from memory leakage)
  
    static getCar() {
      console.log(this.CAR);
      return this.CAR
    }

    static getSize() {
        console.log(this.MAXSIZE);
        return this.MAXSIZE
      }

      static getAvalableSlot() {
        console.log(this.AVAILABLESLOT);
        return this.AVAILABLESLOT
      }
  }
  
  module.exports = Constant;
  
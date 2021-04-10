let search = async (slot, prop, carArray) => {
    for (var i = 0; i < carArray.length; i++) {
      if (carArray[i][prop] === slot) {
        return carArray[i];
      }
    }
    return false;
  }
  
  let remove = async (slot, prop, carArray) => {
    var i = carArray.length;
    while (i--) {
      if (carArray[i]
        && carArray[i].hasOwnProperty(prop)
        && (arguments.length > 2 && carArray[i][prop] === slot)) {
        carArray.splice(i, 1);
      }
    }
    return carArray;
  }

  let searchCarPresent = async (carArr,registratonNo) => {
    if (carArr.some(e => e.registratonNo === registratonNo)) {
      return true
    }
    return false;
  }

  module.exports = {
    search,
    remove,
    searchCarPresent
  }
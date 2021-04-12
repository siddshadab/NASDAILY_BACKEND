require('dotenv').config()


const loadEnvVariable = envName => {
  const env = process.env;
  if (env == null) {
    throw new Error(`Environment variable => ${envName} is undefined.`);
  }
  return env;
};

const config = {
  APP: {
    //PORT: loadEnvVariable('PORT') || 8080,
    //NOOFSLOT:loadEnvVariable('NOOFSLOT') || 10,
    PORT: process.env.PORT || 8080,
    NOOFSLOT:process.env.NOOFSLOT || 10,
  },   
};


module.exports = config;

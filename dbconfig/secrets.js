
// 1. Import ENV using dotenv module and export the properties 
require('dotenv').load()

let MONGO_DB;
if(process.env.NODE_ENV == 'production'){
    MONGO_DB = process.env.MONGO_DB_PROD;
}
else{
	MONGO_DB = process.env.MONGO_DB_DEV;
}

module.exports = {
    DATABASE: MONGO_DB,
    JWT_SECRET: process.env.JWT_SECRET,
    twitter:{
        consumerKey: process.env.CONSUMERKEY,
        consumerSecret: process.env.CONSUMERSECRET,
        callbackUrl: process.env.CALLBACKURL
    }

};
//map Global promise - get rid or warning

//connect databse

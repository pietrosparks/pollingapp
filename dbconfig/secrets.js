
// 1. Import ENV using dotenv module and export the properties 
require('dotenv').load()

let MONGO_DB;
if(process.env.NODE_ENV == 'production'){
    MONGO_DB = process.env.MONGOLAB_URI;
    BASEURL = process.env.BASEURL_PROD
    
}
else{
    MONGO_DB = process.env.MONGO_DB_DEV;
    BASEURL = process.env.BASEURL_DEV
}

module.exports = {
    DATABASE: MONGO_DB,
    JWT_SECRET: process.env.JWT_SECRET,
    BASEURL:BASEURL,
    twitter:{
        consumerKey: process.env.CONSUMERKEY,
        consumerSecret: process.env.CONSUMERSECRET,
        callbackUrl: process.env.CALLBACKURL
    }

};
//map Global promise - get rid or warning

//connect databse

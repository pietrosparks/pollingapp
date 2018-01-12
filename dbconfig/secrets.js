
// 1. Import ENV using dotenv module and export the properties 
require('dotenv').load()

let MONGO_DB;
if(process.env.NODE_ENV == 'production'){
    MONGO_DB = process.env.MONGO_DB_DEV;
}
else{
	MONGO_DB = 'mongodb://localhost/polling-app';
}

module.exports = {
    DATABASE: MONGO_DB,
    JWT_SECRET: process.env.JWT_SECRET,

};
//map Global promise - get rid or warning

//connect databse

/* 2 Import Secrets and use it to create a database and 
 export the connect function to be called in express
 */

var mongoose = require('mongoose'),
  secrets = require('./secrets'),
  databaseConnect = mongoose.connection;
  
mongoose.Promise = global.Promise;

mongoose.connect(secrets.DATABASE, {
  useMongoClient: true
})

module.exports = {
  connect() {
    databaseConnect.on('error', console.error.bind(console, "MongoDB Connection error"));
    databaseConnect.once('open', () => {
      console.log("Connected to PollingApp Db")
    })
  }
}

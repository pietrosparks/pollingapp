const functions = require('../utils');
const _ = require('lodash');


var Users = require('../models/user')
var Poller = require('../models/poller')


module.exports = (express)=>{

    const api = express.Router();
    
    require('./auth')(api, Users, functions, _, Poller);

    return api
}
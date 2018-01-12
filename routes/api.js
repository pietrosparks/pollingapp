const functions = require('../utils');
const _ = require('lodash');
const JWT = require('jsonwebtoken');
const twitter = require('node-twitter-api');
const bluebird = require('bluebird');


var Users = require('../models/user')
var Poller = require('../models/poller')


module.exports = (express)=>{

    const api = express.Router();
    
    require('./auth')(api, Users, functions, _, Poller, twitter, Promise);

    return api
}
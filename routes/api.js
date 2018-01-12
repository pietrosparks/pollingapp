const functions = require('../utils');
const _ = require('lodash');
const JWT = require('jsonwebtoken');
const Twitter = require('node-twitter-api');
const bluebird = require('bluebird');
const secret= require ('../dbconfig/secrets');


var Users = require('../models/user')
var Poller = require('../models/poller')


module.exports = (express)=>{

    const api = express.Router();
    
    require('./auth')(api, Users, functions, _, Poller, Twitter, bluebird, secret);

    return api
}
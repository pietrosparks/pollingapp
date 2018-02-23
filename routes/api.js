const functions = require('../utils');
const _ = require('lodash');
const JWT = require('jsonwebtoken');
const Twitter = require('node-twitter-api');
const bluebird = require('bluebird');
const secret= require ('../dbconfig/secrets');


var Users = require('../models/user')
var Poller = require('../models/poller')
const Polls = require('../models/polls')
const Events = require('../models/events')


module.exports = (express)=>{

    const api = express.Router();
    
    require('./auth')(api, Users, functions, _, Poller, Twitter, bluebird, secret);
    require('./poll')(api, Users, functions, _ , Polls, Events);
    require('./user')(api, Users, functions, _ , Polls, Events);
    require('./events')(api, Users, functions, _ , Polls, Events);
    require('./search')(api, Users, functions, _ , Polls, Events);
    
    return api
}
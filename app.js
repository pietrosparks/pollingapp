//3. CREATE CORE EXPRESS DEPENDENCIES 

var express = require('express'),
    app = express(),
    api = express.Router(),
    server = require('http').Server(app),
    database = require('./dbconfig/database');

    database.connect();

    require('./configuration')(app, express);

    module.exports = {
        app: app,
        server: server
    };
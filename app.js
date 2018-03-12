//3. CREATE CORE EXPRESS DEPENDENCIES 

var express = require('express'),
    app = express(),
    api = express.Router(),
    enforce = require('express-sslify');
    server = require('http').Server(app),
    https = require('https');
    fs = require('fs');
    database = require('./dbconfig/database');

    database.connect();

    require('./configuration')(app, express);

    module.exports = {
        app: app,
        server: server
    };
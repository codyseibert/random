
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var favicon = require('serve-favicon');
var logger = require('morgan');

var App = function () {
    'use strict';
    var app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(logger('dev'));
    //app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));
    app.use(multer({dest: __dirname + '/public/images/uploads'}));
    app.use(express.static(__dirname + '/public'));
    return app;
};

module.exports = new App();

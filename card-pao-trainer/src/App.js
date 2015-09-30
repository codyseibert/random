
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var App = function () {
    'use strict';
    var app = express();
    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/public'));
    return app;
};

module.exports = new App();

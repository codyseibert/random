var querystring = require('querystring');
var http = require('http');
var reporter = require('./Reporter');

var MemStethService = function () {
    'use strict';

    this.report = function (pMemData) {
        reporter.report('api/mems', pMemData);
    };
};

module.exports = new MemStethService();

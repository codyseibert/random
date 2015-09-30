var querystring = require('querystring');
var http = require('http');
var reporter = require('./Reporter');

var NetStethService = function () {
    'use strict';

    this.report = function (pNetData) {
        reporter.report('api/nets', pNetData);
    };
};

module.exports = new NetStethService();

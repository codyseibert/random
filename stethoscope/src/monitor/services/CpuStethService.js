var querystring = require('querystring');
var http = require('http');
var reporter = require('./Reporter');

var CpuStethService = function () {
    'use strict';

    this.report = function (pCpuData) {
        reporter.report('api/cpus', pCpuData);
    };
};

module.exports = new CpuStethService();

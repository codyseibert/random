var request = require('request');

var Reporter = function () {
    'use strict';

    this.report = function (pPath, pNetData) {
        var IP = 'localhost';
        if (process.env.STETHOSCOPE_IP) {
            IP = process.env.STETHOSCOPE_IP;
        }

        request.post({
            url: 'http://' + IP + ':8080/' + pPath,
            method: 'POST',
            json: pNetData
        });
    };
};

module.exports = new Reporter();

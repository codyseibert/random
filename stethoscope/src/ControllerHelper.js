var theDB = require('./DBConnection');
var theMessages = require('./Messages');

var ControllerHelper = function () {
    'use strict';

    this.createDefaultCallback = function (pRes) {
        return function (pData) {
            if (pData.error) {
                pRes.status(400);
            }
            pRes.send(pData);
        };
    };
};

module.exports = new ControllerHelper();

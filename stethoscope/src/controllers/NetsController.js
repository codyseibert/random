var theNetsDao = require('../daos/NetsDao');
var theControllerHelper = require('../ControllerHelper');

var NetsController = function () {
    'use strict';

    this.getNet = function (pReq, pRes) {
        var callback,
            netId;
        netId = pReq.params.netId;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theNetsDao.getNet(netId, callback);
    };

    this.getNets = function (pReq, pRes) {
        var callback;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theNetsDao.getNets(callback);
    };

    this.createNet = function (pReq, pRes) {
        var callback;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theNetsDao.createNet(pReq.body, callback);
    };
};

module.exports = new NetsController();

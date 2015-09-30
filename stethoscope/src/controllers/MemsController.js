var theMemsDao = require('../daos/MemsDao');
var theControllerHelper = require('../ControllerHelper');

var MemsController = function () {
    'use strict';

    this.getMem = function (pReq, pRes) {
        var callback,
            memId;
        memId = pReq.params.memId;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theMemsDao.getMem(memId, callback);
    };

    this.getMems = function (pReq, pRes) {
        var callback;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theMemsDao.getMems(callback);
    };

    this.createMem = function (pReq, pRes) {
        var callback;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theMemsDao.createMem(pReq.body, callback);
    };
};

module.exports = new MemsController();

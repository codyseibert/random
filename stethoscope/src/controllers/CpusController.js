var theCpusDao = require('../daos/CpusDao');
var theControllerHelper = require('../ControllerHelper');

var CpusController = function () {
    'use strict';

    this.getCpu = function (pReq, pRes) {
        var callback,
            cpuId;
        cpuId = pReq.params.cpuId;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theCpusDao.getCpu(cpuId, callback);
    };

    this.getCpus = function (pReq, pRes) {
        var callback;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theCpusDao.getCpus(callback);
    };

    this.createCpu = function (pReq, pRes) {
        var callback;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theCpusDao.createCpu(pReq.body, callback);
    };
};

module.exports = new CpusController();

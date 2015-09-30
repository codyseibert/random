var theServersDao = require('../daos/ServersDao');
var theControllerHelper = require('../ControllerHelper');

var ServersController = function () {
    'use strict';

    this.getServer = function (pReq, pRes) {
        var callback,
            serverId;
        serverId = pReq.params.serverId;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theServersDao.getServer(serverId, callback);
    };

    this.getServers = function (pReq, pRes) {
        var callback;
        callback = theControllerHelper.createDefaultCallback(pRes);
        theServersDao.getServers(callback);
    };

};

module.exports = new ServersController();

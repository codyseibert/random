var theDB = require('../DBConnection');
var theMessages = require('../Messages');
var theDaoHelper = require('../DaoHelper');

var ServersDao = function () {
    'use strict';

    this.getServerIdByIp = function (pServerIp, pCallback) {
        theDaoHelper.executeQuery(
            "SELECT id FROM servers WHERE ip = ?",
            [pServerIp],
            theDaoHelper.SINGLE,
            pCallback
        );
    };

    this.getServer = function (pServerId, pCallback) {
        theDaoHelper.executeQuery(
            "SELECT id, ip FROM servers WHERE id = ?",
            [pServerId],
            theDaoHelper.SINGLE,
            pCallback
        );
    };

    this.getServers = function (pCallback) {
        theDaoHelper.executeQuery(
            "SELECT id, ip FROM servers",
            [],
            theDaoHelper.MULTIPLE,
            pCallback
        );
    };

    this.createServer = function (pServer, pCallback) {
        theDaoHelper.executeQuery(
            "INSERT INTO servers (ip) VALUES (?)",
            [pServer.ip],
            theDaoHelper.INSERT,
            pCallback
        );
    };
};

module.exports = new ServersDao();

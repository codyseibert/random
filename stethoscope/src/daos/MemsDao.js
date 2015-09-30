var theDB = require('../DBConnection');
var theMessages = require('../Messages');
var theDaoHelper = require('../DaoHelper');

var MemsDao = function () {
    'use strict';

    this.getMems = function (pCallback) {
        theDaoHelper.executeQuery(
            "SELECT id, server_id, free, used, date FROM mems WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) ORDER BY date DESC",
            [],
            theDaoHelper.MULTIPLE,
            pCallback
        );
    };

    this.createMem = function (pMem, pCallback) {
        theDaoHelper.executeQuery(
            "INSERT INTO mems (server_id, free, used, date) VALUES (?, ?, ?, NOW())",
            [pMem.server_id, pMem.free, pMem.used],
            theDaoHelper.INSERT,
            pCallback
        );
    };
};

module.exports = new MemsDao();

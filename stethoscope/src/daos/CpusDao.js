var theDB = require('../DBConnection');
var theMessages = require('../Messages');
var theDaoHelper = require('../DaoHelper');

var CpusDao = function () {
    'use strict';

    this.getCpus = function (pCallback) {
        theDaoHelper.executeQuery(
            "SELECT id, server_id, percent, date FROM cpus WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) ORDER BY date DESC",
            [],
            theDaoHelper.MULTIPLE,
            pCallback
        );
    };

    this.createCpu = function (pCpu, pCallback) {
        theDaoHelper.executeQuery(
            "INSERT INTO cpus (server_id, percent, date) VALUES (?, ?, NOW())",
            [pCpu.server_id, pCpu.percent],
            theDaoHelper.INSERT,
            pCallback
        );
    };
};

module.exports = new CpusDao();

var theDB = require('../DBConnection');
var theMessages = require('../Messages');
var theDaoHelper = require('../DaoHelper');

var NetsDao = function () {
    'use strict';

    this.getNets = function (pCallback) {
        theDaoHelper.executeQuery(
            "SELECT id, server_id, rx, tx, date FROM nets WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY) ORDER BY date DESC",
            [],
            theDaoHelper.MULTIPLE,
            pCallback
        );
    };

    this.createNet = function (pNet, pCallback) {
        theDaoHelper.executeQuery(
            "INSERT INTO nets (server_id, rx, tx, date) VALUES (?, ?, ?, NOW())",
            [pNet.server_id, pNet.rx, pNet.tx],
            theDaoHelper.INSERT,
            pCallback
        );
    };
};

module.exports = new NetsDao();

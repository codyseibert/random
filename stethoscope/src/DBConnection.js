var mysql = require('mysql');

var DBConnection = function () {
    'use strict';

    var connection;

    connection = mysql.createConnection({
        host: process.env.STETHOSCOPE_HOST,
        database: process.env.STETHOSCOPE_NAME,
        user: process.env.STETHOSCOPE_USER,
        password: process.env.STETHOSCOPE_PASS
    });
    connection.connect();

    return connection;
};

module.exports = new DBConnection();

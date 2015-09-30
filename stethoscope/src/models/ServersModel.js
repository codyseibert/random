
var ServersModel = function () {
    'use strict';

    var theId, theIp, theHost;

    this.setId = function (pId) {
        theId = pId;
    }

    this.getId = function () {
        return theId;
    }

    this.setIp = function (pIp) {
        theIp = pIp;
    }

    this.getIp = function () {
        return theIp;
    }

    this.setHost = function (pHost) {
        theHost = pHost;
    }

    this.getHost = function () {
        return theHost;
    }

};

module.exports = ServersModel;

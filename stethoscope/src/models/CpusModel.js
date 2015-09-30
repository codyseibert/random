
var CpusModel = function () {
    'use strict';

    var theId, theServerId, thePercent, theDate;

    this.setId = function (pId) {
        theId = pId;
    }

    this.getId = function () {
        return theId;
    }

    this.setServerId = function (pServerId) {
        theServerId = pServerId;
    }

    this.getServerId = function () {
        return theServerId;
    }

    this.setPercent = function (pPercent) {
        thePercent = pPercent;
    }

    this.getPercent = function () {
        return thePercent;
    }

    this.setDate = function (pDate) {
        theDate = pDate;
    }

    this.getDate = function () {
        return theDate;
    }

};

module.exports = CpusModel;

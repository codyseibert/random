
var MemsModel = function () {
    'use strict';

    var theId, theServerId, theFree, theUsed, theDate;

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

    this.setFree = function (pFree) {
        theFree = pFree;
    }

    this.getFree = function () {
        return theFree;
    }

    this.setUsed = function (pUsed) {
        theUsed = pUsed;
    }

    this.getUsed = function () {
        return theUsed;
    }

    this.setDate = function (pDate) {
        theDate = pDate;
    }

    this.getDate = function () {
        return theDate;
    }

};

module.exports = MemsModel;

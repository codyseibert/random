
var NetsModel = function () {
    'use strict';

    var theId, theServerId, theRx, theTx, theDate;

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

    this.setRx = function (pRx) {
        theRx = pRx;
    }

    this.getRx = function () {
        return theRx;
    }

    this.setTx = function (pTx) {
        theTx = pTx;
    }

    this.getTx = function () {
        return theTx;
    }

    this.setDate = function (pDate) {
        theDate = pDate;
    }

    this.getDate = function () {
        return theDate;
    }

};

module.exports = NetsModel;

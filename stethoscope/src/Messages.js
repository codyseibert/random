
var Messages = function () {
    'use strict';

    this.error = function (pMessage) {
        return {
            error: pMessage
        };
    };

    this.SUCCESS = {};
    this.ERROR = this.error('default error');
};

module.exports = new Messages();

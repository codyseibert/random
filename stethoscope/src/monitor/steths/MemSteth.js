var Exec = require('child_process');
var sys = require('sys');

var MemSteth = function () {
    'use strict';

    this.breath = function (pCallback) {
        var command = "free";

        var exec = Exec.exec;
        exec(command, function (error, stdout, stderr) {
            var memReg = /cache:[ ]+([0-9]+)[ ]+([0-9]+)/;
            var used = stdout.match(memReg)[1];
            var free = stdout.match(memReg)[2];
            var mem = {
                used: used,
                free: free
            };
            pCallback(mem);
        });
    };
};

module.exports = new MemSteth();

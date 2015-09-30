var Exec = require('child_process');
var sys = require('sys');

var NetSteth = function () {
    'use strict';

    this.breath = function (pCallback) {
        var command = "ifconfig eth0";

        var exec = Exec.exec;
        exec(command, function (error, stdout, stderr) {
            var rxReg = /RX bytes:([0-9]+)/;
            var txReg = /TX bytes:([0-9]+)/;
            var rx = stdout.match(rxReg)[1];
            var tx = stdout.match(txReg)[1];
            var net = {
                tx: tx,
                rx: rx
            };
            pCallback(net);
        });
    };
};

module.exports = new NetSteth();

var Exec = require('child_process');
var sys = require('sys');

var CpuSteth = function () {
    'use strict';

    this.breath = function (pCallback) {
        var command = "cat /proc/loadavg | awk '{print $1}'";

        var exec = Exec.exec;
        exec(command, function (error, stdout, stderr) {
            var cpuReg = /([0-9.]+)/;
            var percent = stdout.match(cpuReg)[1];
            var cpu = {
                percent: percent
            };
            pCallback(cpu);
        });
    };
};

module.exports = new CpuSteth();

var memSteth = require('./steths/MemSteth');
var netSteth = require('./steths/NetSteth');
var cpuSteth = require('./steths/CpuSteth');

var memStethService = require('./services/MemStethService');
var netStethService = require('./services/NetStethService');
var cpuStethService = require('./services/CpuStethService');

var INTERVAL = 5000; // 5000 ms = 5 sec

setInterval(function () {
    memSteth.breath(memStethService.report);
    netSteth.breath(netStethService.report);
    cpuSteth.breath(cpuStethService.report);
}, INTERVAL);

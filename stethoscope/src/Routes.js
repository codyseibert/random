var app = require('./App');

var ServersController = require ('./controllers/ServersController');
var CpusController = require ('./controllers/CpusController');
var MemsController = require ('./controllers/MemsController');
var NetsController = require ('./controllers/NetsController');
var ServerMatcherMiddleware = require('./middleware/ServerMatcherMiddleware');

var Routes = function () {
    'use strict';

    // servers
    app.get('/api/servers',
        ServersController.getServers);

    app.get('/api/servers/:serverId',
        ServersController.getServer);

    // cpus
    app.get('/api/cpus',
        CpusController.getCpus);

    app.get('/api/cpus/:cpuId',
        CpusController.getCpu);

    app.post('/api/cpus',
        ServerMatcherMiddleware,
        CpusController.createCpu);

    // mems
    app.get('/api/mems',
        MemsController.getMems);

    app.get('/api/mems/:memId',
        MemsController.getMem);

    app.post('/api/mems',
        ServerMatcherMiddleware,
        MemsController.createMem);

    // nets
    app.get('/api/nets',
        NetsController.getNets);

    app.get('/api/nets/:netId',
        NetsController.getNet);

    app.post('/api/nets',
        ServerMatcherMiddleware,
        NetsController.createNet);
};

module.exports = new Routes();

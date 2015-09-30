var theServersDao = require('../daos/ServersDao');

var ServerMatcherMiddleware = function (pReq, pRes, pNext) {
    'use strict';

    var ip = pReq.headers['x-forwarded-for'] || pReq.connection.remoteAddress;

    theServersDao.getServerIdByIp(ip, function (pData) {
        if (pData.error) {
            var server = {
                ip: ip
            };
            theServersDao.createServer(server, function (pData) {
                pReq.body.server_id = pData.id;
                pNext();
            });
        } else {
            pReq.body.server_id = pData.id;
            pNext();
        }
    });
};

module.exports = ServerMatcherMiddleware;

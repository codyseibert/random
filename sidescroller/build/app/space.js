var Entity = require('./entity');
var Globals = require('./globals');

/*
    Space background entity.
*/
module.exports = function () {
    'use strict';
    this.type = Globals.SPACE_ENTITY;
    this.radius = Globals.SPACE_TILE_SIZE;
};
module.exports.prototype = new Entity();

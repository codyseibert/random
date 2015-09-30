var Entity = require('./entity');
var Globals = require('./globals');

/*
    Bullet entity.
*/
module.exports = function () {
    "use strict";
    this.velocity = 0.0;
    this.damage = 1;
    this.till_death = Globals.BULLET_LIVE_TIME;
    this.type = Globals.BULLET_ENTITY;
    this.radius = Globals.BULLET_RADIUS;
    this.owner = null;
};
module.exports.prototype = new Entity();

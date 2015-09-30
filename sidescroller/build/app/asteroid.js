var Entity = require('./entity');
var Globals = require('./globals');

/*
    Asteroid entity.
*/
module.exports = function () {
    "use strict";
    this.velocity = Math.random() * Globals.ASTEROID_RAND_SPEED + Globals.ASTEROID_BASE_SPEED;
    this.angle = 2.0 * Math.PI * Math.random();

    this.type = Globals.ASTEROID_ENTITY;

    this.health = Globals.MAX_ASTEROID_SIZE * Globals.ASTEROID_HEALTH_COEF;
    this.radius = Globals.ASTEROID_RADIUS;
    this.size = 1;

    this.setSize = function (size) {
        this.size = size;
        this.health = size * Globals.ASTEROID_HEALTH_COEF;
        this.scale = size;
        this.radius = Globals.ASTEROID_RADIUS * size;
    };

    this.setSize(Globals.MAX_ASTEROID_SIZE);
};
module.exports.prototype = new Entity();

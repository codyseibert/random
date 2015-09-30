/*
    The basic object which all game objects should 
    extend.
*/
module.exports = function () {
    "use strict";
    this.x = 0.0;
    this.y = 0.0;
    this.angle = 0.0;
    this.rotate = 0.0;
    this.scale = 1;
    this.velocity = 0.0;

    this.setX = function (x) {
        this.x = x;
    };

    this.setY = function (y) {
        this.y = y;
    };

    this.move = function () {
        this.setX(this.x + Math.cos(this.angle) * this.velocity);
        this.setY(this.y + Math.sin(this.angle) * this.velocity);
    };
};

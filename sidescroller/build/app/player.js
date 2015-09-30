var Entity = require('./entity');
var Globals = require('./globals');

/*
    Player entity.
*/
module.exports = function () {
    "use strict";

    this.radius = Globals.PLAYER_RADIUS;
    this.type = Globals.PLAYER_ENTITY;

    this.keys = 0;

    this.velocity = 0.0;
    this.acceleration = Globals.PLAYER_ACCELERATION;
    this.max_speed = Globals.MAX_PLAYER_SPEED;
    this.turn_speed = Globals.PLAYER_TURN_SPEED;

    this.shoot_cooldown = 0;
    this.shoot_speed = Globals.PLAYER_SHOOT_SPEED;
    this.bullet_speed = Globals.BULLET_SPEED;
    this.bullet_damage = Globals.BULLET_DAMAGE;
    this.alive = true;
    this.lives = Globals.PLAYER_LIVES;
    this.ghost = false;
    this.angle = Math.PI / 2;
    this.rotate = Math.PI / 2;
    this.username = "NULL";

    // scoreboard related members
    this.round_score = 0;
    this.all_time_score = 0;
    this.all_time_wins = 0;

    this.kill = function () {
        this.alive = false;
        this.lives = this.lives - 1;
    };

    this.revive = function () {
        this.alive = true;
        this.ghost = true;
        this.velocity = 0.0;

        var player = this;

        setTimeout(function () {
            player.ghost = false;
        }, Globals.GHOST_TIME);
    };

    this.setAngle = function (angle) {
        this.angle = angle;
        this.rotate = angle;
    };

    this.giveScore = function (amount) {
        this.round_score = this.round_score + amount;
        this.all_time_score = this.all_time_score + amount;
    };

    this.giveWin = function () {
        this.all_time_wins = this.all_time_wins + 1;
    };
};
module.exports.prototype = new Entity();

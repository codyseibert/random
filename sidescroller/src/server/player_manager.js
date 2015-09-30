/*jslint bitwise: true */

var HitTest = require('./hit_test');
var Globals = require('./globals');
var Player = require('./player');
var Bullet = require('./bullet');
var hitTest = new HitTest();

module.exports = function (entityManager, io) {
    'use strict';

    var players,
        i,
        handlePlayerMovementKeys,
        handlePlayerShootKey,
        spawn,
        handlePlayerAsteroidCollision,
        updatePlayer;


    handlePlayerMovementKeys = function (player) {
        var keys = player.keys;

        if (keys & Globals.LEFT) {
            player.setAngle(player.angle - player.turn_speed);
        } else if (keys & Globals.RIGHT) {
            player.setAngle(player.angle + player.turn_speed);
        } else if (keys & Globals.UP) {
            player.velocity += player.acceleration;
            player.velocity = Math.min(player.max_speed, player.velocity);
        } else if (keys & Globals.DOWN) {
            player.velocity -= player.acceleration;
            player.velocity = Math.max(-player.max_speed, player.velocity);
        }
    };

    handlePlayerShootKey = function (player) {
        var bullet,
            keys;

        keys = player.keys;

        if (keys & Globals.SHOOT) {
            if (player.shoot_cooldown === 0) {
                player.shoot_cooldown = player.shoot_speed;

                bullet = new Bullet();
                bullet.owner = player;
                bullet.velocity = player.bullet_speed;
                bullet.angle = player.angle;
                bullet.rotate = player.angle;
                bullet.setX(player.x);
                bullet.setY(player.y);
                bullet.damage = player.bullet_damage;
                entityManager.addEntity(bullet);
            }
        }

        player.shoot_cooldown -= Globals.TICK;
        player.shoot_cooldown = Math.max(0, player.shoot_cooldown);
    };

    spawn = function (player) {
        player.setX(0);
        player.setY(0);
        player.revive();
    };

    handlePlayerAsteroidCollision = function (player) {
        var tspawn,
            asteroids,
            asteroid;

        tspawn = function () {
            spawn(player);
        };

        asteroids = entityManager.getAsteroids();

        if (!player.alive || player.ghost) {
            return;
        }

        for (i = 0; i < asteroids.length; i = i + 1) {
            asteroid = asteroids[i];

            if (hitTest.isIntersecting(player, asteroid)) {
                player.kill();
                io.emit("killed", player);

                if (player.lives > 0) {
                    setTimeout(tspawn,
                        Globals.PLAYER_RESPAWN_DELAY);
                }

                break;
            }
        }
    };

    updatePlayer = function (player) {
        if (!player.alive) {
            return;
        }

        handlePlayerMovementKeys(player);
        handlePlayerShootKey(player);

        player.move();

        handlePlayerAsteroidCollision(player);
    };

    this.createPlayer = function (username) {
        var player = new Player();
        player.username = username;
        entityManager.addEntity(player);
        return player;
    };


    this.update = function () {
        players = entityManager.getPlayers();

        for (i = 0; i < players.length; i = i + 1) {
            updatePlayer(players[i]);
        }
    };
};

var Globals = require('./globals');
var Asteroid = require('./asteroid');

module.exports = function (entityManager) {
    'use strict';

    var i,
        asteroid,
        asteroid_count = 0,
        spawnAsteroids;

    spawnAsteroids = function () {

        var angle = null,
            nx = null,
            ny = null,
            asteroidsToSpawn = null;

        // Determine how many LARGEST SIZE asteroids are missing
        asteroidsToSpawn = Globals.MAX_ASTEROIDS - asteroid_count;

        // Spawn that many
        for (i = 0; i < asteroidsToSpawn; i = i + 1) {
            asteroid = new Asteroid();
            entityManager.addEntity(asteroid);

            asteroid_count = asteroid_count + 1;

            // Spawn them randomly outside of the arena radius.
            // handleEdgeWarp will place them back into the arena
            angle = Math.random() * 2.0 * Math.PI;
            nx = Math.cos(angle) * Globals.ARENA_SIZE * 5;
            ny = Math.sin(angle) * Globals.ARENA_SIZE * 5;
            asteroid.setX(nx);
            asteroid.setY(ny);
        }
    };

    this.update = function () {
        var asteroids = entityManager.getAsteroids();

        for (i = 0; i < asteroids.length; i = i + 1) {
            asteroid = asteroids[i];
            asteroid.rotate = asteroid.rotate + 0.1;
            asteroid.move();
        }

        spawnAsteroids();
    };

    this.splitAsteroid = function (asteroid) {
        var split = null,
            speedup = Globals.ASTEROID_SPLIT_SPEEDUP;

        if (asteroid.size === Globals.MAX_ASTEROID_SIZE) {
            asteroid_count = asteroid_count - 1;
        }

        for (i = 0; i < 2; i = i + 1) {
            split = new Asteroid();
            split.velocity = asteroid.velocity + speedup;
            split.setSize(asteroid.size - 1);
            split.setX(asteroid.x);
            split.setY(asteroid.y);
            entityManager.addEntity(split);
        }
    };
};

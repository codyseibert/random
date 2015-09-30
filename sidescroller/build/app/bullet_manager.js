var Globals = require('./globals');
var HitTest = require('./hit_test');
var hitTest = new HitTest();

module.exports = function (entityManager, asteroidManager) {
    "use strict";

    var updateBullet;

    updateBullet = function (bullet) {

        var asteroids,
            asteroid,
            i;

        asteroids = entityManager.getAsteroids();

        // Update the bullet position
        bullet.move();

        // Decrement the time the bullet has to live
        bullet.till_death -= Globals.TICK;

        // check for any Bullet-Asteroid collision
        for (i = 0; i < asteroids.length; i = i + 1) {
            asteroid = asteroids[i];

            if (hitTest.isIntersecting(bullet, asteroid)) {
                // Damage the asteroid
                asteroid.health -= bullet.damage;

                // Give score to player
                bullet.owner.giveScore(1);

                // Destroy the asteroid if needed
                if (asteroid.health <= 0) {

                    // split into 2 if asteroid size > 1
                    if (asteroid.size > 1) {
                        asteroidManager.splitAsteroid(asteroid);
                    }

                    // remove the asteroid entity
                    entityManager.removeEntity(asteroid.uuid);
                }

                entityManager.removeEntity(bullet.uuid);
            }
        }

        // Remove bullets that have lived too long
        if (bullet.till_death <= 0) {
            entityManager.removeEntity(bullet.uuid);
        }
    };

    this.update = function () {
        var bullets,
            i,
            bullet;

        bullets = entityManager.getBullets();

        for (i = 0; i < bullets.length; i = i + 1) {
            bullet = bullets[i];
            updateBullet(bullet);
        }
    };
};

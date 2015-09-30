var Globals = require('./globals');
var Space = require('./space');

module.exports = function (entityManager) {
    'use strict';

    var createStartSpaceTiles = function () {
        var space, i, j, NUM_SPACE_TILES;

        NUM_SPACE_TILES = Globals.NUM_SPACE_TILES;

        // Create the space entities used for background
        for (i = -NUM_SPACE_TILES; i < NUM_SPACE_TILES; i = i + 1) {
            for (j = -NUM_SPACE_TILES; j < NUM_SPACE_TILES; j = j + 1) {
                space = new Space();
                space.setY(i * Globals.SPACE_TILE_SIZE);
                space.setX(j * Globals.SPACE_TILE_SIZE);
                entityManager.addEntity(space);
            }
        }
    };

    createStartSpaceTiles();

    this.update = function () {
        return undefined;
    };
};

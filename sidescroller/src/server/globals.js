/*jslint bitwise: true */

// Entity IDs used by client to determine images to draw
exports.BULLET_ENTITY = 1;
exports.PLAYER_ENTITY = 2;
exports.ASTEROID_ENTITY = 3;
exports.SPACE_ENTITY = 4;

// Server related constants
exports.PORT = 3000;
exports.TICK = 20;

// Client movement bit masks
exports.LEFT = 1 << 0;
exports.RIGHT = 1 << 1;
exports.UP = 1 << 2;
exports.DOWN = 1 << 3;
exports.SHOOT = 1 << 4;

// Gameplay related constants
exports.ARENA_SIZE = 1000;
exports.EDGE_THRESHOLD = 50;

exports.MAX_ASTEROIDS = 2;
exports.MAX_ASTEROID_SIZE = 3;
exports.ASTEROID_HEALTH_COEF = 3;
exports.ASTEROID_RAND_SPEED = 5;
exports.ASTEROID_BASE_SPEED = 2;
exports.ASTEROID_RADIUS = 50;
exports.ASTEROID_SPLIT_SPEEDUP = 3.0;

exports.BULLET_LIVE_TIME = 800; // ms
exports.BULLET_SPEED = 30;
exports.BULLET_DAMAGE = 1;
exports.BULLET_RADIUS = 2;

exports.PLAYER_RADIUS = 32;
exports.PLAYER_TURN_SPEED = 0.1;
exports.MAX_PLAYER_SPEED = 12.0;
exports.PLAYER_SHOOT_SPEED = 100;
exports.PLAYER_ACCELERATION = 0.6;
exports.PLAYER_LIVES = 5;
exports.PLAYER_RESPAWN_DELAY = 3000;
exports.GHOST_TIME = 3000;

exports.SPACE_TILE_SIZE = 512;
exports.NUM_SPACE_TILES = 10;

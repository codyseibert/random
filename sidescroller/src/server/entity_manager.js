var guid = require('./guid');
var Globals = require('./globals');
var Space = require('./space');

module.exports = function () {
    'use strict';

    var entities,
        getEntitiesByType,
        handleEdgeWarp;

    entities = {};

    getEntitiesByType = function (type) {
        var entity = null,
            key = null,
            ret = [];

        for (key in entities) {
            if (entities.hasOwnProperty(key)) {
                entity = entities[key];
                if (entity.type === type) {
                    ret.push(entity);
                }
            }
        }

        return ret;
    };

    handleEdgeWarp = function (entity) {
        var distance = null,
            x2 = null,
            y2 = null,
            atan = null,
            angle = null,
            nx = null,
            ny = null,
            arena = Globals.ARENA_SIZE,
            edge = Globals.EDGE_THRESHOLD,
            warpDist = arena - edge;

        // Do not warp space entities, bad things happen
        if (entity instanceof Space) {
            return;
        }

        // Check if the entity is outside of the arena
        x2 = entity.x * entity.x;
        y2 = entity.y * entity.y;
        distance = Math.sqrt(x2 + y2);
        if (distance <= Globals.ARENA_SIZE) {
            return;
        }

        // Warp time!
        // Determine the angle from center to entity and
        // warp in opposite direction 180 degrees.
        atan = Math.atan2(entity.y, entity.x);
        angle = atan + Math.PI;
        nx = Math.cos(angle) * warpDist;
        ny = Math.sin(angle) * warpDist;
        entity.setX(nx);
        entity.setY(ny);
    };

    this.update = function () {
        var key,
            entity;

        for (key in entities) {
            if (entities.hasOwnProperty(key)) {
                entity = entities[key];

                handleEdgeWarp(entity);
            }
        }
    };

    this.getEntities = function () {
        return entities;
    };

    this.removeEntity = function (uuid) {
        delete entities[uuid];
    };

    this.getEntity = function (uuid) {
        return entities[uuid];
    };

    this.addEntity = function (entity) {
        entity.uuid = guid();
        entities[entity.uuid] = entity;
    };

    this.getAsteroids = function () {
        return getEntitiesByType(Globals.ASTEROID_ENTITY);
    };

    this.getBullets = function () {
        return getEntitiesByType(Globals.BULLET_ENTITY);
    };

    this.getPlayers = function () {
        return getEntitiesByType(Globals.PLAYER_ENTITY);
    };
};

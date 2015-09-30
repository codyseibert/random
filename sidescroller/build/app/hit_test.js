module.exports = function () {
    'use strict';

    this.isIntersecting = function (entity1, entity2) {
        var dx = entity1.x - entity2.x,
            dy = entity1.y - entity2.y,
            distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < entity1.radius + entity2.radius) {
            return true;
        }
        return false;
    };
};

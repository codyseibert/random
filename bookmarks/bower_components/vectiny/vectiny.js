/**
 * vectiny: very tiny 2D vectors.
 *
 * Examples
 *
 *   var loc = V(10, 10);
 *   var vel = V(1, 2);
 *
 *   loc.add(vel);
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.V = factory();
  }
}(this, function () {

    var Vector = {
        add: function (a, mod) {
            if (typeof mod === 'undefined') mod = 1;
            return V((this.x + a.x) * mod, (this.y + a.y) * mod);
        },
        sub: function (s, mod) {
            if(typeof mod === 'undefined') mod = 1;
            return V((this.x - s.x) * mod, (this.y - s.y) * mod);
        },
        mult: function (m) {
            return V(this.x * m, this.y * m);
        },
        unit: function () {
            var mag = this.magnitude();
            return V(this.x / mag, this.y / mag);
        },
        limit: function (max) {
            return (this.magnitude() > max ? this.unit().mult(max) : this);
        },
        magnitude: function () {
            return Math.sqrt((this.x * this.x) + (this.y * this.y));
        },
        mag: function () {
            return this.magnitude();
        },
        to: function (b) {
            return Math.sqrt(Math.pow(b.x - this.x, 2) + Math.pow(b.y - this.y, 2));
        },
        from: function (b) {
            return b.to(this);
        },
        toString: function () {
            return JSON.stringify([this.x, this.y]);
        },
        valueOf: function () {
            return this.magnitude();
        }
    };

    function V(x, y) {
        if (typeof x === 'undefined' ||
            typeof y === 'undefined') throw new Error('V requires both x and y.');

        var vector = Object.create(Vector);
        vector.x = x;
        vector.y = y;

        return vector;
    }

    return V;
}));


var t = require('tap');
var V = require('../');

t.test('vectiny', function (t) {

  t.test('new vector', function (t) {
    var loc = V(10, 15);
    t.equal(loc.x, 10);
    t.equal(loc.y, 15);
    t.end();
  });

  t.test('adding works and produces new vector', function (t) {
    var a = V(10, 15);
    var b = V(20, 25);
    var c = a.add(b);
    // a is unchanged
    t.equal(a.x, 10);
    t.equal(a.y, 15);
    // b is unchanged
    t.equal(b.x, 20);
    t.equal(b.y, 25);
    // c is new
    t.equal(c.x, 30);
    t.equal(c.y, 40);
    t.ok(a !== b !== c);
    t.end();
  });

  t.test('subtracting works and produces new vector', function (t) {
    var a = V(10, 15);
    var b = V(5, 5);
    var c = a.sub(b);
    // a is unchanged
    t.equal(a.x, 10);
    t.equal(a.y, 15);
    // b is unchanged
    t.equal(b.x, 5);
    t.equal(b.y, 5);
    // c is new
    t.equal(c.x, 5);
    t.equal(c.y, 10);
    t.ok(a !== b !== c);
    t.end();
  });

  t.test('multiplying works and produces new vector', function (t) {
    var a = V(10, 10);
    var b = a.mult(2);
    // a is unchanged
    t.equal(a.x, 10);
    t.equal(a.y, 10);
    // b is new
    t.equal(b.x, 20);
    t.equal(b.y, 20);
    t.ok(a !== b);
    t.end();
  });

  t.test('unit works and produces new vector', function (t) {
    var a = V(10, 10);
    var b = a.unit();
    // a is unchanged
    t.equal(a.x, 10);
    t.equal(a.y, 10);
    var mag = Math.sqrt((10 * 10) + (10 * 10));
    // b is new
    t.equal(b.x, 10 / mag);
    t.equal(b.y, 10 / mag);
    t.ok(a !== b);
    t.end();
  });

  t.test('limit works and produces new vector', function (t) {
    var a = V(10, 10);
    var b = a.limit(8);
    // a is unchanged
    t.equal(a.x, 10);
    t.equal(a.y, 10);
    var mag = Math.sqrt((10 * 10) + (10 * 10));
    // b is new
    t.equal(b.x, 10 / mag * 8);
    t.equal(b.y, 10 / mag * 8);
    t.ok(a !== b);
    t.end();
  });

  t.test('to finds distance to other vector', function (t) {
    var a = V(0, 0);
    var b = V(3, 4);
    var dist = a.to(b);
    // a is unchanged
    t.equal(a.x, 0);
    t.equal(a.y, 0);
    // b is unchanged
    t.equal(b.x, 3);
    t.equal(b.y, 4);
    t.equal(dist, 5);
    t.end();
  });

  t.test('comparion works', function (t) {
    var a = V(1, 2);
    var b = V(3, 4);
    var c = V(3, 4);
    var dist = a.to(b);
    t.equal(a > b, false);
    t.equal(a < b, true);
    t.end();
  });

  t.end();

});
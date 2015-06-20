# vectiny

very tiny 2D vectors.

```javascript
var loc = V(100,100);
var vel = V(15,12);
var grav = V(0,-9.2);

// Add them
vel = vel.add(grav);
loc = loc.add(vel);

// Find the magnitude
var speed = vel.magnitude();
```

Methods include: `add`, `sub`, `mult`, `unit`, `limit`, `mag`, `to` and `from`.

## License

MIT
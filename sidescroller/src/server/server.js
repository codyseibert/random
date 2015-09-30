/*jslint continue: true*/
/*jslint bitwise: true */
/*jslint nomen: true*/
/*jslint indent: 4 */

//node requires
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
//local requires
    Space = require('./space'),
    Asteroid = require('./asteroid'),
    Player = require('./player'),
    Bullet = require('./bullet'),
    Globals = require('./globals'),
    guid = require('./guid'),
    fs = require('fs'),
    EntityManager = require('./entity_manager'),
    PlayerManager = require('./player_manager'),
    AsteroidManager = require('./asteroid_manager'),
    BulletManager = require('./bullet_manager'),
    SpaceManager = require('./space_manager'),
    AccountsManager = require('./account_manager'),
    entityManager = new EntityManager(),
    playerManager = new PlayerManager(entityManager, io),
    asteroidManager = new AsteroidManager(entityManager),
    bulletManager = new BulletManager(entityManager, asteroidManager),
    spaceManager = new SpaceManager(entityManager),
    accountsManager = new AccountsManager(),
// Server variables
    asteroid_count = 0,
    entities = {},
    playerMap = {},
    accounts = {},
// Create the space background entities
    i = null,
    j = null;


// ROUTES
/*jslint unparam: true*/
app.get('/', function (req, res) {
    'use strict';
    res.sendFile(__dirname + '/index.html');
});

app.get('/client.min.js', function (req, res) {
    'use strict';
    res.sendFile(__dirname + '/client.min.js');
});

app.get('/client.js', function (req, res) {
    'use strict';
    res.sendFile(__dirname + '/client.js');
});

// Serve up only the images specified
var IMAGES = ['starfield.gif', 'asteroid.png', 'ship.png', 'bullet.png'];
function loadImage(image) {
    'use strict';
    app.get('/' + IMAGES[i], function (req, res) {
        res.sendFile(__dirname + '/' + image);
    });
}
/*jslint unparam: false*/

for (i = 0; i < IMAGES.length; i = i + 1) {
    loadImage(IMAGES[i]);
}


// Event for when a player connects
io.on('connection', function (socket) {
    'use strict';
    var player, createPlayer;

    createPlayer = function (username) {
        player = playerManager.createPlayer(username);
        socket.emit("id", player.uuid);
    };

    socket.on('login', function (creditials) {
        var username = creditials.username,
            password = creditials.password;

        if (accountsManager.isValidLogin(username, password)) {
            createPlayer(username);
        } else {
            socket.emit("invalid_login");
        }
    });

    socket.on('register', function (creditials) {
        var username = creditials.username,
            password = creditials.password;

        if (accountsManager.isUsernameTaken(username)) {
            socket.emit('accounts_exists');
        } else {
            accountsManager.createAccount(username, password);
            createPlayer(username);
        }
    });

    socket.on('disconnect', function () {
        entityManager.removeEntity(player.uuid);
    });

    socket.on('keys', function (keys) {
        player.keys = keys;
    });
});

// Server Loop
setInterval(function () {
    'use strict';

    entityManager.update();
    playerManager.update();
    asteroidManager.update();
    bulletManager.update();
    spaceManager.update();

    io.emit('entities', entityManager.getEntities());

}, Globals.TICK);

http.listen(Globals.PORT, function () {
    'use strict';
    console.log('listening on *:' + Globals.PORT);
});

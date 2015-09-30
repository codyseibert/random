/*global io, $ */
/*jslint bitwise: true */
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
$(window).resize(function () {
    "use strict";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    $("#login_div").css("left", canvas.width / 2 - 200);
    $("#login_div").css("top", canvas.height / 2 - 150);
});
$(window).resize();

var socket = io();

var BULLET_ENTITY = 1;
var PLAYER_ENTITY = 2;
var ASTEROID_ENTITY = 3;
var SPACE_ENTITY = 4;

var W = 87;
var A = 65;
var S = 83;
var D = 68;
var SPACE = 32;

var LEFT = 1 << 0;
var RIGHT = 1 << 1;
var UP = 1 << 2;
var DOWN = 1 << 3;
var SHOOT = 1 << 4;

var keys = 0;

var cx = 0;
var cy = 0;
var cameraEntityKey = null;

var entities = {};

socket.on('id', function (key) {
    "use strict";
    cameraEntityKey = key;
    $("#login_div").hide();
});

socket.on('invalid_login', function () {
    "use strict";
    $("#message").html("Invalid login information!");
});

socket.on('account_exists', function () {
    "use strict";
    $("#message").html("Account name already exists!");
});

$("#login_btn").click(function () {
    "use strict";
    var username = $("#username").val(),
        password = $("#password").val();
    socket.emit("login", {username: username, password: password});
});

$("#register_btn").click(function () {
    "use strict";
    var username = $("#username").val(),
        password = $("#password").val();
    socket.emit("register", {username: username, password: password});
});

var space_img = new Image();
var ship_img = new Image();
var asteroid_img = new Image();
var bullet_img = new Image();
space_img.src = "starfield.gif";
ship_img.src = "ship.png";
asteroid_img.src = "asteroid.png";
bullet_img.src = "bullet.png";

function renderMiniMap() {
    "use strict";
    var MAP_RADIUS = 100,
        ARENA_SIZE = 1000.0,
        key = null,
        entity = null,
        mx = null,
        my = null;

    context.beginPath();
    context.arc(150, 150, MAP_RADIUS, 0, 2 * Math.PI, false);
    context.fillStyle = "rgba(200, 200, 255, 0.3)";
    context.fill();

    for (key in entities) {
        if (entities.hasOwnProperty(key)) {
            entity = entities[key];
            mx = entity.x / ARENA_SIZE * MAP_RADIUS + MAP_RADIUS + 50;
            my = entity.y / ARENA_SIZE * MAP_RADIUS + MAP_RADIUS + 50;
            context.beginPath();
            if (entity.type === PLAYER_ENTITY) {
                context.fillStyle = "rgba(0, 255, 0, 0.7)";
                context.arc(mx, my, 3, 0, 2 * Math.PI, false);
            } else if (entity.type === ASTEROID_ENTITY) {
                context.fillStyle = "rgba(255, 0, 0, 0.7)";
                context.arc(mx, my, 3 * entity.scale, 0, 2 * Math.PI, false);
            } else if (entity.type === BULLET_ENTITY) {
                context.fillStyle = "rgba(0, 0, 255, 0.7)";
                context.arc(mx, my, 2, 0, 2 * Math.PI, false);
            }
            context.fill();
        }
    }
}

function render() {
    "use strict";
    var cameraEntity = null,
        key = null,
        entity = null,
        image = null,
        scoreboard_y = 0,
        width = 0,
        height = 0;

    // Calculate the camera offset
    if (cameraEntityKey !== null) {
        cameraEntity = entities[cameraEntityKey];
        cx = parseInt(window.innerWidth / 2 - cameraEntity.x, 10);
        cy = parseInt(window.innerHeight / 2 - cameraEntity.y, 10);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Render all the entities
    for (key in entities) {
        if (entities.hasOwnProperty(key)) {
            entity = entities[key];

            context.save();

            image = ship_img;
            height = entity.radius * 2;
            width = entity.radius * 2;
            if (entity.type === PLAYER_ENTITY) {
                image = ship_img;
                if (entity.ghost) {
                    context.globalAlpha = 0.5;
                }

                if (!entity.alive) {
                    context.globalAlpha = 0.0;
                }
            } else if (entity.type === SPACE_ENTITY) {
                image = space_img;
            } else if (entity.type === ASTEROID_ENTITY) {
                image = asteroid_img;
            } else if (entity.type === BULLET_ENTITY) {
                image = bullet_img;
                width = 10;
                height = 38;
            }

            context.translate(entity.x + cx, entity.y + cy);
            context.rotate(entity.rotate + Math.PI / 2);
            if (entity.type === SPACE_ENTITY) {
                context.drawImage(image, -entity.radius, -entity.radius);
            } else {
                context.drawImage(image, -entity.radius, -entity.radius, width, height);
            }

            context.restore();
        }
    }

    if (cameraEntityKey !== null) {
        scoreboard_y = 50;
        context.fillStyle = "blue";
        context.font = "bold 16px Arial";
        context.fillText("Player", canvas.width - 500, 20);
        context.fillText("Lives", canvas.width - 400, 20);
        context.fillText("Score (R)", canvas.width - 300, 20);
        context.fillText("Score (G)", canvas.width - 200, 20);
        context.fillText("Wins", canvas.width - 100, 20);
        for (key in entities) {
            if (entities.hasOwnProperty(key)) {
                entity = entities[key];
                if (entity.type === PLAYER_ENTITY) {
                    context.fillText(entity.username, canvas.width - 500, scoreboard_y);
                    context.fillText(entity.lives, canvas.width - 400, scoreboard_y);
                    context.fillText(entity.round_score, canvas.width - 300, scoreboard_y);
                    context.fillText(entity.all_time_score, canvas.width - 200, scoreboard_y);
                    context.fillText(entity.all_time_wins, canvas.width - 100, scoreboard_y);

                    scoreboard_y = scoreboard_y + 20;
                }
            }
        }

        context.beginPath();
        context.arc(cx, cy, 1000, 0, 2 * Math.PI, false);
        context.fillStyle = "rgba(255, 255, 255, 0.1)";
        context.fill();

        if (cameraEntity && !cameraEntity.alive) {
            context.fillStyle = "rgba(255, 0, 0, 0.8)";
            context.font = "bold 30px Arial";
            context.fillText("You be DEAD!", canvas.width / 2 - 100, canvas.height / 2);
        }

        renderMiniMap();
    }
}

socket.on('entities', function (ents) {
    "use strict";
    entities = ents;
    render();
});

$(window).keydown(function (e) {
    "use strict";
    if (cameraEntityKey) {
        var code = e.keyCode || e.which;

        if (code === W) {
            keys |= UP;
        } else if (code === A) {
            keys |= LEFT;
        } else if (code === S) {
            keys |= DOWN;
        } else if (code === D) {
            keys |= RIGHT;
        } else if (code === SPACE) {
            keys |= SHOOT;
        }
        socket.emit('keys', keys);

        return false;
    }
});

$(window).keyup(function (e) {
    "use strict";
    if (cameraEntityKey) {
        var code = e.keyCode || e.which;

        if (code === W) {
            keys &= ~UP;
        } else if (code === A) {
            keys &= ~LEFT;
        } else if (code === S) {
            keys &= ~DOWN;
        } else if (code === D) {
            keys &= ~RIGHT;
        } else if (code === SPACE) {
            keys &= ~SHOOT;
        }
        socket.emit('keys', keys);

        return false;
    }
});

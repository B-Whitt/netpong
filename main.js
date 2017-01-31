'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, './index.html');

const server = express();

server.get('/', function(req, res) { res.sendFile(INDEX); });

server.use('/', express.static(path.join(__dirname, '.')));

let requestHandler = server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(requestHandler);

// Game Server
const NetPongServerEngine = require(path.join(__dirname, 'src/server/NetpongServerEngine.js'));
const NetPongGameEngine = require(path.join(__dirname, 'src/common/NetpongGameEngine.js'));
const SimplePhysicsEngine = require('incheon').physics.SimplePhysicsEngine;

// Game Instances
const physicsEngine = new SimplePhysicsEngine();
const gameEngine = new NetPongGameEngine({ physicsEngine });
const serverEngine = new NetPongServerEngine(io, gameEngine, {
    updateRate: 3,
    debug: {}
});

// start the game
serverEngine.start();

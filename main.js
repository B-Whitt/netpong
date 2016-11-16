'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, './index.html');

const server = express();

server.get('/', function (req, res) {
    res.sendFile(INDEX)
});


server.use('/', express.static(path.join(__dirname, '.')));

var requestHandler = server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(requestHandler);


/*
 Game logic
 */

const NetPongServerEngine = require(path.join(__dirname, 'src/server/NetpongServerEngine.js'));
const NetPongGameEngine = require(path.join(__dirname, 'src/common/NetpongGameEngine.js'));

const gameEngine = new NetPongGameEngine({ traceLevel: 0 });
const serverEngine = new NetPongServerEngine(io, gameEngine, {
    debug:{
        // serverSendLag: 600
    }
});

//start the game
serverEngine.start();

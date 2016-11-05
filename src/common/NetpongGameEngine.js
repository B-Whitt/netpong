"use strict";

const GameEngine = require('incheon').GameEngine;
const Paddle = require('./Paddle');
const Ball = require('./Ball');

class NetpongGameEngine extends GameEngine {
    constructor(options){
        super(options);

    }

    start(){
        var that = this;
        super.start();

        this.worldSettings = {
            width: 400,
            height: 400,
            paddlePadding: 20
        };

    };

    processInput(inputData, playerId){
        super.processInput(inputData, playerId);

        //get the player paddle tied to the player socket
        var playerPaddle;

        for (let objId in this.world.objects) {
            if (this.world.objects[objId].playerId == playerId){
                playerPaddle = this.world.objects[objId];
                break;
            }
        }
        if (playerPaddle) {
            if (inputData.input == "up") {
                playerPaddle.y -= 5;
            }
            else if (inputData.input == "down") {
                playerPaddle.y += 5;
            }
        }
    };

    initGame(){
        //create the paddle objects
        this.player1Paddle = new Paddle(++this.world.idCount, this.worldSettings.paddlePadding, this.worldSettings.paddlePadding);
        this.player2Paddle = new Paddle(++this.world.idCount, this.worldSettings.width - this.worldSettings.paddlePadding, this.worldSettings.paddlePadding);

        //associate paddels with the right players
        this.player1Paddle.playerId = 0;
        this.player2Paddle.playerId = 1;

        //add paddle objects to the game world
        this.addObjectToWorld(this.player1Paddle);
        this.addObjectToWorld(this.player2Paddle);
    }

    attachPaddle(paddleId, playerId){
        //which player?
        if (paddleId === 0){
            this.player1Paddle.playerId = playerId;
        }
        else if (paddleId === 1){
            this.player2Paddle.playerId = playerId;
        }
    }

}

module.exports = NetpongGameEngine;
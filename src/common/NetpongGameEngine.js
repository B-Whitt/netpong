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
            paddleWidth: 10,
            paddleHeight: 50,
            paddlePadding: 20
        };

        this.on("postStep", ()=>{ this.postStepHandleBall() });
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
        this.player1Paddle = new Paddle(++this.world.idCount, this.worldSettings.paddlePadding, 0);
        this.player2Paddle = new Paddle(++this.world.idCount, this.worldSettings.width - this.worldSettings.paddlePadding, 0);
        this.ball = new Ball(++this.world.idCount, this.worldSettings.width / 2, this.worldSettings.height / 2);

        //associate paddels with the right players
        this.player1Paddle.playerId = 0;
        this.player2Paddle.playerId = 1;

        //add paddle objects to the game world
        this.addObjectToWorld(this.player1Paddle);
        this.addObjectToWorld(this.player2Paddle);
        this.addObjectToWorld(this.ball);
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

    postStepHandleBall(){
        if (this.ball) {

            // LEFT EDGE:
            if (this.ball.x <= this.worldSettings.paddlePadding + this.worldSettings.paddleWidth &&
                    this.ball.y >= this.player1Paddle.y &&
                    this.ball.y <= this.player1Paddle.y + this.worldSettings.paddleHeight &&
                    this.ball.velocity.x < 0){

                // ball moving left hit player 1 paddle
                this.ball.velocity.x *= -1;
                this.ball.x = this.worldSettings.paddlePadding + this.worldSettings.paddleWidth + 1;
            } else if (this.ball.x <= 0){

                // ball hit left wall
                this.ball.velocity.x *= -1;
                this.ball.x = 0;
                this.player2Score();
                console.log(`player 2 scored`);
            }

            // RIGHT EDGE:
            if (this.ball.x >= this.worldSettings.width - this.worldSettings.paddlePadding - this.worldSettings.paddleWidth &&
                this.ball.y >= this.player2Paddle.y &&
                this.ball.y <= this.player2Paddle.y + this.worldSettings.paddleHeight &&
                this.ball.velocity.x > 0){

                // ball moving right hits player 2 paddle
                this.ball.velocity.x *= -1;
                this.ball.x = this.worldSettings.width - this.worldSettings.paddlePadding - this.worldSettings.paddleWidth - 1;
            } else if (this.ball.x >= this.worldSettings.width ) {

                // ball hit right wall
                this.ball.velocity.x *= -1;
                this.ball.x = this.worldSettings.width - 1;
                this.player1Score();
                console.log(`player 1 scored`);
            }

            // ball hits top
            if (this.ball.y <= 0) {
                this.ball.y = 1;
                this.ball.velocity.y *= -1;
            }
            // ball hits bottom
            else if (this.ball.y >= this.worldSettings.height) {
                this.ball.y = this.worldSettings.height - 1;
                this.ball.velocity.y *= -1;
            }
        }
    };

    player1Score(){
        // this.ball.x = this.worldSettings.width / 2;
        // this.ball.y = this.worldSettings.height / 2;
    }

    player2Score(){
        // this.ball.x = this.worldSettings.width / 2;
        // this.ball.y = this.worldSettings.height / 2;
    }

}

module.exports = NetpongGameEngine;

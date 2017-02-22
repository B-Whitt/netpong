'use strict';

const TwoVector = require('incheon').serialize.TwoVector;
const GameEngine = require('incheon').GameEngine;
const Paddle = require('./Paddle');
const Ball = require('./Ball');

class NetpongGameEngine extends GameEngine {
    constructor(options){
        super(options);

    }

    start() {

        super.start();

        this.worldSettings = {
            width: 400,
            height: 400,
            paddleWidth: 10,
            paddleHeight: 50,
            paddlePadding: 20
        };

        this.on('postStep', ()=>{ this.postStepHandleBall(); });
    };

    processInput(inputData, playerId){
        super.processInput(inputData, playerId);

        // get the player paddle tied to the player socket
        let playerPaddle;

        for (let objId in this.world.objects) {
            let o = this.world.objects[objId];
            if (o.playerId == playerId && o.class == Paddle) {
                playerPaddle = this.world.objects[objId];
                break;
            }
        }
        if (playerPaddle) {
            if (inputData.input == 'up') {
                playerPaddle.position.y -= 5;
            } else if (inputData.input == 'down') {
                playerPaddle.position.y += 5;
            }
        }
    };

    initGame(){
        // create the paddle objects
        this.player1Paddle = new Paddle(++this.world.idCount, new TwoVector(this.worldSettings.paddlePadding, 0));
        this.player2Paddle = new Paddle(++this.world.idCount, new TwoVector(this.worldSettings.width - this.worldSettings.paddlePadding, 0));
        this.ball = new Ball(++this.world.idCount, new TwoVector(this.worldSettings.width / 2, this.worldSettings.height / 2));

        // associate paddels with the right players
        this.player1Paddle.playerId = 0;
        this.player2Paddle.playerId = 1;

        // add paddle objects to the game world
        this.addObjectToWorld(this.player1Paddle);
        this.addObjectToWorld(this.player2Paddle);
        this.addObjectToWorld(this.ball);
    }

    attachPaddle(paddleId, playerId){
        // which player?
        if (paddleId === 0) {
            this.player1Paddle.playerId = playerId;
        } else if (paddleId === 1) {
            this.player2Paddle.playerId = playerId;
        }
    }

    postStepHandleBall(){
        if (this.ball) {

            // LEFT EDGE:
            if (this.ball.position.x <= this.worldSettings.paddlePadding + this.worldSettings.paddleWidth &&
                    this.ball.position.y >= this.player1Paddle.position.y &&
                    this.ball.position.y <= this.player1Paddle.position.y + this.worldSettings.paddleHeight &&
                    this.ball.velocity.x < 0){

                // ball moving left hit player 1 paddle
                this.ball.velocity.x *= -1;
                this.ball.position.x = this.worldSettings.paddlePadding + this.worldSettings.paddleWidth + 1;
            } else if (this.ball.position.x <= 0){

                // ball hit left wall
                this.ball.velocity.x *= -1;
                this.ball.position.x = 0;
                this.player2Score();
                console.log(`player 2 scored`);
            }

            // RIGHT EDGE:
            if (this.ball.position.x >= this.worldSettings.width - this.worldSettings.paddlePadding - this.worldSettings.paddleWidth &&
                this.ball.position.y >= this.player2Paddle.position.y &&
                this.ball.position.y <= this.player2Paddle.position.y + this.worldSettings.paddleHeight &&
                this.ball.velocity.x > 0){

                // ball moving right hits player 2 paddle
                this.ball.velocity.x *= -1;
                this.ball.position.x = this.worldSettings.width - this.worldSettings.paddlePadding - this.worldSettings.paddleWidth - 1;
            } else if (this.ball.position.x >= this.worldSettings.width ) {

                // ball hit right wall
                this.ball.velocity.x *= -1;
                this.ball.position.x = this.worldSettings.width - 1;
                this.player1Score();
                console.log(`player 1 scored`);
            }

            // ball hits top
            if (this.ball.position.y <= 0) {
                this.ball.position.y = 1;
                this.ball.velocity.y *= -1;
            } else if (this.ball.position.y >= this.worldSettings.height) {
                // ball hits bottom
                this.ball.position.y = this.worldSettings.height - 1;
                this.ball.velocity.y *= -1;
            }
        }
    }

    player1Score(){
        // this.ball.position.x = this.worldSettings.width / 2;
        // this.ball.position.y = this.worldSettings.height / 2;
    }

    player2Score(){
        // this.ball.position.x = this.worldSettings.width / 2;
        // this.ball.position.y = this.worldSettings.height / 2;
    }

}

module.exports = NetpongGameEngine;

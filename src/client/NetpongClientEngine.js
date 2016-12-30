const ClientEngine = require('incheon').ClientEngine;
const NetpongRenderer = require('../client/NetpongRenderer');
const Synchronizer = require('incheon').Synchronizer;

const Ball = require('../common/Ball');


class NetpongClientEngine extends ClientEngine{
    constructor(gameEngine, options){
        super(gameEngine, options);

        // initialize renderer
        this.renderer = new NetpongRenderer(gameEngine);

        this.serializer.registerClass(require('../common/Paddle'));
        this.serializer.registerClass(require('../common/Ball'));

        this.gameEngine.on('client__preStep', this.preStep.bind(this));

        this.gameEngine.on('objectAdded', (object) => {
            if (object.id == 1){
                this.gameEngine.player1Paddle = object;
            }
            else if (object.id == 2){
                this.gameEngine.player2Paddle = object;
            }
            else if (object.class == Ball){
                this.gameEngine.ball = object;
            }

        });

        // keep a reference for key press state
        this.pressedKeys = {
            down: false,
            up: false
        };

        let that = this;
        document.onkeydown = (e) => { that.onKeyChange(e, true)};
        document.onkeyup = (e) => { that.onKeyChange(e, false)};
    }

    start(){
        var that = this;
        super.start();

        this.renderer.init();

        // Simple JS game loop adapted from
        // http://nokarma.org/2011/02/02/javascript-game-development-the-game-loop/
        let skipTicks = 1000 / that.options.gameUps,
            nextGameTick = (new Date).getTime();

        let gameLoop = function(){
            while ((new Date).getTime() > nextGameTick) {
                that.step();
                nextGameTick += skipTicks;
            }
            requestAnimationFrame(gameLoop);
        };
        gameLoop();


        //draw on each animation frame
        //also requestAnimationFrame
        //todo something weird with the draw tired to game engine
        // let drawLoop = function(){
        //     that.renderer.draw();
        //     requestAnimationFrame(drawLoop);
        // };
        //
        // drawLoop();
    }

    // our pre-step is to process all inputs
    preStep(){
        //continuous press
        if (this.pressedKeys.up) {
            console.log("sent up");
            this.sendInput('up');
        }

        if (this.pressedKeys.down) {
            console.log("sent down");
            this.sendInput('down');
        }
    }

    onKeyChange(e, isDown) {
        e = e || window.event;

        if (e.keyCode == '38') {
            this.pressedKeys.up = isDown;
        }
        else if (e.keyCode == '40') {
            this.pressedKeys.down = isDown;
        }
        else if (e.keyCode == '37') {
            this.pressedKeys.left = isDown;
        }
        else if (e.keyCode == '39') {
            this.pressedKeys.right = isDown;
        }
    }

}

module.exports = NetpongClientEngine;

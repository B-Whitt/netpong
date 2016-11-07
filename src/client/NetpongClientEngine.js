const ClientEngine = require('incheon').ClientEngine;
const NetpongRenderer = require('../client/NetpongRenderer');
const Synchronizer = require('incheon').Synchronizer;

class NetpongClientEngine extends ClientEngine{
    constructor(gameEngine, options){
        super(gameEngine, options);
        var that = this;

        this.options = options; //TODO should be in parent class

        //initialize renderer
        this.renderer = new NetpongRenderer();
        this.gameEngine.renderer = this.renderer; //TODO renderer shouldn't be tightly coupled with the game engine

        //initialize object synchronization:
        var syncOptions = {
            extrapolate: {
                localObjBending: 0.0,
                remoteObjBending: 0.6
            }
        };
        const synchronizer = new Synchronizer(this, syncOptions);
        synchronizer.extrapolateObjectSelector = () => { return true; };

        this.serializer.registerClass(require('../common/Paddle'));
        this.serializer.registerClass(require('../common/Ball'));

        this.gameEngine.on('client.preStep', this.preStep.bind(this));

        //keep a reference for key press state
        this.pressedKeys = {
            down: false,
            up: false
        };

        document.onkeydown = function(e){ onKeyChange.call(that, e, true)};
        document.onkeyup = function(e){ onKeyChange.call(that, e, false)};
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

}

function onKeyChange(e, isDown) {
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


module.exports = NetpongClientEngine;

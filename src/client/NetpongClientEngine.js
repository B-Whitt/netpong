const ClientEngine = require('incheon').ClientEngine;


class NetpongClientEngine extends ClientEngine{
    constructor(gameEngine, options){
        super(gameEngine, options);

        this.serializer.registerClass(require('../common/Paddle'));
        this.serializer.registerClass(require('../common/Ball'));

        this.gameEngine.on('client.preStep', this.preStep.bind(this));

        //keep a reference for key press state
        this.pressedKeys = {
            down: false,
            up: false
        };

        document.onkeydown = checkKey.bind(this);
    }

    start(){
        var that = this;

        super.start();

    }

    // our pre-step is to process all inputs
    preStep(){
        //continuous press
        if (this.cursors.up.isDown) {
            this.sendInput('up');
        }

        if (this.cursors.left.isDown) {
            this.sendInput('down');
        }
    }

}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        this.pressedKeys.up = true;
    }
    else if (e.keyCode == '40') {
        this.pressedKeys.down = true;
    }
    else if (e.keyCode == '37') {
        this.pressedKeys.left = true;
    }
    else if (e.keyCode == '39') {
        this.pressedKeys.right= true;
    }

}


module.exports = NetpongClientEngine;

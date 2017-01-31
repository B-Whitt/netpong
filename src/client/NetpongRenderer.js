'use strict';

const Renderer = require('incheon').render.Renderer;
let Paddle = require('../common/Paddle');
let Ball = require('../common/Ball');

class NetpongRenderer extends Renderer {

    constructor(gameEngine, clientEngine) {
        super(gameEngine, clientEngine);

        // TODO: the world settings are really a property of the GameEngine.
        //       but they are currently used by interpolate function of DynamicObject.
        this.worldSettings = {
            width: 400,
            height: 400
        };

        this.sprites = {};
    }

    draw() {
        super.draw();

        // note - animating via the top attribute of a DOM element is a usually
        // bad practice, but used here for code brevity
        for (let objId of Object.keys(this.sprites)) {
            if (this.sprites[objId].el) {
                // console.log(this.sprites[objId]);
                this.sprites[objId].el.style.top = this.gameEngine.world.objects[objId].y + 'px';
                this.sprites[objId].el.style.left = this.gameEngine.world.objects[objId].x + 'px';
            }
        }


    }

    // add one object
    // return a reference to the object
    addObject(objData) {
        let sprite= {

        };

        if (objData.class == Paddle) {
            sprite.playerId = objData.playerId;

            console.log(objData);

            if (objData.id == 1){
                sprite.el = document.querySelector('.player1Paddle');
            } else if (objData.id == 2){
                sprite.el = document.querySelector('.player2Paddle');
            }
        } else if (objData.class == Ball) {
            sprite.el = document.querySelector('.ball');
        }

        this.sprites[objData.id] = sprite;
        return sprite;
    }

    // remove an object from the scene
    removeObject(o) {
    }

}

module.exports = NetpongRenderer;

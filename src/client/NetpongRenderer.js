"use strict";

const Renderer = require('incheon').render.Renderer;
var Paddle = require("../common/Paddle");
var Ball = require("../common/Ball");

class NetpongRenderer extends Renderer {

    constructor() {
        super();

        // TODO: the world settings are really a property of the GameEngine.
        //       but they are currently used by interpolate function of DynamicObject.
        this.worldSettings = {
            width: 400,
            height: 400
        };

        this.sprites = {};
    }

    init() {

    }

    draw() {
        super.draw();

        //note - animating via the top attribute of a DOM element is a usually
        //bad practice, but used here for code brevity
        // this.paddle1Sprite.style.top
    }

    // add one object
    // return a reference to the object
    addObject(objData) {
        console.log(objData);

        if (objData.class == Paddle) {

            // this.paddle1Sprite = document.querySelector(".player1Paddle");
            // this.paddle2Sprite = document.querySelector(".player2Paddle");
        }
    }

    // remove an object from the scene
    removeObject(o) {
    }

}

module.exports = NetpongRenderer;

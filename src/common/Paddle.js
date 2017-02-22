'use strict';

const DynamicObject= require('incheon').serialize.DynamicObject;

class Paddle extends DynamicObject {

    static get netScheme(){
        return Object.assign({}, super.netScheme);
    }

    static newFrom(sourceObj){
        let newPaddle = new Paddle();
        newPaddle.copyFrom(sourceObj);

        return newPaddle;
    }

    constructor(id, position, velocity){
        super(id, position, velocity);

        this.class = Paddle;
    };

}

module.exports = Paddle;

'use strict';

const DynamicObject= require('incheon').serialize.DynamicObject;

class Ball extends DynamicObject {

    static get netScheme(){
        return Object.assign({}, super.netScheme);
    }

    static newFrom(sourceObj){
        let newBall = new Ball();
        newBall.copyFrom(sourceObj);

        return newBall;
    }

    get bendingMultiple() { return 0.8; }
    get velocityBendingMultiple() { return 0; }

    constructor(id, position){
        super(id, position);

        this.class = Ball;

        this.velocity.set(2, 2);
    };

}

module.exports = Ball;

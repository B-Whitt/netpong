'use strict';

const DynamicObject= require('incheon').serialize.DynamicObject;

class Paddle extends DynamicObject {

    static get netScheme(){
        return Object.assign({}, super.netScheme);
    }

    constructor(id, position, velocity){
        super(id, position, velocity);
        this.class = Paddle;
    };

}

module.exports = Paddle;

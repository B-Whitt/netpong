const qsOptions = require("query-string").parse(location.search);
const NetpongClientEngine = require("../client/NetpongClientEngine");
const NetpongGameEngine = require('../common/NetpongGameEngine');


// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults = {
    traceLevel: 1,
    delayInputCount: 3,
    clientIDSpace: 1000000,
    gameUps: 60
};
let options = Object.assign(defaults, qsOptions);

//initialize game engine
const gameOptions = Object.assign({
    renderer: this.renderer
}, options);

const gameEngine = new NetpongGameEngine(gameOptions);

const netpongClientEngine = new NetpongClientEngine(gameEngine, options);


document.addEventListener("DOMContentLoaded", function(e) {
    netpongClientEngine.start();
});
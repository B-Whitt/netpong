const qsOptions = require("query-string").parse(location.search);
const NetpongClientEngine = require("../client/NetpongClientEngine");
const NetpongRenderer = require('../client/NetpongRenderer');
const NetpongGameEngine = require('../common/NetpongGameEngine');
const Synchronizer = require('incheon').Synchronizer;

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults = {
    traceLevel: 1,
    delayInputCount: 3,
    clientIDSpace: 1000000
};
let options = Object.assign(defaults, qsOptions);

// create a client engine, a game engine, a synchronizer, and a renderer
const renderer = new NetpongRenderer();
const gameOptions = Object.assign({ renderer }, options);
const gameEngine = new NetpongGameEngine(gameOptions);
const netpongClientEngine = new NetpongClientEngine(gameEngine, options);
const synchronizer = new Synchronizer(netpongClientEngine);

// object synchronization:
synchronizer.extrapolateObjectSelector = () => { return true; };

//start the client engine
netpongClientEngine.start();

//tie the client game loop to frame rendering
requestAnimationFrame(function(){
    netpongClientEngine.step();
});
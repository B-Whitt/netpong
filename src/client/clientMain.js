const qsOptions = require("query-string").parse(location.search);
const NetpongClientEngine = require("../client/NetpongClientEngine");
const NetpongGameEngine = require('../common/NetpongGameEngine');
const SimplePhysicsEngine = require('incheon').physics.SimplePhysicsEngine;

// default options, overwritten by query-string options
// is sent to both game engine and client engine
const defaults = {
    traceLevel: 1,
    delayInputCount: 3,
    clientIDSpace: 1000000,
    gameUps: 60,
    syncOptions: {
        sync: qsOptions.sync || 'extrapolate',
        localObjBending: 0.6,
        remoteObjBending: 0.6
    }
};
let options = Object.assign(defaults, qsOptions);

// initialize game engine
const physicsEngine = new SimplePhysicsEngine();
const gameOptions = Object.assign({ physicsEngine }, options);
const gameEngine = new NetpongGameEngine(gameOptions);
const netpongClientEngine = new NetpongClientEngine(gameEngine, options);

document.addEventListener("DOMContentLoaded", function(e) { netpongClientEngine.start(); });

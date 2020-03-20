const btRegex = /[0-9a-zA-Z]{2}[:][0-9a-zA-Z]{2}[:][0-9a-zA-Z]{2}[:][0-9a-zA-Z]{2}[:][0-9a-zA-Z]{2}[:][0-9a-zA-Z]{2}/g;
const { Worker, isMainThread, parentPort } = require('worker_threads');
const fs = require('fs');

global.bluetoothHandler = null;
global.btInterval = null;
global.btScanner = null;
global.sps = [];
global.saved = {};

global.bluetoothHandler = require('./bluetooth');

fs.readFile('./bluetoothDevices.json', 'utf8', (err, buff) => {
    if(err) {
        console.log(err);
        // io.emit("0", {message: "An error occured adding device with ID ".concat(data).concat(" to trusted devices")});
    } else {
        console.log('devices loaded');
        // console.log(buff);
        const devs = JSON.parse(buff);
        global.saved = devs.devices;
    }
});

global.btInterval = setInterval(() => {
    console.log('pinging bt ...');
    if(bluetoothHandler !== null) {
        console.log('bt logging...');
        global.btScanner = setInterval(() => {
            bluetoothHandler.scan().then(devs => {
                const sps = devs.match(btRegex);
                sps.splice(0,1);
                sps.splice(-1,1);
                global.sps = sps;
                
                parentPort.postMessage({type: 'save', message: global.sps});
                // console.log(global.saved);
                if(global.saved) {
                    const skeys = Object.keys(global.saved);
                    // console.log(global.saved);
                    sps.forEach((s) => {
                        // console.log('dev ', s);
                        if(skeys.includes(s)) {
                            parentPort.postMessage({type: 'unlockdoor', message: global.saved[s]});
                        }
                    });
                }
            });
        }, 1000);
        clearInterval(global.btInterval);
    }
});



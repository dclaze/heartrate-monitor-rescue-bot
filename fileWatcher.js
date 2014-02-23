var fs = require('fs');
var fileName = 'heartbeat.txt';
var http = require('http');
var HeartbeatTransporter = require('./heartbeatTransporter');

fs.watchFile(fileName, function(curr, prev) {
    var array = fs.readFileSync(fileName).toString().split('\r\n');
    var newValue = array[array.length - 1];

    var heartbeatTransport = new HeartbeatTransporter(value);
    heartbeatTransport.send(function() {
        console.log("It worked");
    });
})

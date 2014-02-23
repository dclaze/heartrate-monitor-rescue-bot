var express = require('express');
var app = express();
// var Signer = require('goinstant-auth').Signer;

app.use(express.bodyParser());

heartbeatCounter = 0;
heartbeats = [];
reset = true;

app.post('/heartbeat', function(req, res) {
    var heartbeat = req.body.heartbeat;

    if (isNewHeartbeatRecording(heartbeat) && !reset)
        resetHeartbeatTracking()
    else {
        heartbeats.push(heartbeat);
        reset = false;

        if (isPanicHeartbeat(heartbeat)) {
            console.log("Activating drone.");
            // activateDroneForRescue();
        } else
            console.log("Heartbeat stable: ", heartbeat);
    }

    res.end();
});

var isNewHeartbeatRecording = function(heartbeat) {
    return heartbeat == 0;
}

var isPanicHeartbeat = function(heartbeat) {
    // for (var counter = 0; heartbeat > 700 && heartbeat < 900; counter++) {
    //     if (counter > 500)
    //         return true;
    // }
    // return false;
    return true;
}

var resetHeartbeatTracking = function() {
    heartbeatCounter = 0;
    heartbeats = [];
    reset = true;
}

var activateDroneForRescue = function() {
    console.log("Sending takeoff command.");
    client.takeoff(function() {
        console.log("Drone lift off.");
    });

    client
        .after(3500, function() {
            this.stop();
            this.land();
        });
}

var isActivated = function() {
    return false;
}

app.post('/move/direction/:direction', function(req, res) {
    if (isActivated())
        console.log("User request direction change " + req.params.direction);
    else
        console.log("Drone is not active, direction change ignored.");
    res.end();
});

app.post('/move/yaw/:yaw', function(req, res) {
    if (isActivated())
        console.log("User request yaw change " + req.params.yaw);
    else
        console.log("Drone is not active, yaw change ignored");
    res.end();
});
app.use(express.static(__dirname + '/web-client'));

app.listen(39999);

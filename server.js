var express = require('express');
var app = express();
// var Signer = require('goinstant-auth').Signer;
var arDrone = require('ar-drone');
var client = arDrone.createClient();

app.use(express.bodyParser());

heartbeatCounter = 0;
heartbeats = [];
reset = true;

app.post('/heartbeat', function(req, res) {
    var heartbeat = req.body.heartbeat;
    console.log(heartbeat);
    if (heartbeat && heartbeat.length) {
        if (isNewHeartbeatRecording(heartbeat) && !reset)
            resetHeartbeatTracking()
        else {
            updateHeartbeatsArray(heartbeat);
            reset = false;

            if (isPanicHeartbeat(heartbeat)) {
                console.log("Activating drone.");
                activateDroneForRescue();
            } else
                console.log("Heartbeat stable: ", heartbeat);
        }
    }
    res.set("Connection", "close");
    res.end();
});

var updateHeartbeatsArray = function(heartbeat){
    heartbeats.push(heartbeat);
    heartbeats.unshift();
}

var isNewHeartbeatRecording = function(heartbeat) {
    return heartbeat == 0;
}

var isPanicHeartbeat = function(heartbeat) {
    if(heartbeat > 700)
        return true;
    else
        return false;
    // for (var counter = 0; heartbeat > 700 && heartbeat < 900; counter++) {
    //     if (counter > 500)
    //         return true;
    // }
    // return false;
}

var resetHeartbeatTracking = function() {
    heartbeatCounter = 0;
    heartbeats = [];
    reset = true;
}

var activateDroneForRescue = function() {
    // if(isInAir)
    //     return;
    // isInAir = true;
    console.log("Sending takeoff command.");
    client.takeoff(function() {
        console.log("Drone lift off.");
    });
    client.after(2000, function(){
        this.front(.6);
    });
    client
        .after(3500, function() {
            this.stop();
            this.land(function(){
                console.log("LANDING");
                isInAir = false;
            });
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
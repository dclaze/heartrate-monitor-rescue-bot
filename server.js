var express = require('express');
var app = express();
var Signer = require('goinstant-auth').Signer;
var signer = new Signer("JTPqdOS2lhs7MwrCqwQlylzHX-qNsILq6C9zNQgN83DfO4jJMPM6HpRXWWpiwv9okWPjtywJSPHNfgErw7NgOQ");

app.use(express.bodyParser());

//app.get('/startup', function(req, res) {
//    res.send("TOKEN")
    // var userId = req.query.userId;
    // var userName = req.query.userName;
    // signer.sign({
    //     domain: 'localhost',
    //     id: userId,
    //     displayName: userName,
    //     groups: [{
    //         id: 'room-' + 'heartbeat',
    //         displayName: 'Heartbeat Monitor'
    //     }]
    // }, function(err, token) {
    //     if (err) {
    //         res.status(500);
    //         res.send("Unable to grant user token" + " "+ err);
    //     }
    //     res.send(token);
    // });
//});

app.post('/heartbeat', function(req, res) {
    var heartbeat = req.body.heartbeat;
    if (isPanicHeartbeat(heartbeat)){
        console.log("Activating drone.")
        activateDroneForRescue();
    }
    else
        console.log("Heartbeat stable: ", heartbeat);

    res.end();
});

var isPanicHeartbeat = function(heartbeat) {
    //TODO FIGURE IT OUT
    return false;
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

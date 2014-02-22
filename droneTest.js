var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.takeoff(function() {
    console.log("Drone lift off.");
});

client
    .after(3500, function() {
        this.stop();
        this.land();
    });

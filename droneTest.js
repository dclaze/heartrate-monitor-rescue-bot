var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.on('batteryChange', function(batteryLife){
	console.log("Current battery life: ", batteryLife, "%.");
})
client.takeoff(function() {
    console.log("Drone lift off.");
});
client.after(1000, function(){
	this.down(.1);
})
client.after(1500, function() {
    this.front(.6);
});
client
    .after(3500, function() {
        this.stop();
        this.land(function() {
            console.log("LANDING");
            isInAir = false;
        });
    });
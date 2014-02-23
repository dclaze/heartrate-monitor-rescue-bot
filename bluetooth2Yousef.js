var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbmodemfa131", {
    baudrate: 38400
});
var http = require('http');
var HeartbeatTransporter = require('./heartbeatTransporter');
var fs = require('fs');

waiting = false;
serialPort.on("open", function() {
    console.log('open');
    serialPort.on('data', function(data) {
        console.log("RECEIVED", data.toString());
        if(waiting)
          return;
        var dataString = data.toString();
        var stringCount = dataString.trim().length;
        if (stringCount == 0)
            return;

        var newValue = parseInt(data.toString()
            .trim());

		if(newValue>600)
			sendTrilioText(newValue);
			
        fs.appendFile('heartbeat.txt', '\n'+newValue, function(err) {
            if (err) throw err;
            console.log('Orig ' + data.toString() + ' New ' + newValue);
        });
    });
});

SENT_TEXT = false;
var sendTrilioText = function(value){
	if(SENT_TEXT)
		return;
	SENT_TEXT = true;
	var sys = require('sys')
	var exec = require('child_process').exec;
	var child;
 
	child = exec("php twilio-php-master/sendnotifications.php", function (error, stdout, stderr) {
	sys.print('stdout: ' + stdout);

	sys.print('stderr: ' + stderr);

	if (error !== null) {
		console.log('exec error: ' + error);
	}
});
}
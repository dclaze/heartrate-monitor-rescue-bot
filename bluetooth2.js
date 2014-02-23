var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.H-C-2010-06-01-DevB", {
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


        fs.appendFile('heartbeat.txt', '\n'+newValue, function(err) {
            if (err) throw err;
            console.log('Orig ' + data.toString() + ' New ' + newValue);
        });

        console.log('SENDING', newValue);
        var heartbeatTransport = new HeartbeatTransporter(newValue);
        waiting = true;
        heartbeatTransport.send(function() {
            waiting = false;
            console.log("It worked");
        });
    });
});
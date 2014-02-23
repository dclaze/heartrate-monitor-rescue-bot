var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.H-C-2010-06-01-DevB", {
  baudrate: 38400
});
var http = require('http');
var HeartbeatTransporter = require('./heartbeatTransporter');

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
                var newValue = data.toString()
                                .replace(/[a-zA-Z]/g,"")
                                .replace(/\r\n/g,"")
                .trim();
    var heartbeatTransport = new HeartbeatTransporter(newValue);
    heartbeatTransport.send(function(){
        console.log("It worked");
    });
  });
});


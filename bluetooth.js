var btSerial = new(require('bluetooth-serial-port')).BluetoothSerialPort();

var http = require('http');
var HeartbeatTransporter = require('./heartbeatTransporter');


btSerial.on('found', function(address, name) {
    console.log(address, name);
    btSerial.findSerialPortChannel(address, function(channel) {
        btSerial.connect(address, channel, function() {
            console.log('connected');

            btSerial.write(new Buffer('my data', 'utf-8'), function(err, bytesWritten) {
                if (err) console.log(err);
            });

            btSerial.on('data', function(buffer) {
                console.log(buffer.toString('utf-8'));
            });
        }, function() {
            console.log('cannot connect');
        });

        // close the connection when you're ready
        btSerial.close();
    })
});

var heartbeatTransport = new HeartbeatTransporter("heartbeart 1232");
heartbeatTransport.send(function(){
    console.log("It worked");
});
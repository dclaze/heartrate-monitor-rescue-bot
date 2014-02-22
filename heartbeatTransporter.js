var querystring = require('querystring'),
    http = require('http');

function HeartbeatTransporter(incomingData, options) {
    this.data = getHeartbeatDataAsQueryString(incomingData);
    this.options = getHeartbeatRequestOptions(this.data, options || {});
}

HeartbeatTransporter.prototype.send = function(success, failure) {
    var req = http.request(this.options, success, failure);
    req.write(this.data);
    req.end();
};

var getHeartbeatDataAsQueryString = function(data) {
    return querystring.stringify({
        heartbeat: data
    });
};

var getHeartbeatRequestOptions = function(dataQueryString, options) {
    return {
        host: options.host || "localhost",
        port: options.port || 39999,
        path: options.path || "/heartbeat",
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(dataQueryString)
        }
    };
};

module.exports = HeartbeatTransporter;

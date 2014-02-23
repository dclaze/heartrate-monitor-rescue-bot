var Signer = require('goinstant-auth').Signer;
var signer = new Signer("JTPqdOS2lhs7MwrCqwQlylzHX-qNsILq6C9zNQgN83DfO4jJMPM6HpRXWWpiwv9okWPjtywJSPHNfgErw7NgOQ");

var express = require('express');
var app = express();

app.use(express.bodyParser());
app.get('/startup', function(req, res) {
    var userId = req.query.userId;
    var userName = req.query.userName;
    signer.sign({
        domain: 'localhost',
        id: userId,
        displayName: userName,
        groups: [{
            id: 'room-' + 'heartbeat',
            displayName: 'Heartbeat Monitor'
        }]
    }, function(err, token) {
        if (err) {
            res.status(500);
            res.send("Unable to grant user token" + " "+ err);
        }
        res.send(token);
    });
});

app.listen(40000);
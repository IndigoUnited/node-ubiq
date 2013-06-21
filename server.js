'use strict';

var app = require('http').createServer(handler);
var fs  = require('fs');
var omni = require('./index').listen(app);

omni.everyone.doSomething = function (a, b, c, cb) {
    console.log('got', arguments);

    cb(a + b + c);
};

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

var omni = app.listen(8080);
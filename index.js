'use strict';

var io = require('socket.io');

var Omni = function () {
    this._io = null;

    this.clients = {};
    this.sockets = null;

    this.everyone = {};
};

Omni.listen = function () {
    var omni     = new Omni();
    var everyone = omni.everyone;
    var _io      = this._io = io.listen.apply(io, arguments);

    omni.sockets = _io.sockets;

    omni.sockets.on('connection', function (socket) {
        var socketId = socket.id;

        omni.clients[socketId] = socket;

        socket.on('disconnect', function () {
            delete omni.clients[socketId];
        });

        socket.on('rpc', function (ctx, method) {
            // note that the rest of the args are actual arguments

            if (everyone.hasOwnProperty(method)) {
                var args = Array.prototype.slice.call(arguments, 2);
                everyone[method].apply(ctx, args);
            } else {
                console.error('Unknown method:', method);
            }
        });
    });

    return omni;
};

module.exports = Omni;

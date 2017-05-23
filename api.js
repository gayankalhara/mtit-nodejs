'use strict';

let Hapi = require('hapi');
let mongoose = require('mongoose');
let restHapi = require('rest-hapi');

const config = require('./config');

function api() {

    let server = new Hapi.Server();

    server.connection({port: 8124});

    restHapi.config = config;

    server.connection(restHapi.config.server.connection);

    server.register({
            register: restHapi,
            options: {
                mongoose: mongoose
            }
        },
        function () {
            server.start(function () {
                restHapi.logUtil.logActionComplete(restHapi.logger, "Server Initialized", server.info);
            });
        });

    return server;
}

module.exports = api();
'use strict';

const express = require('express');
const bodyParser= require('body-parser');
const app = express();
let mongoose = require('mongoose');
let config = require('./config.json');

let invoiceRoutes = require('./routes/invoice');

let PORT = config.port;

let DB_PORT = config.db.port;
let DB_HOST_NAME = config.db.host;
let DB_NAME = config.db.database;
let DB_USERNAME = config.db.username;
let DB_PASSWORD = config.db.password;

mongoose.connect('mongodb://' + DB_USERNAME + ':' + DB_PASSWORD + '@' + DB_HOST_NAME + ':'  + DB_PORT + '/' + DB_NAME);

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome to goInvoicr REST API');
});

app.use('/invoice', invoiceRoutes);

app.listen(PORT, function () {
    console.log('goInvoicr Server listening on port ' + PORT + '!');
});
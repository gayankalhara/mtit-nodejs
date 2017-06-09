let express = require('express');
let Invoice = require('../models/invoice.model');

let invoiceRouter = express.Router();

invoiceRouter
    .route('/create')
    .post(function (request, response) {

        console.log('POST /create');

        let invoice = new Invoice(request.body);

        invoice.save();

        response.status(201).send(invoice);
    });

module.exports = invoiceRouter;
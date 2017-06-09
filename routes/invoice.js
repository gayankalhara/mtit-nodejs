let express = require('express');
let Invoice = require('../models/invoice.model');

let invoiceRouter = express.Router();

invoiceRouter
    .route('/create')
    .post(function (request, response) {

        console.log('POST /create');

        new Invoice(request.body).save(function(err, result) {
            if (err) {
                response.status(500).send(err);
                throw err;
            }

            if(result) {
                response.status(201).send(result);
            }
        });


    });

module.exports = invoiceRouter;
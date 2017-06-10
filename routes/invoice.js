let express = require('express');
let Invoice = require('../models/invoice.model');

let invoiceRouter = express.Router();

invoiceRouter
    .route('/create')
    .put(function (request, response) {

        console.log('POST /invoice/create');

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

invoiceRouter
    .route('/fetch')
    .get(function (request, response) {

        console.log('GET /invoice/fetch');

        Invoice.find({}).sort({createdAt: 'desc'}).exec(function(err, invoices) {
            if(err) {
                response.send(err);
            } else {
                response.send(invoices);
            }
        });

    });

invoiceRouter
    .route('/delete/:invoiceNumber')
    .delete(function (request, response) {

        console.log('DELETE /invoice/:invoiceNumber');

        let invoiceNumber = request.params.invoiceNumber;

        Invoice.findOne({ invoiceNumber: invoiceNumber }, function (error, item) {

            if (error) {
                response.status(500).send(error);
                return;
            }

            if (item) {
                item.remove(function (error) {

                    if (error) {
                        response.status(500).send(error);
                        return;
                    }

                    response.status(200).json({
                        'message': 'Invoice with id ' + invoiceNumber + ' was removed.'
                    });
                });
            } else {
                response.status(404).json({
                    message: 'Invoice with id ' + invoiceNumber + ' was not found.'
                });
            }
        });

    });

module.exports = invoiceRouter;
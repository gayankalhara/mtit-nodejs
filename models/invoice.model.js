let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let invoiceSchema = new Schema({
    invoiceNumber: {
        type: String,
        unique: true,
        required: true
    },
    invoiceDate: {
        type: Object,
        required: true
    },
    dueDate: {
        type: Object,
        required: true
    },
    items: {
        type: Array,
        required: true,
    }
}, { collection: 'invoices' });

module.exports = mongoose.model('Invoice', invoiceSchema);
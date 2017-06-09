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
    },
    discountType: {
        type: String
    },
    discount: {
        type: Number
    },
    subTotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    collection: 'invoices'
});

module.exports = mongoose.model('Invoice', invoiceSchema);
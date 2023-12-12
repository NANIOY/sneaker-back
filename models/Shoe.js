const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the Shoe model schema
const ShoeSchema = new Schema({
    color: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    lacesColor: {
        type: String,
        required: true,
    },
    soleColor: {
        type: String,
        required: true,
    },
    logoColor: {
        type: String,
        required: true,
    },
    pattern: {
        type: String,
    },
    contactInfo: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['In Production', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'In Production',
    },
});

const Shoe = mongoose.model('Shoe', ShoeSchema);

module.exports = Shoe;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoeSchema = new Schema({
    shoeType: {
        type: String,
        required: true,
    },
    shoeSize: {
        type: Number, // Keep it as a single number
        required: true,
    },
    shoeColorSole: {
        type: String,
        required: true,
    },
    shoeColorLaces: {
        type: String,
        required: true,
    },
    shoeColorPanelDown: {
        type: String,
        required: true,
    },
    shoeColorPanelUp: {
        type: String,
        required: true,
    },
    shoeMaterialPanelDown: {
        type: String,
        required: true,
    },
    shoeMaterialPanelUp: {
        type: String,
        required: true,
    },
    jewel: {
        type: String,
        required: true,
    },
    initials: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Order placed', 'In Production', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Order placed',
    },
    userName: {
        type: String,
        required: true,
    },
    userAddress: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    colorOptions: {
        type: [String],
        required: true,
    },
    selectedColors: {
        type: [String],
        required: true,
    },
    selectedMaterials: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Shoe = mongoose.model('Shoe', ShoeSchema);

module.exports = Shoe;

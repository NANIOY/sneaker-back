const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoeSchema = new Schema({
    shoeType: {
        type: String,
        required: false,
    },
    shoeSize: {
        type: String,
        required: false,
    },
    shoeColorSole: {
        type: String,
        required: false,
    },
    shoeColorLaces: {
        type: String,
        required: false,
    },
    shoeColorPanelDown: {
        type: String,
        required: false,
    },
    shoeColorPanelUp: {
        type: String,
        required: false,
    },
    shoeMaterialPanelDown: {
        type: String,
        required: false,
    },
    shoeMaterialPanelUp: {
        type: String,
        required: false,
    },
    jewel: {
        type: String,
        required: false,
    },
    initials: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    userName: {
        type: String,
        required: false,
    },
    userAddress: {
        type: String,
        required: false,
    },
    userEmail: {
        type: String,
        required: false,
    },
    colorOptions: {
        type: [String],
        required: false,
    },
    selectedColors: {
        type: [String],
        required: false,
    },
    selectedMaterials: {
        type: [String],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Shoe = mongoose.model('Shoe', ShoeSchema);

module.exports = Shoe;

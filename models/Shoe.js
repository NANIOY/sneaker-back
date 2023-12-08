const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({

});

const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;

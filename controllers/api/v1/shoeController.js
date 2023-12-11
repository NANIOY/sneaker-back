const Shoe = require('../../../models/Shoe');

// get all shoe orders
const getShoeOrders = async (req, res) => {
    try {
        const shoeOrders = await Shoe.find();

        res.status(200).json({
            status: 'success',
            message: 'Fetched all shoe orders successfully',
            data: {
                shoeOrders,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

// create a new shoe order
const createShoeOrder = async (req, res) => {
    try {
        const {
            color,
            size,
            lacesColor,
            soleColor,
            logoColor,
            pattern,
            contactInfo
        } = req.body;

        // create a new shoe order with provided data
        const newShoeOrder = new Shoe({
            color,
            size,
            lacesColor,
            soleColor,
            logoColor,
            pattern,
            contactInfo
        });

        // save the shoe order to the database
        const savedShoeOrder = await newShoeOrder.save();

        res.status(201).json({
            status: 'success',
            message: 'Shoe order created successfully',
            data: {
                shoeOrder: savedShoeOrder,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};

module.exports = {
    getShoeOrders,
    createShoeOrder,
};

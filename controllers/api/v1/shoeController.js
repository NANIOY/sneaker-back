const Shoe = require('../../../models/Shoe');

// get all shoe orders with optional sorting
const getShoeOrders = async (req, res) => {
    try {
        const validSortOptions = ['createdAt', 'color', 'size'];
        const sortBy = validSortOptions.includes(req.query.sortby) ? req.query.sortby : 'createdAt';
        const sortOrder = req.query.sortorder === 'desc' ? -1 : 1;

        const sortObject = { [sortBy]: sortOrder };
        const shoeOrders = await Shoe.find().sort(sortObject);

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

// get a shoe order by id
const getShoeById = async (req, res) => {
    try {
        const { id } = req.params;

        // find the shoe by id
        const shoe = await Shoe.findById(id);

        // check if the shoe exists
        if (!shoe) {
            return res.status(404).json({
                status: 'error',
                message: 'Shoe not found',
            });
        }

        // return the shoe details
        res.status(200).json({
            status: 'success',
            message: 'Fetched shoe details successfully',
            data: {
                shoeDetails: shoe,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
};

module.exports = {
    getShoeOrders,
    createShoeOrder,
    getShoeById,
};

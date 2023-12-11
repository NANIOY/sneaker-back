const Shoe = require('../../../models/Shoe');

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

module.exports = {
    getShoeOrders,
};

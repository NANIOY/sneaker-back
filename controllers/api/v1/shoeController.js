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
    console.log('Request Body:', req.body);
    try {
        const newShoeOrder = new Shoe(req.body.shoe);
        await newShoeOrder.save();

        // emit WebSocket message to all connected clients
        req.app.locals.primus.write({
            status: 'success',
            message: 'Shoe order created successfully',
            data: {
                shoeOrder: newShoeOrder,
            },
        });

        res.status(201).json({
            status: 'success',
            message: 'Shoe order created successfully',
            data: {
                shoeOrder: newShoeOrder,
            },
        });
    } catch (error) {
        console.error('Error saving shoe order:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
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

// delete a shoe order by id (admin access required)
const deleteShoeOrder = async (req, res) => {
    try {
        const { id } = req.params;

        // check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden: Admin access required',
            });
        }

        // delete the shoe order
        const deletedShoe = await Shoe.findByIdAndDelete(id);

        if (!deletedShoe) {
            return res.status(404).json({
                status: 'error',
                message: 'Shoe not found',
            });
        }

        // emit WebSocket message to all connected clients
        req.app.locals.primus.write({
            status: 'success',
            message: 'Shoe order deleted successfully',
            data: {
                deletedShoe,
            },
        });

        res.json({
            status: 'success',
            message: 'Shoe order deleted successfully',
            data: {
                deletedShoe,
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

// put/patch a shoe order by id (admin access required)
const updateShoeOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden: Admin access required',
            });
        }

        const updates = req.body;

        // validate "status" if included in the updates
        if ('status' in updates) {
            const validStatusValues = ['Order Placed', 'In Production', 'Shipped', 'Delivered', 'Cancelled'];

            if (!validStatusValues.includes(updates.status)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid status value',
                });
            }
        }

        // update all fields
        const updatedShoe = await Shoe.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        if (!updatedShoe) {
            return res.status(404).json({
                status: 'error',
                message: 'Shoe not found',
            });
        };

        // emit WebSocket message to all connected clients
        req.app.locals.primus.write({
            status: 'success',
            message: 'Shoe order details updated successfully',
            data: {
                updatedShoe,
            },
        });

        res.json({
            status: 'success',
            message: 'Shoe order details updated successfully',
            data: {
                updatedShoe,
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
    deleteShoeOrder,
    updateShoeOrder,
};

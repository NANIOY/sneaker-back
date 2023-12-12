const User = require('../../../models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;

        // hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with the same username or email already exists' });
        }

        // create the user with the hashed password
        const newUser = new User({ username, email, password: hashedPassword, isAdmin });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        // find the user by id and delete it
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
};

const User = require('../../../models/User');

const createUser = async (req, res) => {
    try {
        const { username, email, password, isAdmin } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with the same username or email already exists' });
        }

        // create new user
        const newUser = new User({ username, email, password, isAdmin });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllUsers = async (res) => {
    try {
        const users = await User.find({}, { password: 0 }); // exclude password from response
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { 
    createUser,
    getAllUsers,
};
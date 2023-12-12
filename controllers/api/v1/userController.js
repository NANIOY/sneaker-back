const User = require('../../../models/User');

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with the same username or email already exists' });
        }

        // create new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { createUser };
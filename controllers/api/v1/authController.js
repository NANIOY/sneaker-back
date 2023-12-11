// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../../../models/User');

// const register = async (req, res) => {
//     try {
//         console.log('Received data:', req.body);
//         const { username, password } = req.body;

//         // Check if the user already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Create a new user with plain text password
//         const newUser = new User({ username, password });
//         await newUser.save();

//         res.json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Error registering user:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// module.exports = { register };

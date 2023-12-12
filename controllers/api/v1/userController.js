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

const updatePassword = async (req, res) => {
    try {
        const { userId } = req.user;
        const { currentPassword, newPassword } = req.body;

        // fetch the user by id
        const user = await User.findById(userId);

        // check if the current password is valid
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid current password' });
        }

        // hash and update the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        // save the updated user
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const { username, email } = req.body;

        // fetch the user by id
        const user = await User.findById(userId);

        // check if the updated username or email already exists for another user
        const existingUser = await User.findOne({
            $and: [
                { _id: { $ne: userId } }, // exclude the current user
                { $or: [{ username }, { email }] },
            ],
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // update the username and/or email
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }

        // save the updated user
        await user.save();

        res.json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUser = async (req, res) => {
    try {
      const { userId } = req.user;
  
      // fetch the user by id
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // exclude the password and isAdmin fields
      const userProfile = {
        username: user.username,
        email: user.email,
      };
  
      res.json({ message: 'User profile fetched successfully', data: userProfile });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updatePassword,
    updateUser,
    getUser,
};

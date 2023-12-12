// import dependencies
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// create Express app
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// import route handlers
const shoeRoutes = require('./routes/api/v1/shoes');
const userRoutes = require('./routes/api/v1/users');
const authRoutes = require('./routes/api/v1/auth');

// use route handlers for different parts of the application
app.use('/api/v1/shoes', shoeRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

// start the server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

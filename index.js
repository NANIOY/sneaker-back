require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const shoeRoutes = require('./routes/api/v1/shoes');
const userRoutes = require('./routes/api/v1/users');
const authRoutes = require('./routes/api/v1/auth');

app.use(express.json());

app.use('/api/v1/shoes', shoeRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

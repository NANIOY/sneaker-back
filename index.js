const express = require('express');
const mongoose = require('mongoose');
const shoesRoutes = require('./routes/api/v1/shoes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/sneakerstore', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use('/api/v1/shoes', shoesRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

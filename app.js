const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config()

const cors = require('cors');
const errorHandler = require('./middileware/error-handler');


const adminRoutes = require('./routes/admin');
const searchRoutes = require('./routes/search.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())



app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
    res.send('<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center"><h1 style="color: blueviolet">API RUNNING...</h1><p style="color: lightcoral">Powered by SOFTLAB IT TEAM</p></div>')
})

mongoose.connect(
    // `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/${process.env.DB_NAME}?authSource=${process.env.AUTH_SOURCE}`,
    `mongodb://localhost:27017/${process.env.DB_NAME}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server is running at port:${port}`));
        console.log('Connected to mongoDB');

    })
    .catch(err => {
        console.error('Oops! Could not connect to mongoDB Cluster0', err);
    })
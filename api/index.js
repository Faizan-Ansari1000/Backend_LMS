const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Route = require('./Routes/authRoute');
const stdRoute = require('./Routes/stdRoute');
const courseRoute = require('./Routes/courseRoute');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/', Route);
app.use('/api', stdRoute);
app.use('/', courseRoute)

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => {
            console.log('DB Connected and Server started on port 5000');
        });
    })
    .catch((err) => {
        console.error('Error connecting to DB:', err);
    });

module.exports = app;
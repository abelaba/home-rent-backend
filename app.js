const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express()
const cors = require("cors");


// * IMPORT ROUTES
const authRoute = require('./routes/auth');
// const rentingRoute = require('./routes/renting');

dotenv.config();


// * CONNECT TO DB
mongoose.connect(
    // process.env.DB_connect,
    'mongodb://127.0.0.1:27017/Home_renting_app',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
        console.log("*** DATABASE HAS CONNECTED SUCCESSFULLY");
    })

// * MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use('/uploads/', express.static('uploads'));


// * ROUTE MIDDLEWARE
app.use('/api/user', authRoute);
// app.use('/api/rental',rentingRoute);


// * STARTS SERVER
app.listen(3000, () => {
    console.log("*** SERVER IS RUNNING ON PORT 3000");
})
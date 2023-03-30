// getting-started.js
const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async function() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('DB connected');
        return
    } catch (error) {
        console.log('DB connection error');
        return;
    }
}

module.exports = { connectDB }
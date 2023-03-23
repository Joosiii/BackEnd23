const mongoose = require("mongoose")

const profilesSchema = new mongoose.Schema({
    name: String,
    age: Number,
    pet: String,
    country: String,
    bio: String,
    interests: [String]
})
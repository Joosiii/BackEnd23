const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    interests: {
        type: [String],
        required: true
    },
});

const ProfileModel = mongoose.model("profiles", profileSchema);

module.exports = ProfileModel;
const { Schema, model } = require('mongoose');

const profilesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    pet: {
        type: String,
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

const ProfileSchema = model('ProfileSchema', profilesSchema);

module.exports = {ProfileSchema}
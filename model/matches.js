const mongoose = require("mongoose");

const matchesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    type: {
        type: [String],
        required: true
    },
   bio: {
        type: String, 
        required: true
   },
   seen: {
       type: Boolean,
       required: false,
       default: false
   }
});

const matchesModel = mongoose.model("matches", matchesSchema);

module.exports = matchesModel;


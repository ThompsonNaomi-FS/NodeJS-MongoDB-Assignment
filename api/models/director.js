const mongoose = require('mongoose');

const directorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    }
});

module.exports = mongoose.model("Director", directorSchema);
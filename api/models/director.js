const mongoose = require('mongoose');

const directorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});

module.exports = mongoose.model("Director", directorSchema);
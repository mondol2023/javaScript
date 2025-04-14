const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String },
    author: {type: String },
    genre: {type: String },
    isbn : {type: Number },
    price: {type: Number },
    available: {type: Boolean }
});


module.exports = mongoose.model('Book', bookSchema);
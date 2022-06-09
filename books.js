'use strict';

const mongoose = require('mongoose');

//destructure
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {type: String},
  description: {type: String},
  status: {type: String},
  email: {type: String}
});

const BookModel = mongoose.model('book-collection', bookSchema);

module.exports = BookModel;
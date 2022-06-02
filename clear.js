'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const Book = require('./books');

async function clear() {
  try {
    await Book.deleteMany({});
    console.log('books deleted');
  } catch(error) {
    console.error('call the devs something went wrong when deleting: ', error);
  } finally {
    mongoose.disconnect();
  }
}

clear();
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const Book = require('./books');

async function seed() {
  const book = new Book({
    title: 'The Bitcoin Standard: The Decentralized Alternative to Central Banking',
    description: 'A comprehensive and authoritative exploration of Bitcoin and its place in monetary history',
    status: 'available'
  });

  book.save(function (err) {
    if (err) console.log(err);
    else console.log('bitcoin to the mooooooooooooooon')
  })

  await Book.create({
    title: 'HTML&CSS',
    description: 'John Duckett',
    status: 'available'
  });

  await Book.create({
    title: 'JavaScript&JQUERY',
    description: 'John Duckett',
    status: 'unavailable'
  });

  mongoose.disconnect();
}

seed();
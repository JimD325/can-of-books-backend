'use strict';

// Add Mongoose to your server. Ensure your local Mongo database is running. Connect to the Mongo database from within your server code. 

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); //
const PORT = process.env.PORT || 3002;

// Mongoose implemented below per guidelines given in class 11 repo. 
const mongoose = require('mongoose');
const BookModel = require('./books');
const { response } = require('express');
// below you make what is called a connection string, it is stored in env file. what we are conencting in process.env is bananas. This is where we connect to mongoDB hosted on atlas.
mongoose.connect(process.env.MONGODB_URI);
// creating an instance of mongodb connection and assigning it to a variable
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// this is our success message from mongo.
db.once('open', function() {
  console.log('Mongoose is connected to ATLAS')
});

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', async (req,res)=>{
  const books = await BookModel.find({})
  res.send(books)
})

app.post('/books', async (req, res) =>{
  try{
  // if request.body has everything you need in the right shape then you can pass it straight to Model
  // line below is creating a new entry in our database.
  const newBook = await BookModel.create(req.body);
  // we want to send the newBook that has been created in MongoDB back to the React Client so that react can save it in the state object. This makes it so when we go to delete/update that newBook, we have the MongoID to do it with.  
  // Newbook below is a JSON representation coming to the frontend from the backen. 
  response.status(201).send(newBook);
  }
  catch(error) {
    console.error(error);
    res.status(500).send('Error when making new book');
  }
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

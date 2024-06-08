// dbinit.js
require('dotenv').config();
const mongoose = require('mongoose');

const DBURL = process.env.DBURL;

mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

module.exports = mongoose; // Export mongoose in case you need to use it in other files

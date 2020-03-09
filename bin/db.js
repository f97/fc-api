/* eslint-disable no-console */
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fccloud';
const debug = console.log.bind(console);

const con = mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (error) {
    debug('Error mongoose connect:', error);
  }
  else {
    debug('Connected successfully to server');
  }
});

module.exports = con;

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()
require('dotenv').config()

app.get('/', function (req, res) {
  res.send('hello world')
})


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/API_AUTHENTICATION", {
  useNewUrlParser: true
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/userRoutes'));

// http://localhost:3000/users/signup
// http://localhost:3000/users/signin
// http://localhost:3000/users/secret

module.exports = app;

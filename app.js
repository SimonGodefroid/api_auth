const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const mongoose = require('mongoose');
const fs = require('fs')
const https = require('https')
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

// Start the server
const port = process.env.PORT || 3000;
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, () => {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/')
  })
console.log(chalk.blue(`Server listening at ${port}`));

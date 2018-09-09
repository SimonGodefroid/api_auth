const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users',require('./routes/userRoutes'));

// http://localhost:3000/users/signup
// http://localhost:3000/users/signin
// http://localhost:3000/users/secret

// Start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`)

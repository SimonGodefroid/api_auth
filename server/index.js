const app = require('./app');
const fs = require('fs');
const https = require('https');
const chalk = require('chalk');
// Start the server
const port = process.env.PORT || 5000;
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(port, () => {
    console.log(`Example app listening on port ${port}! Go to https://localhost:${port}/`)
  })
console.log(chalk.blue(`Server listening at ${port}`));

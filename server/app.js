const express = require('express');
const bodyParser = require('body-parser');
const router = require('./server/Routes');

const app = express();

app.use(bodyParser.json());
app.use('/', router);
const server = app.listen(3001, () => {
  console.log(`Listening on port ${server.address().port}...`);
});

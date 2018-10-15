const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/Routes');
require('dotenv').config();
const app = express();
const errorhandler = require("errorhandler")
app.use(errorhandler());
app.use(bodyParser.json());
app.use('/', router);

const server = app.listen(3001, () => {
  console.log(`Listening on port ${server.address().port}...`);
});

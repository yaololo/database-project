const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors");
const path = require("path");

// Create global app object
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

app.use(cors());

// Normal express config defaults
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "../client")));

const server = app.listen(3001, function() {
  console.log(`Server Listening on port ${server.address().port}...`);
});

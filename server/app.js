const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors");
const router = require("./routes");
const path = require("path");

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(bodyParser.json());

const staticFiles = express.static(path.join(__dirname, "../client/build"));

if (process.env.isProduction) {
  app.use(staticFiles);
} else {
  app.use(express.static(path.join(__dirname, "client")));
}

if (process.env.isProduction) {
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

module.exports = app;

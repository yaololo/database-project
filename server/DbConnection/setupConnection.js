const mysql = require('mysql');
require('dotenv').config();

var dbSetup = {
  connect: function() {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: process.env.PROJECT_PASSWORD,
      database: process.env.PROJECT_NAME
    });
    connection.connect(function(error) {
      if (error) {
        console.error(error);
      } else {
        console.log('Database connected');
      }
    });
    return connection;
  }
};

module.exports = dbSetup;

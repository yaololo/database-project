const mysql = require("mysql");

var dbSetup = {
  connect: function() {
    var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "school_project"
    });
    connection.connect(function(error) {
      if (error) {
        console.error(error);
      } else {
        console.log("Database connected");
      }
    });
    return connection;
  }
};

module.exports = dbSetup;

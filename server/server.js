const app = require("./app");
var mysql = require("mysql");
var connection = mysql.createConnection({
  // connectionLimit: 50,
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

const server = app.listen(3001, function() {
  console.log(`Server Listening on port ${server.address().port}...`);
});
connection.query("SELECT * FROM testing", function(error, results, fields) {
  if (error) throw error;
  else console.log(results);
});
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// })

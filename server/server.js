const app = require("./app");

const server = app.listen(3001, function() {
  console.log(`Server Listening on port ${server.address().port}...`);
});

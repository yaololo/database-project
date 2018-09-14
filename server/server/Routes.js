const router = require('express').Router();
const dbSetup = require('../DbConnection/setupConnection');

router.get('/get', async function(req, res) {
  try {
    var connection = dbSetup.connect();
    connection.query('SELECT * FROM testing', function(error, results, fields) {
      if (error) throw error;
      else {
        console.log(results);
        return res.status(200).send(
          JSON.stringify({
            msg: results
          })
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

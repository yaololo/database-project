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
    connection.end();
  } catch (error) {
    console.log(error);
  }
});

router.get('/hotItems', async function(req, res) {
  try {
    var connection = dbSetup.connect();
    connection.query('SELECT * FROM Products', function(
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
        return res.status(500).send(
          JSON.stringify({
            data: 'Something went wrong while retrieving data.'
          })
        );
      } else {
        return res.status(200).send(
          JSON.stringify({
            data: results
          })
        );
      }
    });
    connection.end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

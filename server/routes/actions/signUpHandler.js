const dbSetup = require('../../DbConnection/setupConnection');

const signUpHandler = async function(req, res) {
  try {
    console.log(req.body);
    return res.status(200).send(
      JSON.stringify({
        data: req.body.user
      })
    );
    // var connection = dbSetup.connect();
    // connection.query('SELECT * FROM product', function(error, results, fields) {
    //   if (error) {
    //     console.log(error);
    //     return res.status(500).send(
    //       JSON.stringify({
    //         data: 'Something went wrong while retrieving data.'
    //       })
    //     );
    //   } else {
    //     return res.status(200).send(
    //       JSON.stringify({
    //         data: results
    //       })
    //     );
    //   }
    // });
    // connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = signUpHandler;

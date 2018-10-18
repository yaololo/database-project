const dbSetup = require("../../DbConnection/setupConnection");

const custOrderHist = async function(req, res) {
  try {
    let customer_id = req.body.user.customerId;


    var connection = dbSetup.connect();
    let sql =
      "call `custOrderHist`(?);";

    connection.query(sql, customer_id, function(
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
        return res.status(500).send(
          JSON.stringify({
            data: "Something went wrong while retrieving data."
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
};

module.exports = custOrderHist;

const dbSetup = require("../../DbConnection/setupConnection");

const viewOneSpecifiedOrderDetail = async function(req, res) {
  try {
    let order_id = req.body.order.orderId;

    let space=" ";
    var connection = dbSetup.connect();
    let sql = "CALL `viewOneSpecifiedOrderDetail`(?);"

    connection.query(sql, order_id, function(
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

module.exports = viewOneSpecifiedOrderDetail;

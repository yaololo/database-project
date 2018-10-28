const dbSetup = require("../../DbConnection/setupConnection");

const bookMarkItem = async function(req, res) {
  try {
    let customer_id = req.body.customerId
    let product_id = req.body.productId;
    let token = req.body.token;

    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    var connection = dbSetup.connect();
    let sql = "CALL `bookMarkItem`(@c,?,?);";

    connection.query(
        sql,
        [customer_id,product_id],
        function(error, results, fields) {
          if (error) {
            console.log(error);
            return res.status(500).send(
              JSON.stringify({
                data: "Something went wrong while while bookmark the item."
              })
            );
          } else {
            return res.status(200).send(
              JSON.stringify({
              msg: "successful bookmark the item."
              })
            );
          }
        }
      );
      connection.end();
    } catch (error) {
      console.log(error);
    }
};

module.exports = bookMarkItem;



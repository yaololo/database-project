const dbSetup = require("../../DbConnection/setupConnection");

const addToCart = async function(req, res) {
  try {
    let customer_id = req.body.customerId;
    let product_id = req.body.productId;
    let quantity = req.body.quantity;
    let token = req.body.token;

    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    let connection = dbSetup.connect();

    let sql="CALL `addToCart`(@isAdd,?,?,?);";

    connection.query(
      sql,
      [customer_id,product_id,quantity],
      function(error, results, fields) {
        if (error) {
          console.log(error);
          return res.status(500).send(
            JSON.stringify({
              data: "Something went wrong while while add item into cart."
            })
          );
        } else {
          return res.status(200).send(
              JSON.stringify({
              msg: "successful add item in to cart."
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

module.exports = addToCart;

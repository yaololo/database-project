const dbSetup = require("../../DbConnection/setupConnection");

const deleteItemInCart = async function(req, res) {
  try {
    let customer_id = req.body.user.customerId;
    let product_id = req.body.product.productId;
    let token = req.body.user.token;

    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    let connection = dbSetup.connect();
    let sql = "DELETE FROM cart WHERE customer_id = ? AND product_id = ?;";

    connection.query(
      sql,
      [customer_id,product_id],
      function(error, results, fields) {
        if (error) {
          console.log(error);
          return res.status(500).send(
            JSON.stringify({
              data: "Something went wrong while while deleting item from cart."
            })
          );
        } else {
          return res.status(200).send(
            JSON.stringify({
              msg: "successful deleted item in the cart."
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

module.exports = deleteItemInCart;

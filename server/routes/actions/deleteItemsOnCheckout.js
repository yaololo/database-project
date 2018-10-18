const dbSetup = require("../../DbConnection/setupConnection");

const deleteItemsOnCheckout = async function(req, res) {
  try {
    let customer_id = req.body.user.customerId;
    let token = req.body.user.token;

    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    let connection = dbSetup.connect();
    connection.query(
      "DELETE FROM cart WHERE customer_id=?",
      customer_id,
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
              msg: "successful deleted item."
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

module.exports = deleteItemsOnCheckout;

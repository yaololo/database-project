const dbSetup = require("../../DbConnection/setupConnection");

const deleteBookMarkItem = async function(req, res) {
  try {
    let customer_id = req.body.user.customerId;
    let product_id = req.body.productId;
    let token = req.body.user.token;

    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }
    console.log('triggered')
    console.log(customer_id)
    console.log(product_id)

    let connection = dbSetup.connect();
    let sql = "DELETE FROM bookmark WHERE customer_id = ? AND product_id = ?;";

    connection.query(
      sql,
      [customer_id,product_id],
      function(error, results, fields) {
        if (error) {
          console.log(error.sqlMessage);
          return res.status(500).send(
            JSON.stringify({
              msg: "Something went wrong while while deleting item from bookmark."
            })
          );
        } else {
          return res.status(200).send(
            JSON.stringify({
              msg: "Successful deleted the bookmark."
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

module.exports = deleteBookMarkItem;

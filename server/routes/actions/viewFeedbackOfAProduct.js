const dbSetup = require("../../DbConnection/setupConnection");

const viewFeedbackOfAProduct = async function(req, res) {
  try {
    let product_id = req.body.product.productId;

    var connection = dbSetup.connect();
    let sql =
    "SELECT p.p_name,CONCAT(u.LAST_NAME,' ',u.first_name) AS Name,f.fb_date,f.content,f.rating "+
    "FROM product p "+
        "INNER JOIN feedback f ON p.product_id = f.product_id "+
        "INNER JOIN users u ON f.customer_id = u.user_id "+
    "WHERE p.product_id = ?;";

    connection.query(sql, product_id, function(
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

module.exports = viewFeedbackOfAProduct;

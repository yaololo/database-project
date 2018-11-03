const dbSetup = require("../../DbConnection/setupConnection");

const viewBookmarkItem = async function(req, res) {
  try {
    let customer_id = req.body.customerId;

    var connection = dbSetup.connect();
    let sql =
      "SELECT p.p_name,p.description,p.unit_price,c.category_name,b.brand_name,p.image,p.product_id "+
      "FROM product p "+
          "INNER JOIN category c ON p.category_id =c.category_id "+
          "INNER JOIN brand b ON p.brand_id = b.brand_id "+
          "INNER JOIN bookmark bo ON bo.product_id = p.product_id "+
      "WHERE bo.customer_id = ?;";

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

module.exports = viewBookmarkItem;

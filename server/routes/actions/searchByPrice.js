const dbSetup = require("../../DbConnection/setupConnection");

const selectByPrice = async function(req, res) {
  try {
    let lower_bound = req.body.product.priceLowerBound;
    let upper_bound = req.body.product.priceUpperBound;

    var connection = dbSetup.connect();
    let sql =
      "SELECT p.p_name,p.description,p.unit_price,c.category_name,b.brand_name,p.image "+ 
      "FROM product p "+
          "INNER JOIN category c ON p.category_id =c.category_id "+
          "INNER JOIN brand b ON p.brand_id = b.brand_id "+
      "WHERE unit_price BETWEEN ? and ? ORDER BY unit_price ASC;";

    connection.query(sql, [lower_bound,upper_bound], function(
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

module.exports = selectByPrice;

const dbSetup = require("../../DbConnection/setupConnection");

const selectByCategory = async function(req, res) {
  try {
    let category_id = req.body.category.categoryId;

    var connection = dbSetup.connect();
    let selectQuery =
      "SELECT p.p_name,p.description,p.unit_price,c.category_name,b.brand_name,p.image "+ 
      "FROM product p "+ 
        "INNER JOIN category c ON c.category_id = p.category_id "+
        "INNER JOIN brand b ON p.brand_id = b.brand_id "+ 
      "WHERE c.category_id = ? ORDER BY p.p_name ASC;";

    connection.query(selectQuery, category_id, function(
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

module.exports = selectByCategory;

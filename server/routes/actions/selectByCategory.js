const dbSetup = require("../../DbConnection/setupConnection");

const selectByCategory = async function(req, res) {
  try {
    let category_id = req.body.category.categoryId;

    var connection = dbSetup.connect();
    let selectQuery =
      "SELECT p.p_name,p.description,unit_price,c.category_name FROM product p,category c WHERE p.category_id = c.category_id AND c.category_id = ? ORDER BY p.p_name ASC;";

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

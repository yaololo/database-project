const dbSetup = require('../../DbConnection/setupConnection');

const searchByPriceHandler = async function(req, res) {
  try {
    var connection = dbSetup.connect();

    let categories = []
    for (let index = 0; index < req.body.categories.length; index++) {
      categories.push(req.body.categories[index].value);
    }
    console.log(categories)
    let orderBy = req.body.orderBy
    let query= `SELECT * FROM product p WHERE p.category_id IN (?) ORDER BY p.unit_price ${orderBy}`;

    connection.query(query, [categories], function(error, results, fields) {
      if (error) {
        console.log(error.sqlMessage);
        return res.status(500).send(
          JSON.stringify({
            data: 'Something went wrong while retrieving data.'
          })
        );
      } else {
        console.log(results)
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

module.exports = searchByPriceHandler;

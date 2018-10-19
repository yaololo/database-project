const dbSetup = require("../../DbConnection/setupConnection");

const viewFeedbackByAUser = async function(req, res) {
  try {
    let customer_id = req.body.user.customerId;

    var connection = dbSetup.connect();
    let sql =
      "SELECT p.p_name,f.fb_date,f.content,f.rating "+
      "FROM product p,feedback f,users u "+
      "WHERE p.product_id=f.product_id AND f.customer_id = u.user_id AND u.user_id = ?;";

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

module.exports = viewFeedbackByAUser;

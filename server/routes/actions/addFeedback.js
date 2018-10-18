const dbSetup = require("../../DbConnection/setupConnection");

const addFeedback = async function(req, res) {
  try {
    let customer_id = req.body.user.customerId;
    let product_id = req.body.product.productId;
    let content = req.body.input.content;
    let rating = req.body.input.rating;
    
    let token = req.body.user.token;

    let d = new Date();
    let date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    

    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    var connection = dbSetup.connect();
    let sql = "CALL `addFeedback`(?,?,?,?,?);";

    connection.query(
        sql,
        [customer_id,product_id,date,content,rating],
        function(error, results, fields) {
          if (error) {
            console.log(error);
            return res.status(500).send(
              JSON.stringify({
                data: "Something went wrong while while add feedback to the item."
              })
            );
          } else {
              return res.status(200).send(
                  JSON.stringify({
                  msg: "successful add feedback to the item."
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

module.exports = addFeedback;

const dbSetup = require("../../DbConnection/setupConnection");

const cancelOrder = async function(req, res) {
  try {
    let order_id = req.body.order.orderId;
    
    let token = req.body.user.token;

    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    var connection = dbSetup.connect();
    let sql = "CALL `cancelOrder`(?);";

    connection.query(sql,order_id,function(error, results, fields) {
          if (error) {
            console.log(error);
            return res.status(500).send(
              JSON.stringify({
                data: "Something went wrong while while cancel the order."
              })
            );
          } else {
              return res.status(200).send(
                  JSON.stringify({
                  msg: "successful cancel the order."
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

module.exports = cancelOrder;

const dbSetup = require("../../DbConnection/setupConnection");

const createOrder = async function(req, res) {
  try {
    let customer_id = req.body.user.customerId;
    let address_id = req.body.customerAddress.addressId;
    let status = 1;
    let d = new Date();
    let date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    let product_id_string = req.body.product.productIdString;
    let quantity_string = req.body.order.quantityString;

    let token = req.body.user.token;

    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    let connection = dbSetup.connect();

    let sql="call `createOrder`(?,?,?,?,?,?);";

    connection.query(
      sql,
      [customer_id,address_id,status,date,product_id_string,quantity_string],
      function(error, results, fields) {
        if (error) {
          console.log(error);
          return res.status(500).send(
            JSON.stringify({
              data: "Something went wrong while create order."
            })
          );
        } else {
            return res.status(200).send(
                JSON.stringify({
                msg: "successful create order."
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

module.exports = createOrder;

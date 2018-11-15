const dbSetup = require("../../DbConnection/setupConnection");

const custOrderHist = async function(req, res) {
  try {
    let customer_id = req.body.customerId;


    var connection = dbSetup.connect();
    let sql =
      "call `custOrderHist`(?);";
    connection.query(sql, customer_id, function(
      error,
      results,
      fields
    ) {
      if (error) {
        console.log(error);
        return res.status(500).send(
          JSON.stringify({
            msg: "Something went wrong while retrieving data."
          })
        );
      } else {
        let map = {};
        let orders = [];

        results[0].forEach(element => {
          if (map[element.order_id] === undefined) {
            map[element.order_id] = [];
            let product = {};
            product.name = element.p_name;
            product.Price = element.unit_price;
            product.image = element.image;
            product.quantity = element.quantity;
            product.orderDate = element.order_date;
            map[element.order_id].push(product);
          } else {
            let product = {};
            product.name = element.p_name;
            product.Price = element.unit_price;
            product.image = element.image;
            product.quantity = element.quantity;
            product.orderDate = element.order_date;
            map[element.order_id].push(product);
          }
        });

        for (let key in map) {
          let order = {};
          order.id = key
          order.details = map[key]
          orders.push(order);
        }

        orders.sort(function(a, b) {
          return Number(b.id) - Number(a.id);
        });


        return res.status(200).send(
          JSON.stringify({
            data: orders
          })
        );
      }
    });
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = custOrderHist;

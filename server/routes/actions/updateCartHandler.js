const dbSetup = require('../../DbConnection/setupConnection');

const updateCartHandler = async function(req, res) {
  try {
    let cartItem = {
      customer_id : req.body.customerId,
      product_id : req.body.itemId,
      quantity : 1
    }
    let connection = dbSetup.connect();
    connection.query('INSERT INTO cart SET ?', cartItem, function(error, results, fields) {
      if (error) {
        console.log(error);
        return res.status(500).send(
          JSON.stringify({
            data: 'Something went wrong while while updating cart table.'
          })
        );
      } else {
        return res.status(200).send(
          JSON.stringify({
            msg: 'update successful'
          })
        );
      }
    });
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateCartHandler;

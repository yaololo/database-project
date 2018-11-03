const dbSetup = require("../../DbConnection/setupConnection");

const placeOrderHandler = async function(req, res) {
  try {
    let token = req.body.token;
    if (token !== "true") {
      console.log('invalid token')
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    let addressInfo= {
        customer_id: req.body.customerId,
        city: req.body.addressInfo.city,
        address: req.body.addressInfo.street,
        postcode: req.body.addressInfo.postcode,
        recipents: req.body.addressInfo.receiver,
        country: req.body.addressInfo.country,
        contactnumber: req.body.addressInfo.contact
      }

    let productInfoList = req.body.productInfoList;
    let stringProductInfoListIds ='';
    let stringProductQuantity = '';

    for(let i=0; i< productInfoList.length; i++){
      stringProductInfoListIds= stringProductInfoListIds + productInfoList[i].productDetails[0].product_id + ',';
      stringProductQuantity= stringProductQuantity + productInfoList[i].quantity.toString() + ',';
    }
    stringProductInfoListIds = stringProductInfoListIds.substring(0, stringProductInfoListIds.length-1)
    stringProductQuantity = stringProductQuantity.substring(0, stringProductQuantity.length-1)
    console.log(stringProductInfoListIds);
    console.log(stringProductQuantity);

    let connection = dbSetup.connect();

    let insertShippingAddress = 'INSERT INTO customeraddress SET ?'

    connection.query(
      insertShippingAddress,
      addressInfo,
      function(error, results, fields) {
        if (error) {
          console.log(error.sqlMessage);
          return res.status(500).send(
            JSON.stringify({
              msg: "Something went wrong while adding customer address."
            })
          );
        } else {
          let address_id = results.insertId
          let sql = "call `createOrder`(?,?,?,?,?,?)";
          let date = new Date();
          let currentDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
          console.log(typeof parseInt(addressInfo.customer_id))
          let connection = dbSetup.connect();
          connection.query(
            sql,
            [parseInt(addressInfo.customer_id), parseInt(address_id), 1, currentDate, stringProductInfoListIds, stringProductQuantity],
            function(error, results, fields){
              if(error){
                console.log(error.sqlMessage);
                return res.status(500).send(
                  JSON.stringify({
                    msg: "Something went wrong while while generating order."
                  })
                );
              }else{
                let connection = dbSetup.connect();
                connection.query(
                  "DELETE FROM cart WHERE customer_id=?",
                  addressInfo.customer_id,
                  function(error, results, fields) {
                    if (error) {
                      console.log(error.sqlMessage);
                      return res.status(500).send(
                        JSON.stringify({
                          data: "Something went wrong while while deleting item from cart."
                        })
                      );
                    } else {
                      return res.status(200).send(
                        JSON.stringify({
                          msg: " Order is placed and cart is successful cleared."
                        })
                      );
                    }
                  }
                );
                connection.end();
              }
            })
            connection.end()
        }
      }
    );
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = placeOrderHandler;

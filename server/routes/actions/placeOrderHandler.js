const dbSetup = require("../../DbConnection/setupConnection");
const createOrder = require('./createOrder')

const placeOrderHandler = async function(req, res) {
  try {


    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    let customer_id = req.body.customerId;
    let addressInfo = req.body.addressInfo;
    let token = req.body.token;
    let productInfoList = req.body.productInfoList;
    let stringProductInfoList ='';
    let stringProductQuantity = '';

    for(let i=0; i< productInfoList.length; i++){
      stringProductInfoList= stringProductInfoList + productInfoList[i].productDetials[0].product_id + ',';
      stringProductQuantity= stringProductQuantity + productInfoList[i].quantity.toString() + ',';
    }

    console.log(stringProductInfoList);
    console.log(stringProductQuantity);

    let connection = dbSetup.connect();

    // let sql="CALL `addToCart`(@isAdd,?,?,?);";
    let insertShippingAddress = 'INSERT INTO customeraddress SET ?' 

    connection.query(
      insertShippingAddress,
      addressInfo,
      function(error, results, fields) {
        if (error) {
          console.log(error.sqlMessage);
          return res.status(500).send(
            JSON.stringify({
              data: "Something went wrong while while add item into cart."
            })
          );
        } else {
          connection.query('SELECT address_id FROM customeraddress WHERE customer_id=?, address=?, country=?, postcode=?, recipents=?, contactnumber=? ')

        }
      }
    );
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = placeOrderHandler;


fetch('/api/create_order', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerId: customer_id,
    token: sessionContext.token,
    productInfoList: productInfoList
  })
}).then(response => {
  if (response.ok) {
    response.json().then(json => {
      messageContext.setSuccessMessages(json.msg)
    })
  } else {
    console.log('something wrong during getting product details');
  }
});
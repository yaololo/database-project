const dbSetup = require('../../DbConnection/setupConnection');

const cartDetailsHandler = async function(req, res){

  if( req.body.token !== 'true' || req.body.productList.length === 0){
    return;
  }
  let productList = req.body.productList;
  let productInfoList = [];
  let count = 0;
  try {
    for(i=0 ; i< productList.length; i++){
      let connection = dbSetup.connect();
      connection.query('SELECT * FROM product WHERE product_id = ?', productList[i].product_id,
      function(error, results, fields) {
        if(error){
          console.log(error.sqlMessage)
          // connection.on('error', function() {} );
          connection.end();
          return res.status(500).send(
            JSON.stringify({
              msg: "Get shopping cart item fail"
            })
          );
        } else{

          let productInfo = {
            quantity: productList[count].quantity,
            productDetails: results
          }
          
          productInfoList.push(productInfo);
          count ++;
          if(count === productList.length){
            return res.status(200).send(
              JSON.stringify({
                productInfoList: productInfoList
              })
            );
          }
        }
      })
      connection.end()
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports= cartDetailsHandler;
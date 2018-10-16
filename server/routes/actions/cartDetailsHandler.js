
const carDetailsHandler = async function(req, res){
  let productList = req.body.productList;
  let productInfoList = [];
  // let count = 0;
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
          // results[0].quantity = productList[i]['SUM(quantity)']
          let productInfo = {
            quantity: productList[i].quantity,
            productDetails: results
          }
          
          productInfoList.push(productInfo);
          // count ++;
          if(productList.length === productList.length){
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
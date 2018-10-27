const dbSetup = require('../../DbConnection/setupConnection');

const cartDetailsHandler = async function(req, res){

  if( req.body.token !== 'true'){
    return;
  }
  let userId = req.body.userId
  let productInfoList = [];
  let count = 0;
  try {
    let connection = dbSetup.connect();
    connection.query('SELECT product_id, quantity FROM cart WHERE customer_id = ? GROUP BY product_id', userId,
      function(error, results, fields) {
        if(error){
          console.log('getting productList error: '+ error.sqlMessage)
          // connection.on('error', function() {} );
          connection.end()
          return res.status(500).send(
            JSON.stringify({
              msg: "Get shopping cart item fail"
            })
          );
        } else{
          if(results.length === 0){
            return res.status(200).send(
              JSON.stringify({
                msg: "login successful",
                productInfoList: []
              })
            )
          }

          console.log(results)
          let productList = results;

          for(i=0 ; i< productList.length; i++){
            console.log("logging product_id : " + productList[i].product_id)
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
                // console.log(productList[i].product_id)
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
        }
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports= cartDetailsHandler;

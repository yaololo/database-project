const dbSetup = require('../../DbConnection/setupConnection');

const loginHandler = async function(req, res) {
  try {
    
    let user ={
      email: req.body.user.email,
      password: req.body.user.password.toString(),
    }
    let cartItemInfo = [];
    let productList = [];
  
    var connection = dbSetup.connect();
    connection.query('SELECT user_id, first_name, last_name, email, user_type FROM `users` WHERE `email`= ? AND `auth` = ?;', [user.email, user.password], function(error, results, fields) {
      if (error) {
        console.log('first query something wrong')
        connection.on('error', function() {} );
        connection.end();
        return res.status(500).send(
          JSON.stringify({
            msg: 'Invalid email or password.'
          })
        );
      }else{

        user.email = results[0].email;
        user.firstName = results[0].first_name;
        user.lastName = results[0].last_name;
        user.userType =  results[0].user_type;
        user.id = results[0].user_id;

        let connection = dbSetup.connect();
        
        connection.query('SELECT product_id, SUM(quantity) FROM cart WHERE customer_id = ? GROUP BY product_id', user.id,
        function(error, results, fields) {
          if(error){
            // console.log(error)
            connection.on('error', function() {} );
            connection.end()
            return res.status(500).send(
              JSON.stringify({
                msg: "Get shopping cart item fail"
              })
            );
          }else{
            cartItemInfo = results;
            // console.log(cartItemInfo)
            let count = 0;
            for(i=0 ; i< cartItemInfo.length; i++){
              let connection = dbSetup.connect();
              connection.query('SELECT * FROM product WHERE product_id = ?', cartItemInfo[i].product_id,
              function(error, results, fields) {
                if(error){
                  console.log(error.sqlMessage)
                  connection.on('error', function() {} );
                  connection.end();
                  return res.status(500).send(
                    JSON.stringify({
                      msg: "Get shopping cart item fail"
                    })
                  );
                } else{
                  results[0].quantity = cartItemInfo[count]['SUM(quantity)']
                  productList.push(results);
                  count ++;
                  if(productList.length === cartItemInfo.length){
                    return res.status(200).send(
                      JSON.stringify({
                        token: "true",
                        user: user,
                        productList: productList
                      })
                    );
                  }
                }
              })
            }
          }
        })
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = loginHandler;

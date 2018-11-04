const dbSetup = require('../../DbConnection/setupConnection');

const loginHandler = async function(req, res) {
  try {

    let user ={
      email: req.body.user.email,
      password: req.body.user.password.toString(),
    }

    var connection = dbSetup.connect();
    connection.query('SELECT user_id, first_name, last_name, email, user_type FROM `users` WHERE `email`= ? AND `auth` = ?;', [user.email, user.password], function(error, results, fields) {
      if (error) {
        console.log(error,sqlMessage)
        connection.on('error', function() {} );
        connection.end();
        return res.status(500).send(
          JSON.stringify({
            msg: 'Something wrong during login.'
          })
        );
      }else{

        if(results.length === 0){
          connection.end();
          return res.status(500).send(
            JSON.stringify({
              msg: "Invalid email or password"
            })
          )
        }

        user.email = results[0].email;
        user.firstName = results[0].first_name;
        user.lastName = results[0].last_name;
        user.userType =  results[0].user_type;
        user.id = results[0].user_id;

        // let connection = dbSetup.connect();

        connection.query('SELECT product_id, quantity FROM cart WHERE customer_id = ? GROUP BY product_id', user.id,
        function(error, results, fields) {
          if(error){
            console.log(error.sqlMessage)
            // connection.on('error', function() {} );
            connection.end()
            return res.status(500).send(
              JSON.stringify({
                msg: "Get shopping cart item fail"
              })
            );
          }else{
            if(results.length === 0){
              return res.status(200).send(
                JSON.stringify({
                  msg: "login successful",
                  token: "true",
                  user: user,
                  productList: []
                })
              )
            }

            let productList = results;

            return res.status(200).send(
              JSON.stringify({
                msg: "login successful",
                token: "true",
                user: user,
                productList: productList,
              })
            )
          }
        })
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = loginHandler;

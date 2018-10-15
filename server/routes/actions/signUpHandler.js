const dbSetup = require('../../DbConnection/setupConnection');

const signUpHandler = async function(req, res) {
  try {
    let postValue ={
      first_name: req.body.user.firstName,
      last_name: req.body.user.lastName,
      email: req.body.user.email,
      auth: req.body.user.password,
      user_type: 'customer',
      gender: req.body.user.gender
    }
    let user ={
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
      userType: "customer"
    }
    var connection = dbSetup.connect();
    connection.query(`INSERT INTO users SET ?`, postValue, function(error, results, fields) {
      // console.log(connection);

      if (error) {
        console.log(error.sqlMessage)
        connection.on('error', function() {});
        // throw new Error(error)

        // console.log(error.fatal);
        // console.log(error.code);
        // console.log(error.sqlMessage);
 
        connection.end()
        return res.status(500).send(
          JSON.stringify({
            msg: 'Something went wrong during sign up.'
          })
        );
      } else {
        console.log('successful');
      }
    });

    connection.destroy()
    connection.query(`SELECT user_id FROM users WHERE email = ? AND password =? `, [user.email, postValue.auth], function(error, results, fields) {
      if (error) {
        console.log("normal" + error)
        connection.on('error', function() {});
        // console.log(error.fatal);
        // console.log(error.code);
        // console.log(error.sqlMessage);
        connection.destroy();
        return res.status(500).send(
          JSON.stringify({
            msg: 'Something went wrong during sign up.'
          })
        );
      } else {
        user.id = results[0].user_id;
        return res.status(200).send(
          JSON.stringify({
            token: 'true',
            user: user,
            msg: 'Sign Up successful'
          })
        );
      }
    });

    connection.end();
  } catch (error) {
    console.log("sign up catch error" + error);
  }
};

module.exports = signUpHandler;

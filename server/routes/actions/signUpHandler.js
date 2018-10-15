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
      if (error) {
        connection.on('error', function() {} );
        connection.end();
        return res.status(500).send(
          JSON.stringify({
            msg: 'email already exists'
          })
        );
      }
    });


    if(connection.state === 'authenticated'){
      console.log(" i am ")
      connection.query(
        `SELECT user_id FROM users WHERE email = ? AND password =? `,
        [user.email, postValue.auth],
        function(error, results, fields) {
          if (error) {
            connection.on('error', function() {});
            connection.end();
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
      }
  } catch (error) {
    console.log("sign up catch error" + error);
  }
};

module.exports = signUpHandler;

const dbSetup = require('../../DbConnection/setupConnection');

const signUpHandler = async function(req, res) {
  try {
    let postValue ={
      user_id: '0000012349',
      frist_name: req.body.user.firstName,
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
        console.log(error);
        return res.status(500).send(
          JSON.stringify({
            data: 'Something went wrong while retrieving data.'
          })
        );
      } else {
        console.log('successful');
        return res.status(200).send(
          JSON.stringify({
            token: 'true',
            user: user.toJSON()
          })
        );
      }
    });
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = signUpHandler;

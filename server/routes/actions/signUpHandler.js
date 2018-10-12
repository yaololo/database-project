const dbSetup = require('../../DbConnection/setupConnection');

const signUpHandler = async function(req, res) {
  try {
    postValue ={
      user_id: '0000012349',
      frist_name: req.body.user.firstName,
      last_name: req.body.user.lastName,
      email: req.body.user.email,
      auth: req.body.user.password,
      user_type: 'customer',
      gender: req.body.user.gender
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
            token: 'true'
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

const dbSetup = require('../../DbConnection/setupConnection');

const loginHandler = async function(req, res) {
  try {
    let user ={
      email: req.body.user.email,
      password: req.body.user.password.toString(),
    }

    var connection = dbSetup.connect();
    connection.query('SELECT frist_name, last_name, email, user_type FROM `users` WHERE `email`= ? AND `auth` = ?;', [user.email, user.password], function(error, results, fields) {
      if (error) {
        console.log(error);
        return res.status(500).send(
          JSON.stringify({
            data: 'Something went wrong while retrieving data.'
          })
        );
      } else {
        user.email = results[0].email;
        user.firstName = results[0].frist_name;
        user.lastName = results[0].last_name;
        user.userType =  results[0].last_name,
        console.log(user);
        return res.status(200).send(
          JSON.stringify({
            token: 'true',
            user: user
          })
        );
      }
    });
    connection.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = loginHandler;

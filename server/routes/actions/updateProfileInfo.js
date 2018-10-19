const dbSetup = require("../../DbConnection/setupConnection");

const updateProfileInfo = async function(req, res) {
  try {
    let customer_id = req.body.user.customerId;
    let first_name = req.body.user.firstName;
    let last_name = req.body.user.lastName;
    let gender = req.body.user.gender;
    
    let token = req.body.user.token;

    if (token !== "true") {
      return res.status(500).send(
        JSON.stringify({
          data: "Invalid token"
        })
      );
    }

    var connection = dbSetup.connect();
    let sql = "UPDATE users SET first_name=? ,last_name=?,gender=? WHERE user_id = ?;";

    connection.query(sql,[first_name,last_name,gender,customer_id],function(error, results, fields) {
          if (error) {
            console.log(error);
            return res.status(500).send(
              JSON.stringify({
                data: "Something went wrong while updating user profile."
              })
            );
          } else {
              return res.status(200).send(
                  JSON.stringify({
                  msg: "successful update user profile."
                  })
              );
          }
        }
      );
      connection.end();
    } catch (error) {
      console.log(error);
    }
};

module.exports = updateProfileInfo;

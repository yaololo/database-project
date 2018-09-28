const router = require('express').Router();
const dbSetup = require('../DbConnection/setupConnection');

router.get('/get', async function(req, res) {
  try {
    var connection = dbSetup.connect();
    connection.query('SELECT * FROM testing', function(error, results, fields) {
      if (error) throw error;
      else {
        console.log(results);
        return res.status(200).send(
          JSON.stringify({
            msg: results
          })
        );
      }
    });
    connection.end();
  } catch (error) {
    console.log(error);
  }
});
router.get('/populate', async function(req, res) {
  try {
    console.log('hello');
    let connection = dbSetup.connect();

    let result;
    let columns = [
      'id',
      'name',
      'shortDescription',
      'description',
      'image',
      'stock',
      'price',
      'category',
      'expiredDate'
    ];
    require('csv-to-array')(
      {
        file: '../',
        columns: columns
      },
      function(err, array) {
        if (err) {
          console.log(err);
        }
        console.log(array);
        // var array = array;
        // for (let i = 0; i < array.length; i++) {
        //   console.log(`number ${i} ${array[i]}`);
        // }
        // console.log(array);
      }
    );
    res.status(200).send({ msg: 'no error' });
    // for (let i = 1; i < result.length; i++) {
    //   connection.query(
    //     `INSERT INTO Products values(
    //     ${result[i]['id']}
    //     ${result[i]['name']}
    //     ${result[i]['shortDescription']}
    //     ${result[i]['description']}
    //     ${result[i]['image']}
    //     ${parseInt(result[i]['stock'])}
    //     ${parseFloat(result[i]['price'])}
    //     ${result[i]['category']}
    //     ${result[i]['expiredDate']}
    //   )`,
    //     function(error, results, fields) {
    //       if (error) throw error;
    //       else {
    //         console.log('done');
    //         return res.status(200).send(
    //           JSON.stringify({
    //             msg: 'done'
    //           })
    //         );
    //       }
    //     }
    //   );
    // }

    connection.end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

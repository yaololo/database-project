// const dbSetup = require('../../DbConnection/setupConnection');

// const addToCartHandler = async function(req, res) {
//   try {
//     let cartItem = {
//       customer_id : req.body.customerId,
//       product_id : req.body.itemId,
//       quantity : req.body.quantity
//     }
//     let connection = dbSetup.connect();

//     let getProductId = `SELECT product_id, customer_id FROM cart WHERE product_id = ? AND customer_id = ?`;
    
//     connection.query(getProductId, [cartItem.product_id, cartItem.customer_id], function(error, results, fields) {
//       if (error) {
//         connection.on('error', function() {} );
//         return res.status(500).send(
//           JSON.stringify({
//             data: 'Something went wrong while while updating cart table.'
//           })
//         );
//       } else {
//         if(results[0].length === 0){
//           let insertNewProduct = `INSERT INTO cart (product_id, customer_id, quantity) SET ?`;
//           connection.query(insertNewProduct, cartItem, function(error, results, fields){
//             if(error){
//               connection.on('error', function() {} );
//               return res.status(500).send(
//                 JSON.stringify({
//                   data: 'Something went wrong while while updating cart table.'
//                 })
//               );
//             } else{
//               return res.status(200).send(
//                 JSON.stringify({
//                   msg: 'update successful'
//                 })
//               );
//             }
//           })
//         } else {
//           let updateCart = ""
//           connection.query(insertNewProduct, cartItem, function(error, results, fields){


//           }
//         }

//         return res.status(200).send(
//           JSON.stringify({
//             msg: 'update successful'
//           })
//         );
//       }
//     });
//     connection.end();
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = addToCartHandler;

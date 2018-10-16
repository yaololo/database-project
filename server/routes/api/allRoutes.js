const loginHandler = require("../actions/loginHandler");
const signUpHandler = require("../actions/signUpHandler");
const onLandingAction = require("../actions/onLanding");
const updateCartHandler = require("../actions/updateCartHandler");
//****************************************added by Shijie
const deleteItemsOnCheckout = require("../actions/deleteItemsOnCheckout");
const selectByCategory = require("../actions/selectByCategory");

//*************************************************** */
const router = require("express").Router();

router.get("/hot_items", onLandingAction);

router.post("/user/signup", signUpHandler);

router.post("/user/login", loginHandler);

router.post("/update_cart", updateCartHandler);

// router.get('/my_cart_details', cartDetailsHandler);

//**************************************added by Shijie
router.delete("/delete_cart_on_checkout", deleteItemsOnCheckout);

router.get("/select_By_Category", selectByCategory);

//*********************************************** */

// router.post('/getItemDetails', itemDetailsHandler);

module.exports = router;

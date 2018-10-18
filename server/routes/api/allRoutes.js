const loginHandler = require('../actions/loginHandler');
const signUpHandler = require('../actions/signUpHandler');
const onLandingAction = require('../actions/onLanding');
const addToCartHandler = require ('../actions/addToCartHandler')
const handleAsyncError = require("express-async-wrap");
const deleteItemsOnCheckout = require("../actions/deleteItemsOnCheckout");
const selectByCategory = require("../actions/selectByCategory");
const cartDetailsHandler = require('../actions/cartDetailsHandler')
const router = require('express').Router();

router.get('/hot_items', handleAsyncError(onLandingAction));

router.get('/user/signup', handleAsyncError(signUpHandler));

router.post('/user/login', handleAsyncError(loginHandler));

router.post('/update_cart', handleAsyncError(addToCartHandler));

router.post('/my_cart_details', cartDetailsHandler);

// router.post('/getItemDetails', itemDetailsHandler);

module.exports = router;







































































const addToCart = require("../actions/addToCart");
const bookMarkItem = require("../actions/bookMarkItem");
const deleteBookMarkItem = require("../actions/deleteBookMarkItem");
const addFeedback = require("../actions/addFeedback");
const selectByBrand = require("../actions/selectByBrand");


router.delete('/delete_cart_on_checkout', deleteItemsOnCheckout);

router.get("/select_By_Category", selectByCategory);

router.post("/add_to_cart",addToCart);

router.post("/book_mark_item",bookMarkItem);

router.delete("/delete_bookmark_item",deleteBookMarkItem);

router.post("/add_feedback",addFeedback);

router.get("/select_by_brand",selectByBrand);
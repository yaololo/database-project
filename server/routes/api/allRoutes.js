const loginHandler = require('../actions/loginHandler');
const signUpHandler = require('../actions/signUpHandler');
const onLandingAction = require('../actions/onLanding');
const addToCartHandler = require ('../actions/addToCartHandler')
const handleAsyncError = require("express-async-wrap");
const updateCartHandler = require("../actions/updateCartHandler");
const deleteItemsOnCheckout = require("../actions/deleteItemsOnCheckout");
const selectByCategory = require("../actions/selectByCategory");
const router = require('express').Router();

router.get('/hot_items', handleAsyncError(onLandingAction));

router.post('/user/signup', handleAsyncError(signUpHandler));

router.post('/user/login', handleAsyncError(loginHandler));

router.post('/update_cart', handleAsyncError(addToCartHandler));

router.get('/my_cart_details', cartDetailsHandler);

router.delete('/delete_cart_on_checkout', deleteItemsOnCheckout);

router.get('/select_By_Category', selectByCategory);


// router.post('/getItemDetails', itemDetailsHandler);

module.exports = router;

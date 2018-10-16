const loginHandler = require('../actions/loginHandler');
const signUpHandler = require('../actions/signUpHandler');
const onLandingAction = require('../actions/onLanding');
const addToCartHandler = require ('../actions/addToCartHandler')
const handleAsyncError = require("express-async-wrap");
const router = require('express').Router();

router.get('/hot_items', handleAsyncError(onLandingAction));

router.post('/user/signup', handleAsyncError(signUpHandler));

router.post('/user/login', handleAsyncError(loginHandler));

router.post('/update_cart', handleAsyncError(addToCartHandler));

router.get('/my_cart_details', cartDetailsHandler);

// router.post('/getItemDetails', itemDetailsHandler);


module.exports = router;

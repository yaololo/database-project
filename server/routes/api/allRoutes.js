const loginHandler = require('../actions/loginHandler');
const signUpHandler = require('../actions/signUpHandler');
const onLandingAction = require('../actions/onLanding');
const updateCartHandler = require ('../actions/updateCartHandler')
const router = require('express').Router();

router.get('/hot_items', onLandingAction);

router.post('/user/signup', signUpHandler);

router.post('/user/login', loginHandler);

router.post('/update_cart', updateCartHandler);

// router.get('/my_cart_details', cartDetailsHandler);

// router.post('/getItemDetails', itemDetailsHandler);


module.exports = router;

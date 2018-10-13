const loginHandler = require('../actions/loginHandler');
const signUpHandler = require('../actions/signUpHandler');
const onLandingAction = require('../actions/onLanding');
// const updateCartHandler = require ('../actions/updateCartHandler')
const router = require('express').Router();

router.get('/hotItems', onLandingAction);

router.post('/user/signup', signUpHandler);

router.post('/user/login', loginHandler);

// router.post('/updateCart', updateCartHandler);

// router.post('/getItemDetails', itemDetailsHandler);


module.exports = router;

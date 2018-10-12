const loginHandler = require('../actions/loginHandler');
const signUpHandler = require('../actions/signUpHandler');
const onLandingAction = require('../actions/onLanding');
const router = require('express').Router();

router.get('/hotItems', onLandingAction);
router.post('/user/signup', signUpHandler);
router.post('/user/login', loginHandler);

module.exports = router;

const signUpHandler = require('../actions/signUpHandler');
const onLandingAction = require('../actions/onLanding');
const router = require('express').Router();

router.get('/hotItems', onLandingAction);
router.post('/user/signup', signUpHandler);

module.exports = router;

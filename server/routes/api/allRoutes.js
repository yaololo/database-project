const onLandingAction = require('../actions/onLanding');
const router = require('express').Router();

router.get('/hotItems', onLandingAction);

module.exports = router;

const express = require('express');
const auth = require('./../middlewares/authentication.middleware');
const { getUser, pickExpert } = require('./../controllers/user.controller');

const router = new express.Router();

router.get('/', [auth.verifyJwt, auth.accountActivatedTrue], getUser);

router.post('/expert', pickExpert)

module.exports = router;
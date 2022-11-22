const express = require('express');
const auth = require('./../middlewares/authentication.middleware');
const { getUser } = require('./../controllers/user.controller');

const router = new express.Router();

router.get('/', [auth.verifyJwt, auth.accountActivatedTrue], getUser);

module.exports = router;
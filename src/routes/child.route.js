const express = require('express');
const auth = require('./../middlewares/authentication.middleware');
const { createChild, getChild } = require('./../controllers/child.controller');

const router = new express.Router();

router.post('/', [auth.verifyJwt, auth.accountActivatedTrue], createChild);

router.get('/', [auth.verifyJwt, auth.accountActivatedTrue], getChild);

module.exports = router;
const express = require('express');
const auth = require('./../middlewares/authentication.middleware');
const { diagnosticTest, diagnosticReports } = require('./../controllers/diagnostic.controller');
const upload = require('./../configs/multer.config');

const router = new express.Router();

router.get('/test', [auth.verifyJwt, auth.accountActivatedTrue], diagnosticReports);

router.post('/test', [auth.verifyJwt, auth.accountActivatedTrue], diagnosticTest);

module.exports = router;
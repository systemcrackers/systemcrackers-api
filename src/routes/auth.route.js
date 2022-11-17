const express = require('express');
const auth = require('./../middlewares/authentication.middleware'); 
const {
    googleSignIn,
    signUp,
    login,
    verifyOtp,
    setDob,
    sendOtpEmail
} = require('./../controllers/auth.controller');

// Initializing router
const router = express.Router();

router.post('/google/signin', googleSignIn);

router.post('/systemcrackers/signup', signUp);

router.post('/systemcrackers/login', login);

router.post('/systemcrackers/verify-otp', [auth.verifyJwt, auth.accountActivatedFalse, auth.loginProviderSystemCrackers], verifyOtp);

router.post('/google/set-dob', [auth.verifyJwt, auth.accountActivatedFalse, auth.loginProviderGoogle], setDob);

router.post('/systemcrackers/send-otp-email', [auth.verifyJwt, auth.accountActivatedFalse, auth.loginProviderSystemCrackers], sendOtpEmail);

module.exports = router;
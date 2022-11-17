const Auth = require('./../models/auth.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateOtp = (otpLength) => {
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < otpLength; i++) {
        otp += digits[Math.floor(Math.random()*10)];
    }
    return otp;
};

const sendEmail = async (toEmail, subject, body) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD
        },
        tls: {
            ciphers: "SSLv3",
        },
    });

    let mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to:toEmail,
        subject: subject,
        text: body
    };

    await transporter.sendMail(mailOptions);
};

const sendEmailOtp = async (req, user) => {
    const otp = generateOtp(6);
    const emailSubject = 'Verification Code';
    const emailBody = `Your verification code is ${otp}`;
    await sendEmail(user.email, emailSubject, emailBody);

    const auth = await new Auth({
        user: {
            id: user._id,
            email: user.email
        },
        token: otp,
        tokenType: 'EMAIL VERIFICATION CODE',
        lastAccess: new Date(),               
        clientIPAddress: req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
    }).save();

    return auth;
};

const validatePassword = (password, hashPassword) => {
    const verify = bcrypt.compareSync(password, hashPassword);
    return verify;
};

const generateBearerToken = async (user) => {
    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        loginProvider: user.loginProvider,
        isActivated: user.isActivated
    }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });

    await new Auth({
        token:token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            loginProvider: user.loginProvider
        },
        tokenType: 'BEARER',
        lastAccess: new Date(),
        clientIPAddress: req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
    }).save();

    return {
        token
    };
};

module.exports = { 
    generateOtp,
    sendEmail,
    sendEmailOtp,
    hashPassword,
    validatePassword,
    generateBearerToken
};
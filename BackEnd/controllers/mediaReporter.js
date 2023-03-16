const jwt = require('jsonwebtoken')
const MediaReporter = require('../models/mediaReporter')
const ResetToken = require("../models/resetToken");
const crypto = require("crypto");
const { createRandomBytes } = require("../utils/helper");
const {
    generatePasswordResetTemplate,
    mailTransport,
    successTemplate,
} = require("../utils/mail");
const nodemailer = require("nodemailer");

//sendgrid configuration
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.createMediaReporter = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const isNewMediaReporter = await MediaReporter.isThisEmailInUse(email)
    if (!isNewMediaReporter)
        return res.json({
            success: false,
            message: 'This email is already in use'
        })
    const reporter = await MediaReporter({
        username,
        email,
        password,
        confirmPassword,
    })
    await reporter.save();
    res.json(reporter)
}

exports.mediaReporterSignIn = async (req, res) => {
    console.log("inside login");
    const { username, password } = req.body;
    const reporter = await MediaReporter.findOne({ username });
    if (!reporter) return res.json({ success: false, message: 'username / password does not match' });

    const isMatch = await reporter.comparePassword(password);
    if (!isMatch) return res.json({ success: false, message: 'username / password does not match' });

    const token = await reporter.generateAuthToken();
    if (token) {
        res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 2589200000),
            httpOnly: true
        })
        return res.status(200).json({ success: true, reporter, token, type: "MediaReporter" });
    } else {
        return res.status(422).json({ success: false, message: 'somthing went wrong' });
    }

}

exports.mediaGetProfile = async (req, res) => {
    console.log(req.rootMediaReporte);
    res.json({ data: req.rootMediaReporte, success: true, message: 'User find' })
}

exports.mediaEditProfile = async (req, res) => {
    console.log(req.body);
    const id = req.mediaReporterId;
    const data = await MediaReporter.findByIdAndUpdate(id, { $set: req.body })
    // console.log(data);
    res.status(200).json({ data: data, success: true, message: 'Profile details updated' })
}

exports.forgotPasswordMedia = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    if (!email)
        return res.send({ success: "false", message: "please provide email" });

    const user = await MediaReporter.findOne({ email });
    console.log(user);
    if (!user)
        return res.send({
            success: "false",
            message: "User not found with this email",
        });

    const token = await ResetToken.findOne({ owner: user._id });
    if (token)
        return res.send({
            success: "false",
            message: "Only After one hour you can request for another token",
        });

    const randomBytes = await createRandomBytes();
    const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
    await resetToken.save();

    //for sending mail using smtp server
    // mailTransport().sendMail({
    //   from: "emailverification@gmail.com",
    //   to: user.email,
    //   subject: "Password Reset",
    // html: generatePasswordResetTemplate(
    //   `http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`
    // ),
    // });

    //using sendgrid to send email
    const msg = {
        to: user.email,
        from: "harshvardhansinhjadeja49@gmail.com",
        subject: "Password Reset",
        text: "A link provided to your password reset",
        html: generatePasswordResetTemplate(
            `http://localhost:3000/reset-password-media?token=${randomBytes}&id=${user._id}`
        ),
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });

    res.json({
        success: "true",
        message: "password reset link is sent to your email",
    });
};

exports.resetPasswordMedia = async (req, res) => {
    console.log("INSIDE RESET");
    const { password } = req.body;
    console.log("Password in reset Password" + password);
    const user = await MediaReporter.findOne(req.user._id);

    if (!user) return res.send({ success: "false", message: "user not found" });

    const isSamePassword = await user.comparePassword(password);
    if (isSamePassword)
        return res.send({
            success: "false",
            message: "New password must be different",
        });

    if (password.trim().length < 8 || password.trim().length > 20)
        return res.send({
            success: "false",
            message: "Password must be in 8 to 20 character limit",
        });

    user.password = password.trim();
    await user.save();

    await ResetToken.findOneAndDelete({ owner: user._id });

    //Mailtrap reset password success mail
    // mailTransport().sendMail({
    //   from: "emailverification@gmail.com",
    //   to: user.email,
    //   subject: "Password Reset SuccessFully",
    //   html: successTemplate(),
    // });

    //sendgrid reset password success mail
    const success = {
        to: user.email,
        from: "harshvardhansinhjadeja49@gmail.com",
        subject: "Password Reset SuccessFully",
        text: "Yehee now log in with your new password",
        html: successTemplate(),
    };
    sgMail
        .send(success)
        .then(() => {
            console.log("Email sent");
        })
        .catch((error) => {
            console.error(error);
        });

    res.json({
        success: "true",
        message: "password reset SuccessFully",
    });
};

const jwt = require('jsonwebtoken')
const User = require('./../models/user')
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

exports.createUser = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const isNewUser = await User.isThisEmailInUse(email)
    if (!isNewUser)
        return res.json({
            success: false,
            message: 'This email is already in use'
        })
    const user = await User({
        username,
        email,
        password,
        confirmPassword,
    })
    await user.save();
    res.json(user)
}

exports.userSignIn = async (req, res) => {
    console.log("inside login");
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // const userEmail=await User.findOne({email});
    if (!user) return res.json({ success: false, message: 'username / password does not match' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.json({ success: false, message: 'username / password does not match' });

    // const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    // console.log(token);
    //     user.token=token;
    //    await user.save();
    const token = await user.generateAuthToken();
    if (token) {
        res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 2589200000),
            httpOnly: true
        })
        return res.status(200).json({ success: true, user, token, type: "User" });
    } else {
        return res.status(422).json({ success: false, message: 'somthing went wrong' });
    }
    // console.log(token);
    // await user.save();
    // console.log(user);

}

exports.getProfile = async (req, res) => {
    console.log(req.rootUser);
    res.json({ data: req.rootUser, success: true, message: 'User find' })
}

exports.editProfile = async (req, res) => {
    console.log(req.body);
    const id = req.userId;
    const data = await User.findByIdAndUpdate(id, { $set: req.body })
    // console.log(data);
    res.status(200).json({ data: data, success: true, message: 'Profile details updated' })
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    if (!email)
        return res.send({ success: "false", message: "please provide email" });

    const user = await User.findOne({ email });
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
            `http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`
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

exports.resetPassword = async (req, res) => {
    console.log("INSIDE RESET");
    const { password } = req.body;
    console.log("Password in reset Password" + password);
    const user = await User.findOne(req.user._id);

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

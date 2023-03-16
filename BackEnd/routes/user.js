const express = require('express')
const UserIsAuth = require('../middlewares/UserIsAuth')
const {isResetTokenValid} = require('../middlewares/UserIsAuth')
const MediaReporterIsAuth = require('../middlewares/MediaReporterIsAuth')
const {isResetTokenValidMedia}= require('../middlewares/MediaReporterIsAuth')
const router = express.Router();
const { createUser, userSignIn,editProfile,getProfile,forgotPassword,resetPassword } = require('./../controllers/user')
const { upload,createNews,allNews,myNews} = require('./../controllers/createNews')
const CreateNews = require('../models/CreateNews')
const { validateCreateNews } = require('../middlewares/validation/mediaReporter')

const { createMediaReporter, mediaReporterSignIn,mediaEditProfile,mediaGetProfile,forgotPasswordMedia,resetPasswordMedia } = require('../controllers/mediaReporter')

const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');

const { mediaReporterValidation, validateMediaReporteSignIn, validateMediaReporterSignUp } = require('../middlewares/validation/mediaReporter')

const { isAuth } = require('../middlewares/auth');

router.post('/createUser', validateUserSignUp, userValidation, createUser)
router.post('/signIn', validateUserSignIn, userValidation, userSignIn)
router.post('/createMediaReporter', validateMediaReporterSignUp, mediaReporterValidation, createMediaReporter)
router.post('/mediaReportersignIn', validateMediaReporteSignIn, mediaReporterValidation, mediaReporterSignIn)
// router.post('/signIn',userSignIn)
router.post('/createPost', MediaReporterIsAuth.isAuth, (req, res) => {
    res.send('Welcome you are in secret route');
})

router.get('/ApiNewsHome', isAuth, async (req, res) => {
    console.log(req.rootUser);
    res.json({ success: true, message: "hello from apinews", data: req.rootUser })
})

router.get('/Subscription', MediaReporterIsAuth.isAuth, async (req, res) => {
    console.log(req.rootUser);
    res.json({ success: true, message: "hello from Subscription", data: req.rootUser })
})

router.post('/uploadNews', MediaReporterIsAuth.isAuth,createNews)

router.get('/AllNews',isAuth,allNews)

router.get('/MyNews', MediaReporterIsAuth.isAuth,myNews)

router.get('/getUserProfile',UserIsAuth.isAuth,getProfile)
router.put('/EditUserProfile', UserIsAuth.isAuth,editProfile)
router.put('/EditUserProfilePhoto', UserIsAuth.isAuth,editProfile)

router.get('/getMediaProfile',MediaReporterIsAuth.isAuth,mediaGetProfile)
router.put('/EditMediaProfile', MediaReporterIsAuth.isAuth,mediaEditProfile)
router.put('/EditMediaProfilePhoto', MediaReporterIsAuth.isAuth,mediaEditProfile)


router.post("/forgotPassword", forgotPassword);
router.post("/reset-password", isResetTokenValid, resetPassword);
router.post("/verify-token", isResetTokenValid, (req, res) => {
  res.send({success: true, message: "Valid Token"});
});

router.post("/forgotPasswordMedia", forgotPasswordMedia);
router.post("/reset-password-media", isResetTokenValidMedia, resetPasswordMedia);
router.post("/verify-token-Media", isResetTokenValidMedia, (req, res) => {
  res.send({success: true, message: "Valid Token"});
});

module.exports = router;
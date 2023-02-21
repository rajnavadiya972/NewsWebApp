const express = require('express')
const UserIsAuth = require('../middlewares/UserIsAuth')
const MediaReporterIsAuth = require('../middlewares/MediaReporterIsAuth')
const router = express.Router();
const { createUser, userSignIn } = require('./../controllers/user')
const {createMediaReporter,mediaReporterSignIn} = require('../controllers/mediaReporter')
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');
const {mediaReporterValidation,validateMediaReporteSignIn,validateMediaReporterSignUp} = require('../middlewares/validation/mediaReporter')
const { isAuth } = require('../middlewares/auth');
router.post('/createUser', validateUserSignUp, userValidation, createUser)
router.post('/signIn', validateUserSignIn, userValidation, userSignIn)
router.post('/createMediaReporter', validateMediaReporterSignUp, mediaReporterValidation, createMediaReporter)
router.post('/mediaReportersignIn', validateMediaReporteSignIn, mediaReporterValidation, mediaReporterSignIn)
// router.post('/signIn',userSignIn)
router.post('/createPost', isAuth, (req, res) => {
    res.send('Welcome you are in secret route');
})
router.get('/ApiNewsHome', MediaReporterIsAuth.isAuth, async (req, res) => {
    console.log(req.rootUser);
    res.json({ success:true,message: "hello from apinews", data: req.rootUser })
})

module.exports = router;
const jwt = require('jsonwebtoken')
const MediaReporter = require('../models/mediaReporter')

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
    if(token){
        res.cookie('jwtoken',token,{
            expires:new Date(Date.now()+2589200000),
            httpOnly:true
        })
        return res.status(200).json({ success: true, reporter, token ,type:"MediaReporter"});
    }else{
        return res.status(422).json({ success: false,message: 'somthing went wrong'});
    }
    
}
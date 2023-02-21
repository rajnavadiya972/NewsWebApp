const jwt = require('jsonwebtoken')
const User = require('./../models/user')

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

    const isMatch =await user.comparePassword(password);
    if (!isMatch) return res.json({ success: false, message: 'username / password does not match' });

    // const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
    // console.log(token);
    //     user.token=token;
    //    await user.save();
    const token = await user.generateAuthToken();
    if(token){
        res.cookie('jwtoken',token,{
            expires:new Date(Date.now()+2589200000),
            httpOnly:true
        })
        return res.status(200).json({ success: true, user, token ,type:"User"});
    }else{
        return res.status(422).json({ success: false,message: 'somthing went wrong'});
    }
    // console.log(token);
    // await user.save();
    // console.log(user);
    
}
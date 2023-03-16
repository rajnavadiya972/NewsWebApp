const jwt = require("jsonwebtoken");
const mediaReporter = require("../models/mediaReporter");
const {isValidObjectId} = require("mongoose");
const ResetToken = require("../models/resetToken");

exports.isAuth = async (req, res, next) => {
    try {
        // console.log("hello");
        // console.log(req.cookies);
        const token = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

        const rootMediaReporte = await mediaReporter.findOne({ _id: verifytoken._id, token: token });
        // console.log(rootMediaReporte);

        if (!rootMediaReporte) { throw new Error("Unauthorized"); }

        else {
            // console.log(req);
            req.token = token;
            req.rootMediaReporte = rootMediaReporte;
            req.mediaReporterId = rootMediaReporte._id;
            // res.send({ success: true, message: "You are already logged in!" });
            next();
        }

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(422).send({ success: false, error: "Unauthorized Access" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(422).send({
                success: false,
                error: "Token Expired Try generating new TOKEN",
            });
        }
        return res.status(422).send({ success: false, error: "Session Expired try sign in again" });
    }
}

exports.isResetTokenValidMedia = async (req, res, next) => {
    const {token, id} = req.body.userdata;
    // console.log(req.body);
    if (!token || !id)
      return res.send({success: "false", message: "Token or Id not found"});
  
    if (!isValidObjectId(id))
      return res.send({success: "false", message: "Not a vlaid user id"});
  
    const user = await mediaReporter.findById(id);
    if (!user) return res.send({success: "false", message: "User not found"});
  
    const resetToken = await ResetToken.findOne({owner: user._id});
    if (!resetToken)
      return res.send({success: "false", message: "TOKEN does not found"});
  
    const isValidToken = await resetToken.compareToken(token);
    if (!isValidToken)
      return res.send({success: "false", message: "TOKEN does not match"});
  
    req.user = user;
    console.log(token);
    console.log(id);
    console.log("inside resettoken validation");
    next();
  };
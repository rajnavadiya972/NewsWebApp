const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuth = async (req, res, next) => {
    try {
        console.log("hello");
        console.log(req.cookies);
        const token = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, process.env.JWT_SECRET);

        const rootUser = await User.findOne({ _id: verifytoken._id, token: token });
        console.log(rootUser);

        if (!rootUser) { throw new Error("Unauthorized"); }

        else {
            req.token = token;
            req.rootUser = rootUser;
            req.userId = rootUser._id;
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
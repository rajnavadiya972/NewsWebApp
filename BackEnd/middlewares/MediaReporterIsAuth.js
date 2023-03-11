const jwt = require("jsonwebtoken");
const mediaReporter = require("../models/mediaReporter");

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
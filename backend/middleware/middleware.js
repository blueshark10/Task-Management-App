let jwt = require("jsonwebtoken");
function checkJWTToken(req, res, next) {
    if (req.headers.token !== null) {
        let token = req.headers.token;
        jwt.verify(token, "secretKey", function (error, data) {
            if (error) {
                res.send({ status:"bad",message: "Invalid Token Sign In Again" });
            } else {
                req.username = data.username;
                req.password = data.password;
                next();
            }
        });
    } else {
        res.send({ status:"bad",message: "User Not Logged In! No token attached to the request " });
    }
}

function verifyTitleLength(req, res, next) {
    const { title } = req.body;
    if (title.length > 140) {
        res.send({ message: "Couldn't add :Title Length Exceed Limit (140 characters)!" })
    }
    else {
        next(); 
    }
}

module.exports = {
    checkJWTToken,
    verifyTitleLength
};

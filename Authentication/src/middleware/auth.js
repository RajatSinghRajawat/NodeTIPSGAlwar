const jwt = require("jsonwebtoken")





const verifyToken = (req, res, next) => {

    const authheader = req.headers.authorization;
    const token = authheader && authheader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "unauthorized" })
    }


    jwt.verify(token , "secret_key" ,(err , decoded)=>{
        if (err) {
            return res.status(403).json({ message: "forbidden" })
        }
        req.auth = decoded
        next()
    })
}

module.exports = verifyToken
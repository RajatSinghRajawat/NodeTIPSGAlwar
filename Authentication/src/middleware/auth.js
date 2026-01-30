const jwt = require("jsonwebtoken")




const verification = async (req, res , next) => {

    const autheader = req.headers.authorization;
    const token = autheader && autheader.split(" ")[1]
    if (!token) {
        res.status(401).json({ message: "unauthorized" })
    }

    jwt.verify(token , "secret_key" , (err , decoded)=>{
        if (err) {
            return res.status(403).json({ message: "forbidden" })
            
        }
        req.auth = decoded
        next()
    })
}


module.exports = {verification}
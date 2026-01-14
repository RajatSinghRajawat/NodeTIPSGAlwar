const jwt = require("jsonwebtoken")




const verification = (req,res, next)=>{


    const autheader = req.headers.authorization
    const token = autheader && autheader.split(" ")[1]

    if(!token){
        console.log("errr");
        
    }


    jwt.verify(token , "mains" , (err , decoded)=>{
        if (err) {
            console.log("errroooo");
        }

          req.user = decoded;
            next()
        
    })

}


module.exports = verification
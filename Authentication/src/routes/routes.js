const express = require("express")
const { register , login , logout , getProfile} = require("../controller/auth")
const verifyToken = require("../middleware/auth")

const router = express.Router()



router.post("/register", register)
router.post("/login" , login)
router.post("/logout" , logout)
router.get("/profile" , verifyToken ,  getProfile)




module.exports =  router 
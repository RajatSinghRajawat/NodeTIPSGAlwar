const express = require("express")
const { register , login , logout , getProfile} = require("../controller/auth")
const {verification} = require("../middleware/auth")

const router = express.Router()



router.post("/register", register)
router.post("/login" , login)
router.post("/logout" , logout)
router.get("/profile"  ,verification ,   getProfile)




module.exports =  router 
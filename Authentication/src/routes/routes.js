const express = require("express")
const { register , login , logout , getProfile ,sendOtp , verifyOtp} = require("../controller/auth")
const {verification} = require("../middleware/auth")

const router = express.Router()


router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.post("/register", register)
router.post("/login" , login)
router.post("/logout" , logout)
router.get("/profile"  ,verification ,   getProfile)




module.exports =  router 
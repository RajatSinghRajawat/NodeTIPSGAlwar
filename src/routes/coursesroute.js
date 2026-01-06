const express = require("express")
const { courseAdd } = require("../controller/courses")

const router = express.Router()



router.post("/add" , courseAdd)
// router.get("/get" , )




module.exports = router
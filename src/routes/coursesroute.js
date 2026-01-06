const express = require("express")
const { courseAdd } = require("../controller/courses")

const router = express.Router()



router.post("/add" , courseAdd)




module.exports = router
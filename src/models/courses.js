const mongoose = require("mongoose")



const courses = new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    }
})


const course = mongoose.model("courses" , courses);



module.exports = {course}
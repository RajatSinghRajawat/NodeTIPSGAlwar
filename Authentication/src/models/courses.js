const mongoose = require("mongoose")




const courses = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    }

})

const course = mongoose.model("course", courses)
module.exports = {course}
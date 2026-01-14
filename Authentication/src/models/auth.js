const mongoose = require("mongoose")


const auth = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password:{
        type:String,
        required:true
    }
})



const Auth  = mongoose.model("auth" , auth);

module.exports = {Auth}
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
    password: {
        type: String,
        required: true
    },
    Otp: { type: Number },
})



const Auth = mongoose.model("auth", auth);

module.exports = { Auth }
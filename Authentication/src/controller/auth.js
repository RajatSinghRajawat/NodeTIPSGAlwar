const { Auth } = require("../models/auth");
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken")

const saltround = 10;
const register = async (req, res) => {

    try {
        const { name, email, password } = req.body
        if (!name, !email, !password) {
            res.status(404).json({ message: "fields are required" })
        }

        const hashedpassword = await bcrypt.hash(password, 15)
        const auth = await Auth.create({
            name, email, password: hashedpassword
        })

        if (!auth) {
            res.status(404).json({ message: "user not created" })
        }

        const paylod = {
            id: auth._id,
            email: auth.email
        }
        const token = jwt.sign(paylod, "secret_key", { expiresIn: "1d" })

        res.status(200).json({
            message: "user created successfully",
            token,
            auth
        })



    } catch (error) {
        console.log(error);


    }

}
const login = async (req, res) => {
    try {
        const { email, password } = req.body


        const auth = await Auth.findOne({ email });
        const isPasswordValid = await bcrypt.compare(password, auth.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ id: auth._id }, "secret_key", { expiresIn: "1d" })


        res.status(200).json({ message: "user logged in successfully", token, auth })

    } catch (error) {
        console.log(error);

    }
}
const logout = async (req, res) => {
    try {
        const auth = await Auth.findOneAndUpdate({ token: null })
        res.status(200).json({ message: "user loggout", auth })
    } catch (error) {
        console.log(error);

    }
}
const getProfile = async (req, res) => {
    try {
        const auth = await Auth.findById(req.auth.id)
        console.log(auth, 'jkj');

        res.status(200).json({ message: "user profile", auth })
    } catch (error) {
        console.log(error);
    }
}
module.exports = { register, login, logout, getProfile }
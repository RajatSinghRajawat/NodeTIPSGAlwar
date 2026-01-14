const jwt = require("jsonwebtoken")
const { Auth } = require("../models/auth")

const register = async (req, res) => {

    try {
        const { name, email, password } = req.body

        const auth = await Auth.create({
            name, email, password
        })
        if (!auth) {
            res.status(400).json({ message: "user not register" })
        }

        const payload = { email: auth.email }
        const token = jwt.sign(payload, "secret_key", { expiresIn: "1d" })

        res.status(200).json({
            message: "user  register",
            token,
            auth

        })

    } catch (error) {
        console.log(error);

    }

}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = await Auth.findOne({ email, password });
        if (!auth) {
            res.status(400).json({ message: "user not found" })
        }
        const payload = { email: auth.email }
        const token = jwt.sign(payload, "secret_key", { expiresIn: "1d" })

        res.status(200).json({
            message: "user  login",
            token,
            auth
        })



    } catch (error) {

    }
}
const logout = async (req, res) => {

    try {
        const logout = await Auth.findOneAndUpdate({ token: null })
        res.status(200).json({
            message: "user logout",
            logout
        })

    } catch (error) {
        console.log(error);

    }

}

module.exports = { register, login, logout }
const { Auth } = require("../models/auth");

const jwt = require("jsonwebtoken")






const register = async (req, res) => {

    try {
        const { name, email, password } = req.body
        if (!name, !email, !password) {
            res.status(404).json({ message: "fields are required" })
        }


        const auth = await Auth.create({
            name, email, password
        })

        if (!auth) {
            res.status(404).json({ message: "user not created" })
        }

        const token = jwt.sign({ id: auth._id }, "secret_key", { expiresIn: "1d" })

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

        const auth = await Auth.findOne({ email, password });
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


const getProfile = async (req,res)=>{
    const user = await Auth.find();
    res.send({user})
}

module.exports = { register, login, logout }
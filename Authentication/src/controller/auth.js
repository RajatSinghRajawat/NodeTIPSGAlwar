const { Auth } = require("../models/auth");
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
const sendEmail = require("../common/Emailsender");

const saltround = 10;
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
};

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const otp = generateOTP();

        // Check user exists or not
        let user = await Auth.findOne({ email });

        if (!user) {
            user = await Auth.create({ email, Otp: otp });
        } else {
            user.Otp = otp;
            await user.save();
        }

        // Send Email
        await sendEmail(
            email,
            "Your OTP Code",
            `Your OTP is ${otp}`,
            `<h2>Your OTP is: ${otp}</h2>`
        );

        res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending OTP" });
    }
};



const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.Otp != otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // OTP verified → clear OTP
        user.Otp = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "OTP verification failed" });
    }
};

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
module.exports = { register, login, logout, getProfile, sendOtp, verifyOtp }
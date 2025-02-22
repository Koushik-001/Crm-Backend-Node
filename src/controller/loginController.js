const User = require('../model/userLoginSchema');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({ message: "Phone and OTP are required" });
        }

        const user = new User({ phone, otp });
        await user.save();
        const token = jwt.sign(
            { userId: user._id, phone: user.phone }, 
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        res.status(201).json({ message: "User created successfully", user, token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

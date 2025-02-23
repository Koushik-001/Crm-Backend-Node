const User = require("../model/userLoginSchema");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const sendOtp = (phone) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const serviceSid = process.env.TWILIO_SERVICE_SID;

  client.verify
    .services(serviceSid)
    .verifications.create({ to: phone, channel: "sms" })
    .then(() => console.log(`OTP sent to ${phone}`))
    .catch((err) => console.error("Error sending OTP:", err));
};

const verifyOtp = async (phone, otp) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);
  const serviceSid = process.env.TWILIO_SERVICE_SID;

  try {
    const verificationCheck = await client.verify
      .services(serviceSid)
      .verificationChecks.create({ to: phone, code: otp });

    if (verificationCheck.status === "approved") {
      console.log("OTP verified successfully");
      return true;
    } else {
      console.log("OTP verification failed");
      return false;
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return false;
  }
};

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

    if (phone && !otp) {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        sendOtp(phone);
        return res.status(201).json({ message: "Thanks for coming back" });
      } else {
        const user = new User({ phone });
        await user.save();
        sendOtp(phone);
        return res.status(201).json({ message: "User created successfully. OTP sent.", user });
      }
    } else {
      return res.status(400).json({ message: "Phone number or OTP is missing" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.verifyUser = async (req, res) => {
  const { phone, otp } = req.body;

  if (phone && otp) {
    const isVerified = await verifyOtp(phone, otp);
    if (isVerified) {
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.otp = otp;
      await user.save();
      const token = jwt.sign(
        { userId: user._id, phone: user.phone },
        SECRET_KEY,
        { expiresIn: "24h" }
      );
      return res.status(200).json({ message: "OTP verified successfully", user, token });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  }

  return res.status(400).json({ message: "Phone number and OTP are required" });
};

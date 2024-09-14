require("dotenv").config();
const User = require("../../models/User/user");
const crypto = require("crypto");
const validator = require("validator");
const { sendEmail } = require("../../utils");

// Only admin can get the list of all users
exports.getUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// Anyone can register
exports.registerUser = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Either password/Email field is empty" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email !!" });
  }

  const emailToken = crypto.randomBytes(64).toString("hex");
  const newUser = new User({
    email,
    emailToken,
    firstname,
    lastname,
  });

  await User.register(newUser, password, async (err, user) => {
    if (err) {
      console.log({ error: err });
      return res.status(409).json({ error: "Email already exists" });
    }

    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: user.email,
      subject: "FineArts Registration - Verify your Email",
      text: `Hi there, Thanks for registering on FineArts! Please copy and paste the url given below to verify your account: http://${req.headers.host}/user/verify-email?token=${user.emailToken}`,
      html: `<h1>Hi there,</h1><p>Thanks for registering on FineArts!</p><p>Please click on the link below to verify your account:</p><a href="https://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify your account</a>`,
    };

    try {
      await sendEmail(mailOptions);
      return res.status(200).json({
        status: "success",
        msg: "Thanks for Registering! Please check your email for verification",
        user,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong!!", desc: err });
    }
  });
};

// Email verification API
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ emailToken: req.query.token });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Token Invalid! Please try registering again!" });
    }

    user.emailToken = null;
    user.isVerified = true;
    await user.save();

    return res.status(200).redirect(`https://${req.headers.host}`);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong!", desc: error });
  }
};

// OTP verification API
exports.verifyOtp = async (req, res) => {
  const { otp, password, email } = req.body;

  if (!otp.trim() || !password.trim() || !email.trim()) {
    return res.status(400).json({ error: "Please fill valid details" });
  }

  try {
    const user = await User.findOne({ emailToken: otp });
    if (!user) {
      return res.status(401).json({ error: "Invalid OTP or Email!" });
    }

    user.emailToken = null;
    user.isVerified = true;

    await user.setPassword(password, async (err, updatedUser) => {
      if (err) {
        return res.status(500).json({ error: "Unable to set password" });
      }

      await updatedUser.save();
      return res
        .status(200)
        .json({ status: "success", msg: "Password validated successfully!" });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong!", desc: error });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid Email" });
    }

    const otp = parseInt(Math.random() * 1000000);
    user.emailToken = otp;
    user.isVerified = false;

    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: user.email,
      subject: "FineArts Password Reset",
      text: `Hi there, Forgot Your Password? Enter the given OTP to reset your password.`,
      html: `<h1>Hi there,</h1><h2>Your OTP is: ${otp}</h2>`,
    };

    await user.save();
    await sendEmail(mailOptions);

    return res
      .status(200)
      .json({ status: "success", msg: "OTP Sent. Please enter the OTP." });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong!", desc: error });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { user } = await User.authenticate()(email, password);
  if (!user) {
    return res.status(404).json({ error: "Invalid Credentials!" });
  }

  const token = await user.generateAuthToken();
  return res.status(200).json({
    status: "success",
    msg: "You are successfully logged in!",
    token,
    admin: user.admin,
  });
};

// Logout user
exports.logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    return res
      .status(200)
      .json({ status: "success", msg: "Logged out successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Unable to logout", desc: error });
  }
};

// Logout all sessions
exports.logoutUserAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    return res
      .status(200)
      .json({ status: "success", msg: "Logged out from all sessions!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Unable to logout from all sessions", desc: error });
  }
};

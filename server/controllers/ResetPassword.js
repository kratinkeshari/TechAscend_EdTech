const Users = require("../models/Users");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(500).json({
        success: false,
        message: "Please provide the email",
      });
    }

    const user = await Users.findOne({ email  });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Email is not registered wiht us",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedUser = await Users.findOneAndUpdate(
      { email },
      {
        token: token,
        resetTokenExpiry: new Date(Date.now() + 5 * 60 * 1000),
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;
    await mailSender(
      updatedUser.email,
      "Password Reset",
      `Your Link for email verification is ${url} . Please click this url to reset your password.`
    );

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      // data : "kuch gadbad hai",
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }

    const user = await Users.findOne({ token });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (user.resetTokenExpiry <= Date.now()) {
      return res.status(500).json({
        success: false,
        message: "Token expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.findOneAndUpdate(
      { email: user.email },
      { token: null,
        password: hashedPassword,
        resetTokenExpiry: null     
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password change successful",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

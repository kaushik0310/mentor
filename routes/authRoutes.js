const express = require("express");
const {
  registerUser,
  loginUser,
  updatePasswordController,
  forgotPasswordController,
  resendOTPController,
  resetPasswordController,
} = require("../controller/authController");
const authToken = require("../middlewares/authMiddleware");
const router = express.Router();

//router.route("/register").post(registerUser)
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/updatePassword", authToken, updatePasswordController);

//route for resetting password through security answer
//router.post("/resetPassword", resetPasswordController);

// Endpoint to request OTP for password reset
router.post("/forgotPassword", forgotPasswordController);

//Endpoint to resend OTP
router.post("/resendOTP", resendOTPController);

// Endpoint to verify OTP and reset password
router.post("/reset-Password", resetPasswordController);

//endpoint to verify otp
//router.post("/verifyOTP", verifyOTPController);

//endpoint to enter newPassword
//router.post("/enterNewPassword", newPasswordController);

module.exports = router;

const express = require("express");
const { registerUser, loginUser, resetPasswordController } = require("../controller/authController");
const router = express.Router();

//router.route("/register").post(registerUser)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resetPassword", resetPasswordController);

module.exports = router;

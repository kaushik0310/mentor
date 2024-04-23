const nodemailer = require("nodemailer");
// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.password,
  },
});

module.exports = transporter;

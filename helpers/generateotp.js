
const otpGenerator = require("otp-generator");
// Generate a random OTP
const generateOTP = () => {
  return otpGenerator.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });
};

module.exports = generateOTP;

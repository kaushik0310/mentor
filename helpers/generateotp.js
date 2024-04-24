
//1.const otpGenerator = require("otp-generator");
// Generate a random OTP
// const generateOTP = () => {
//   return otpGenerator.generate(6, {
//     alphabets: false,
//     upperCase: false,
//     specialChars: false,
//   });
// };


//2. Generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000)//.toString();
};


// //3. Generate a random OTP
// const generateOTP = () => {
//   let otpDigits = "0123456789"
//  let otp = ""
//  for(let i = 0; i<4; i++){
//   otp +=otpDigits[Math.floor(Math.random()*10)]//round
//  }
//  return otp;
// };

module.exports = generateOTP;

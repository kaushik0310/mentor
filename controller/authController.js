const User = require("../model/userModel");
const generateToken = require("../helpers/generateToken");
const transporter= require("../helpers/nodemailer")
const generateOTP=require("../helpers/generateotp")
// const nodemailer = require("nodemailer");
// const otpGenerator = require("otp-generator");

const registerUser = async (req, res) => {
  try {
    const { name, email, password,answer } = req.body;
    if (!name || !email || !password ||!answer) {
      throw new Error("please enter all fields");
    }
    const userAvailable = await User.findOne({ email });
    //console.log("userAvailable", userAvailable);
    if (userAvailable) {
      throw new Error("User already registered");
    }
    //const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password, answer });
    await user.save();
    res.status(201).send({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      stackTrace: error.stack,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("please provide email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }

    const passwordMatched = await user.matchPassword(password);
    if (!passwordMatched) {
      throw new Error("incorrect password");
    }
    if (user && passwordMatched) {
      res.status(201).send({
        success: true,
        message: "user logged in successfully",
        user,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      stackTrace: error.stack,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await User.findById(req.body.id);
    // const user = await userModel.findById({_id:req.body.id})

    if (!user) {
      throw new Error("user not found")
    }

    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new Error("please provide old and new password")
    }

    //compare old password
    //const isMatch = await bcrypt.compare(oldPassword, user.password);
   // if (!isMatch) {
    // throw new Error("Invalid old password")
  //  }
    const passwordMatched = await user.matchPassword(oldPassword);
    if (!passwordMatched) {
      throw new Error("incorrect old password");
    }

    //hashing password
    //const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "password updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      stackTrace: error.stack,
    });
  }
};

// const resetPasswordController=async(req,res)=>{
//   try {
//      const{email, answer, newPassword}=req.body;
//      if(!email || !answer || !newPassword){
//       throw new Error("please provide all fields")
//      }

//      const user = await User.findOne({email,answer})

//      if(!user){
//       throw new Error("incorrect email or security answer")
//      }

//      user.password=newPassword;
//      await user.save();
//      res.status(200).send({
//         success:true,
//         message:"password reset successful",
//         user
//      })
   

//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error: error.message,
//       stackTrace: error.stack,
//     });
//   }
// }

// // Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.user,
//     pass: process.env.password,
//   },
// });


// // Generate a random OTP
// const generateOTP = () => {
//   return otpGenerator.generate(6, {
//     alphabets: false,
//     upperCase: false,
//     specialChars: false,
//   });
// };

       
const forgotPasswordController=async(req,res)=>{
  try {

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Generate OTP
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 600000; // OTP expires in 10 minutes
    await user.save();
   // Send OTP via email
  transporter.sendMail({
    from: 'tariyaadmay@gmail.com',
    to: user.email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`,
  });

  //res.json({ message: 'OTP sent successfully' });
  res.status(200).send({
    success: true,
    message: "OTP sent successfully",
  });


  } catch (error) {
     console.log(error);
     res.status(500).send({
       success: false,
       error: error.message,
       stackTrace: error.stack,
     });
  }
}

const resendOTPController=async(req,res)=>{
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Generate OTP
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 600000; // OTP expires in 10 minutes
    await user.save();
    // Send OTP via email
    transporter.sendMail({
      from: "tariyaadmay@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    });

    //res.json({ message: 'OTP sent successfully' });
    res.status(200).send({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message,
      stackTrace: error.stack,
    });
  }
};

const resetPasswordController=async(req,res)=>{
      try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({email})

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Update password
       user.password = newPassword;
       user.otp = null;
       user.otpExpires = null;
       await user.save();
  res.json({ message: 'Password reset successfully' });
        
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error: error.message,
          stackTrace: error.stack,
        });
      }
}

// const verifyOTPController=async(req,res)=>{
//           try {
//         const { email, otp } = req.body;
//         const user = await User.findOne({email})

//         if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
//           return res.status(400).json({ message: "Invalid or expired OTP" });
//         }

//         // Update otpVerified to true
//        user.otp = null;
//        user.otpExpires = null;
//        user.otpVerified = true;
//        await user.save();
//   res.json({ message: 'otp verified successfully' });
        
//       } catch (error) {
//         console.log(error);
//         res.status(500).send({
//           success: false,
//           error: error.message,
//           stackTrace: error.stack,
//         });
//       }
// }

// const newPasswordController=async(req,res)=>{
//   try {
//         const { email, otpVerified, newPassword } = req.body;
//         const user = await User.findOne({email})

//         if (!user || user.otpVerified !== true ) {
//            return res.status(400).json({ message: "Invalid or expired OTP" });
//         }

//         // Update password
//         user.password = newPassword;
//         user.otpVerified=false;
//        await user.save();
//   res.json({ message: 'Password reset successfully' });
        
//       } catch (error) {
//         console.log(error);
//         res.status(500).send({
//           success: false,
//           error: error.message,
//           stackTrace: error.stack,
//         });
//       }
// }

module.exports = { registerUser, loginUser, updatePasswordController,forgotPasswordController,resendOTPController,resetPasswordController };

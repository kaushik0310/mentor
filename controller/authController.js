const User = require("../model/userModel");
const generateToken = require("../helpers/generateToken");
//const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try { 
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("please enter all fields");
    
    }
    const userAvailable = await User.findOne({email});
          console.log("userAvailable", userAvailable)
    if (userAvailable) {
      throw new Error("User already registered");
    }
    //const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password });
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
      stackTrace:error.stack
    });
  }
};

const loginUser = async(req,res)=>{
  try {
    const {email,password}=req.body;

    if(!email||!password){
      throw new Error("please provide email and password")
    }
    
    const user= await User.findOne({email});
    if(!user){
      throw new Error("user not found")
    }

    const passwordMatched = await user.matchPassword(password);
    if(user && passwordMatched){
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

const resetPasswordController = async(req,res)=>{
       //verifying email and old password
//        const{email, password}=req.body;
//       const emailMatch= await User.findById({email});
//       console.log(emailMatch) 
 }

module.exports = { registerUser,loginUser,resetPasswordController };

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
    otp: {
      type: String,
      default:"",
    },
    otpExpires: {
      type:String,
      default:"",
    },
    // otpVerified:{
    //   type:Boolean,
    //   default:false
    // }

  
  },
  { timestamps: true }
);

//hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//hashing the otp
userSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) {
    next();
  }
  this.otp = await bcrypt.hash(this.otp, 10);
});

//hashing the security ans
userSchema.pre("save", async  function(next) {
  if (!this.isModified("answer")) {
    next();
  }
  this.answer = await bcrypt.hash(this.answer, 10);
});


//password match
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//otp match
userSchema.methods.matchOtp = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp);
};

//security answer match
  userSchema.methods.matchAnswer = async function (enteredAnswer) {
  return await bcrypt.compare(enteredAnswer, this.answer);
};



module.exports = mongoose.model("User", userSchema);

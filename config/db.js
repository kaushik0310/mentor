const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to database ${mongoose.connection.host} ${mongoose.connection.name}`);
  } catch (error) {
    console.log("DB error", error);
  }
};
module.exports = connectDb;

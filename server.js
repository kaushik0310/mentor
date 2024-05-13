//importing express
const express = require("express");
//creating instance of express
const app = express();

//handling cross origin request
const cors = require("cors");
app.use(cors());

//req and res flow monitor
const morgan=require("morgan")
app.use(morgan("dev"));

//dotenv config
const dotenv = require("dotenv");
dotenv.config();

//db connection
const connectDb = require("./config/db");
connectDb();

//parsing json bodies
app.use(express.json());

//static serve
app.use("/uploads", express.static("uploads"));

const color = require("colors");

//route handling
app.use("/api/user", require("./routes/authRoutes"));
app.use("/api", require("./routes/aboutUsRoutes"));
app.use("/api/class", require("./routes/classRoutes"));

//port assign
const PORT = process.env.PORT || 4000;

//server create
app.listen(PORT, () => {
  console.log(`Server running on port no. : ${PORT}`.bgMagenta);
});

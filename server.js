const express = require("express");
const app = express();

const morgan=require("morgan")

const cors=require("cors")

//dotenv config
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());


//db connection
const connectDb = require("./config/db");
connectDb();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

app.use("/api/user", require("./routes/authRoutes"));
app.use("/api", require("./routes/aboutUsRoutes"));
app.use("/api/class", require("./routes/classRoutes"));



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port no. : ${PORT}`);
});

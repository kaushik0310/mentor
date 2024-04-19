const express = require("express");
const { classController, getClassController } = require("../controller/classController");
const upload = require("../middlewares/multer");
const classModel = require("../model/classModel");


const router = express.Router();


router.post("/createClass", upload.single("filename"), classController);
router.get("/getClass", getClassController);


module.exports = router;

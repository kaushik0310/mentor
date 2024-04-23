const express = require("express");
const { createClassController, getClassController } = require("../controller/classController");
const upload = require("../middlewares/multer");
const classModel = require("../model/classModel");


const router = express.Router();


router.post("/createClass", upload.single("filename"), createClassController);
router.get("/getClass", getClassController);


module.exports = router;

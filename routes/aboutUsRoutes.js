const express = require("express");
const { aboutUsController, createAboutUs } = require("../controller/aboutUsController");

const router = express.Router();


router.get("/aboutUs", aboutUsController);
router.post("/createAboutUs", createAboutUs)

module.exports = router;

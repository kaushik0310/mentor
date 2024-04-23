
const classModel = require("../model/classModel");

const createClassController = async (req, res) => {
  try {
 
    let createClass = await classModel.create({
      title: req.body.title,
      aboutClass: req.body.aboutClass,
      filename: process.env.baseUrl + req.file.filename
    });
     ///console.log("req.path",req.file);
    res.status(201).send({
      success: true,
      message: "class created successfully",
      createClass,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
      stackTrace: error.stack,
    });
  }
}

const getClassController =  async (req, res) => {
        try {
          let getClass = await classModel.find();
          res.status(200).send({
            success: true,
            message: "class fetched successfully",
            getClass,
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


module.exports = { createClassController,getClassController };

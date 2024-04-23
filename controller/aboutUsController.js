const aboutUsModel = require("../model/aboutUsModel");
//const response = require("../helpers/errorHandler");

const createAboutUs = async (req, res) => {
 //let responseData = {};

  try {
    const { title, content } = req.body;
    if (!title || !content) {
      throw new Error("please provide title and content");
    }
    const aboutUsData = new aboutUsModel({ title, content });
    await aboutUsData.save();
    res.status(201).send({
        success:true,
        message:"aboutUs data created successfully",
        aboutUsData
    })
    // responseData.message = "aboutUs data created successfully";
    // responseData.data = aboutUsData;
    // return response.success(res, responseData);
  } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
       message:error.message,
       stackTrace:error.stack
    })
    // responseData.message  =error.message;
    // return response.error(res, responseData);
  }
};

const aboutUsController = async (req, res) => {
  try {
    const aboutUsData = await aboutUsModel.find();

    res.send({
      success: true,
      aboutUsData,
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
module.exports = { aboutUsController, createAboutUs };

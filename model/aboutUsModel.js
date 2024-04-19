const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  title: String,
  content: String,

});

module.exports = mongoose.model("aboutUs", aboutUsSchema);

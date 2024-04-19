const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  aboutClass: {
    type: String,
  },
  filename: {
    type: String,
  },
});

module.exports = mongoose.model("classDetail", classSchema);

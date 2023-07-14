const mongoose = require("mongoose");
const { Schema } = mongoose;
const blogSchema = new Schema({
  title: String,
  author: String,
  message: String,

  date: { type: Date, default: Date.now },
});
const Model = mongoose.model("Prod", blogSchema);
module.exports = Model;

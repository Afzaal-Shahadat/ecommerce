const mongoose = require("mongoose");
const { Schema } = mongoose;
const AuthModel = new Schema({
  first_name: {
    type: String,
    required: [true, "First name is required field"],
    minLength: [3, "Name should be at least of three"],
    maxLength: [30, "Name should be less then thirty"],
  },
  last_name: {
    type: String,
    required: [true, "First name is required field"],
    minLength: [3, "Name should be at least of three"],
    maxLength: [30, "Name should be less then thirty"],
  },
  email: {
    type: String,
    required: [true, "E-main is required field"],
  },
  password: {
    type: String,
    required: [true, "Password Must be required"],
  },
});
const authModel = mongoose.model("userdetail", AuthModel);
module.exports = authModel;

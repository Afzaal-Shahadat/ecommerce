const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModel = require("../model/authModel");
exports.register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        message: "E-main already exist",
      });
    }
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    const createUser = await authModel.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashpassword,
    });
    const token = jwt.sign(
      {
        email: createUser.email,
        id: createUser._id,
      },
      process.env.KEY
    );
    res.status(201).json({
      sucess: true,
      user: createUser,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await authModel.findOne({ email });
    if (!existingUser) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const matchedpassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!matchedpassword) {
      res.status(400).json({
        message: "Invalid credential",
      });
    }
    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      process.env.KEY
    );
    res.status(200).json({
      sucess: true,
      user: existingUser,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internL Server Error",
    });
  }
};
exports.logOut = async (req, res) => {
  try {
    const token = req.params;
    res.cookie(token, null, {
      expires: new Date(Date.now()),
    });
    res.status(201).json({
      message: "Logged out",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const User = require("../models/userModel");
const createCookie = require("../utils/createCookie");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });
const bcryptjs = require("bcryptjs");

//authentication middlewares
const tokenVerifier = (req, res, next) => {
  jwt.verify(req.cookies.jwt, process.env.JWTSECRETKEY, (err, decoded) => {
    if (err) {
      res.status(401).json({
        status: "fail",
        message: "You are not logged in!",
      });
    }
    if (decoded) {
      next();
    }
  });
};
const tokenSigner = (payload) => {
  const token = jwt.sign(payload, process.env.JWTSECRETKEY);
  return token;
};

const signup = async (req, res) => {
  const newUser = await new User(req.body).save();
  const data = await User.findById(newUser.id).lean();
  const token = tokenSigner(data);
  createCookie(res, token);
  res.status(201).json({
    status: "success",
    data: {
      data,
    },
  });
};

const login = (req, res) => {
  
};
const logout = (req, res) => {
  res.send("logout");
};
const forgotPassword = (req, res) => {
  res.send("forgotPassword");
};
const resetPassword = (req, res) => {
  res.send("resetPassword");
};
const updateEmail = (req, res) => {
  res.send("updateEmail");
};

module.exports = {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updateEmail,
  tokenVerifier,
  tokenSigner,
};

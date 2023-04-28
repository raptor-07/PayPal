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
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }
  User.findOne({ email })
    .select("+password +email +username")
    .lean()
    .then((user) => {
      console.log(user);

      if (!user) {
        res.status(401).json({
          status: "fail",
          message: "Incorrect email or password",
        });
      }
      bcryptjs.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(401).json({
            status: "fail",
            message: "Incorrect email or password",
          });
        }
        if (result) {
          const token = tokenSigner(user);
          createCookie(res, token);
          res.status(200).json({
            status: "success",
            data: {
              user,
            },
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: "Something went wrong",
        err: err,
      });
    });
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

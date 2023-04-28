const User = require("../models/userModel");
const createCookie = require("../utils/createCookie");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });
const bcryptjs = require("bcryptjs");
const nodeMailer = require("nodemailer");

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
      res.locals.user = decoded;
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
          user.password = undefined;
          const token = tokenSigner(user);
          createCookie(res, token);
          res.status(200).json({
            status: "success",
            data: {
              user,
            },
          });
        } else {
          res.status(401).json({
            status: "fail",
            message: "Incorrect email or password",
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
  const { email } = req.body;
  User.findOne({ email })
    .select("+password +email +username")
    .lean()
    .then((user) => {
      if (!user) {
        res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      } else {
        //connection to smpt server
        const transporter = nodeMailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });
        //generate new jwt
        const token = tokenSigner({ email: req.body.email });
        //send email
        const mailOptions = {
          from: process.env.EMAIL,
          to: req.body.email,
          subject: "Reset Password",
          html: `<h1>Click on the link below to reset your password</h1>
          <a href="http://${process.env.DOMAIN}/resetpassword/${token}">Reset Password</a>`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.status(500).json({
              status: "fail",
              message: "Something went wrong",
              err: err,
            });
          } else {
            res.status(200).json({
              status: "success",
              message: "email sent successfully",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: "fail",
        message: "Something went wrong",
        err: err,
      });
    });
};
const resetPassword = (req, res) => {
  if (req.body.newpassword !== req.body.confirmpassword) {
    res.status(400).json({
      status: "fail",
      message: "passwords do not match",
    });
  }
  if (!req.body.newpassword) {
    res.status(400).json({
      status: "fail",
      message: "please provide new password",
    });
  }
  User.updateOne(
    { email: res.locals.user.email },
    { password: req.body.newpassword, passwordIsChanged: true }
  )
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "password changed successfully",
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
const updateEmail = (req, res) => {
  User.updateOne({ email: res.locals.user.email }, { email: req.body.newemail })
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "email changed successfully",
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

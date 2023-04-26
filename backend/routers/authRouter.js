const express = require("express");
const router = express.Router();

router.route("/signup").post((req, res) => {
  res.send("signup");
});
router.route("/login").post((req, res) => {
  res.send("login");
});
router.route("/logout").get((req, res) => {
  res.send("logout");
});
router.route("/forgot-password").post((req, res) => {
  res.send("forgotPassword");
});
router.route("/reset-password").patch((req, res) => {
  res.send("resetPassword");
});
router.route("/update-email").patch((req, res) => {
  res.send("updateEmail");
});

module.exports = router;

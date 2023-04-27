const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password").patch(authController.resetPassword);
router.route("/update-email").patch(authController.updateEmail);

module.exports = router;

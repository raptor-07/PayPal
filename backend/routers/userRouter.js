const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.route("/:searchUserName").get(authController.tokenVerifier, userController.searchUserName);
router.route("/:userid/user-home").get(authController.tokenVerifier, userController.getUserHome);
router.route("/:userid/expense-data").get(authController.tokenVerifier, userController.getUserExpenseData);
router.route("/group").post(authController.tokenVerifier, userController.getUserGroups);
router
  .route("/:userid/:friendid")
  .post(authController.tokenVerifier, userController.addFriend)
  .get(authController.tokenVerifier, userController.getUserFriends);

module.exports = router;

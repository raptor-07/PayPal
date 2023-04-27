const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/:searchUserName").get(userController.searchUserName);
router.route("/:userid/user-home").get(userController.getUserHome);
router.route("/:userid/expense-data").get(userController.getUserExpenseData);
router.route("/group").post(userController.getUserGroups);
router
  .route("/:userid/:friendid")
  .post(userController.addFriend)
  .get(userController.getUserFriends);

module.exports = router;

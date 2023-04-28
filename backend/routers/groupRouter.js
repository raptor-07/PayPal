const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const groupController = require("../controllers/groupController");
router
  .route("/:groupid")
  .get(authController.tokenVerifier, groupController.getGroupById)
  .delete(authController.tokenVerifier, groupController.deleteGroupById);
router
  .route("/:groupid/transact")
  .post(authController.tokenVerifier, groupController.addTransaction)
  .get(authController.tokenVerifier, groupController.getTransactions)
  .delete(authController.tokenVerifier, groupController.deleteTransaction);

module.exports = router;

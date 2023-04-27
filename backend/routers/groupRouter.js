const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
router
  .route("/:groupid")
  .get(groupController.getGroupById)
  .delete(groupController.deleteGroupById);
router
  .route("/:groupid/transact")
  .post(groupController.addTransaction)
  .get(groupController.getTransactions)
  .delete(groupController.deleteTransaction);

module.exports = router;

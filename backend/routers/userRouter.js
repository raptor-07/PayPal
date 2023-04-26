const express = require("express");
const router = express.Router();

router.route("/:searchUserName").get((req, res) => {
  console.log(req.params.searchUserName);
  res.send("check username present in db or not and respond");
});
router.route("/:userid/user-home").get((req, res) => {
  res.send("get user details for home page");
});
router.route("/:userid/expense-data").get((req, res) => {
  res.send("get expense details of user");
});
router
  .route("/:userid/:friendid")
  .post((req, res) => {
    res.send("add users friends");
  })
  .get((req, res) => {
    res.send("get user friends");
  });

module.exports = router;

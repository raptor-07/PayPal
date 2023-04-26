const express = require("express");
const router = express.Router();

router.route("/").post((req, res) => {
  res.send("get all groups user is part of");
});
router
  .route("/:groupid")
  .get((req, res) => {
    console.log(req.params.groupid);
    
    res.send("get details of the group");
  })
  .delete((req, res) => {
    res.send("delete group");
  });
router
  .route("/:groupid/transact")
  .post((req, res) => {
    console.log(req.params.groupid);
    
    res.send("add transaction to group");
  })
  .get((req, res) => {
    res.send("get all transactions of group");
  })
  .delete((req, res) => {
    res.send("delete transaction from group");
  });
 
module.exports = router;

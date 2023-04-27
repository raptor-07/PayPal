
const getGroupById = (req, res) => {
    console.log(req.params.groupid);

    res.send("get details of the group");
};
const deleteGroupById = (req, res) => {
    res.send("delete group");
};
const addTransaction = (req, res) => {
    res.send("add transaction to group");
};
const getTransactions = (req, res) => {
    res.send("get all transactions of group");
};
const deleteTransaction = (req, res) => {
    res.send("delete transaction from group");
};


module.exports = {
    getGroupById,
    deleteGroupById,
    addTransaction,
    getTransactions,
    deleteTransaction
};
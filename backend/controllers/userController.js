
const searchUserName = (req, res) => {
    console.log(req.params.searchUserName);
    res.send("check username present in db or not and respond");
};
const getUserHome = (req, res) => {
    res.send("get user details for home page");
};
const getUserExpenseData = (req, res) => {
    res.send("get expense details of user");
};
const getUserGroups = (req, res) => {
    res.send("get all groups user is part of");
};
const addFriend = (req, res) => {
    res.send("add users friends");
};
const getUserFriends = (req, res) => {
    res.send("get user friends");
};


module.exports = {
    searchUserName,
    getUserHome,
    getUserExpenseData,
    getUserGroups,
    addFriend,
    getUserFriends
};
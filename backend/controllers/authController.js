// const User = require("../models/userModel");

const signup = (req, res) => {
    res.send("signup");
};
const login = (req, res) => {
    res.send("login");
};
const logout = (req, res) => {
    res.send("logout");
};
const forgotPassword = (req, res) => {
    res.send("forgotPassword");
};
const resetPassword = (req, res) => {
    res.send("resetPassword");
};
const updateEmail = (req, res) => {
    res.send("updateEmail");
};

module.exports = {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    updateEmail
};
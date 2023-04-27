const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config.env" });

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWTSECRETKEY);
  return token;
};

module.exports = {
  signToken,
};

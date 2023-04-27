module.exports = (res, token) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + 900000
    )
  };
  res.cookie("jwt", token, cookieOptions);
  
};

const express = require("express");
const app = express();
const morgan = require("morgan");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const groupRouter = require("./routers/groupRouter");

//util 3PMiddleware
app.use(morgan("dev"));
//middlewares for common routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);

module.exports = app;
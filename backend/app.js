const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const groupRouter = require("./routers/groupRouter");

//util 3PMiddleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//middlewares for common routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);

module.exports = app;

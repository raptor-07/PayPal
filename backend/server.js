const app = require("./app");
require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const process = require("process");

//connect to mongo database
mongoose
  .connect(
    process.env.DB_CONNECTION_STRING.replace(
      "<password>",
      process.env.DB_PASSWORD
    ),
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("-----DB connection successful!-----");
    console.log(`-----running on ${process.env.NODE_ENV} environment-----`);
  })
  .catch((err) => console.log(err));

//create express server
const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";
const server = app.listen(port, host, () => {
  console.log("-----server is now running on " + host + " : " + port + "-----");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection, shutting down");
  server.close(() => {
    process.exit(1);
  });

  process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("uncaught exception, shutting down");
    server.close(() => {
      process.exit(1);
    });
  });
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
PORT = process.env.PORT || 8080;
require("dotenv").config();
const { logError, returnError } = require("./errorHandling/errorHandler");

mongoose.connect(process.env.MONGO_URL).then(() => {
  app
    .use(cors())
    .use(express.json())
    .use((req, res, next) => {
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      next();
    })
    .use(("/", require("./routes")))
    .use(logError)
    .use(returnError);

  app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
});

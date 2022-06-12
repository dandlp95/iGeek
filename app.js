const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
PORT = process.env.PORT || 8080;
require("dotenv").config();
const { logError, returnError } = require("./errorHandling/errorHandler");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");

mongoose.connect(process.env.MONGO_URL).then(() => {
  // Passport config
  require("./passport")(passport);

  app
    .use(
      session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false, // It means dont create a session until something is stored.
        // cookie: { secure: true }, <- wont works until we use https
      })
    )
    .use(passport.initialize())
    .use(passport.session())
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

  // Login
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // handlebars
  // its exphbs.engine, not exphbs
  app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
  app.set("view engine", "hbs");

  app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
});

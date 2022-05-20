const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
PORT = process.env.PORT || 8080;
require("dotenv").config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        app
          .use(cors())
          .use(express.json())
          .use(("/", require("./routes")))
        
        app.listen(PORT, ()=>{
            console.log(`listening on PORT ${PORT}`);
        })

});

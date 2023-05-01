const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const app = express();
const cors = require("cors");
app.use(cors());
dotenv.config();

// middlewares
app.use(express.static("public"));
app.use(express.json());
// app.use(cookieParser());
const dbURI = process.env.DATABASE || "";
const port = process.env.PORT || 5000;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port);
    console.log("connected to db and listening at port 5000");
  })
  .catch((err) => {
    app.listen(port);
    app.get("/", (req, res) => {
      res.send(
        "Something Went Wrong! Please Try again after some time, if problem persists please contact us."
        );
      });
    });
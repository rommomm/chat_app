const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB STARTED");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT || port, () =>
  console.log(`SERVER STARTED ${process.env.PORT}`)
);

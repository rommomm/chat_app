const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 5000;

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json({ extends: true }));

app.use("/api", require("./routes/userRoutes"));

async function start() {
  try {
    mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("DB STARTED");
    });
    app.listen(process.env.PORT || port, () =>
      console.log(`SERVER STARTED ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(err.message);
  }
}
start();

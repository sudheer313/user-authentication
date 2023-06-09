// index.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const User = require("../models/user");

app.use(express.json());

app.use("/api/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`Server started on Port ${port}`);
});

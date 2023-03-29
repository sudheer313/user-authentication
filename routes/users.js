const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

require("dotenv").config();

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

// user registration route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).send("User already exists");
    }

    // create new user
    const newUser = new User({ email, password });
    await newUser.save();
    console.log(`User with email ${email} has been registered`);

    res.status(201).send("User created successfully");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
  }
});

// user login route
router.post("/login", (req, res) => {
  // user login logic
});

module.exports = router;

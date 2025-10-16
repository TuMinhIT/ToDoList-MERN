import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(req.body);
    const userExists = await User.findOne({ username });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ username, password });
    res.json({
      _id: user._id,
      username: user.username,
    });
  } catch (err) {
    console.log(Error);
    throw err;
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "30d" }),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    // res.status(500).json({ message: err.message });

    throw err;
  }
});

export default router;

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const auth = require("../middleware/auth");
// @route  GET api/auth
// @desc   Get a user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ data: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth/register
// @desc   Register a user
// @access Public
router.post(
  "/register",
  [
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail().not().isEmpty(),
    check("password", "Please enter a password with 6 or more characters")
      .not()
      .isEmpty()
      .isLength({
        min: 6,
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "Email already taken" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      const payload = {
        user: {
          id: newUser.id,
        },
      };
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 360000,
      });
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route  POST api/auth/login
// @desc   Login a user
// @access Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ msg: "Email or Password is wrong" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Email or Password is wrong" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, config.get("jwtSecret"), {
        expiresIn: 360000,
      });
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a user using POST "/api/auth", doesn't require authentication
router.post('/', [
  body('name').isLength({ min: 3 }).withMessage("Enter a valid Name."),
  body('email').isEmail().withMessage("Enter a valid Email."),
  body('password').isLength({ min: 8 }).withMessage("Password must have a minimum of 8 characters."),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    res.json(user);
  } catch (error) {
    console.log(error)
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ error: "Email already exist", message:error.message});
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
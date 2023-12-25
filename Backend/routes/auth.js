const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser'); 

const JWT_SECERET = "MynameisShreeyogGaikwad@$"

// ROUTE 1 : Creating a user using POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name').isLength({ min: 3 }).withMessage("Enter a valid Name."),
  body('email').isEmail().withMessage("Enter a valid Email."),
  body('password').isLength({ min: 8 }).withMessage("Password must have a minimum of 8 characters."),
], async (req, res) => {

  // Validating all fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try 
  {
    let user = await User.findOne({email : req.body.email})
    if(user)
    {
      return res.status(400).json({ error: "Email already exist", message:error.message});
    }

    // Securing Passwords by bcryptjs
    const salt = await bcrypt.genSalt(10);
    const seqPass = await bcrypt.hash(req.body.password, salt)

    // Creating a New User
      user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: seqPass
    });

    // Creating Authentication Token to give to User after Authentication.
    const data = {
      user:
      {
        id : user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECERET);
    res.json({authtoken});
  } 

  catch (error) 
  {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});




// ROUTE 2 : Authenticating a user using POST "/api/auth/login". No login required
router.post('/login', [
  body('email').isEmail().withMessage("Enter a valid Email."),
  body('password').exists().withMessage("Password cannot be blank."),
], async (req, res) => {

  // Validating all fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body;
  try {

    let user =  await User.findOne({email});
    if(!user)
    {
      return res.status(400).json({error:"Please Login with correct Credentials!"});
    }
    

    const passCompare = await bcrypt.compare(password, user.password);
    if(!passCompare)
    {
      return res.status(400).json({ errors:"Please Login with correct Credentials!"});
    }

    // Creating Authentication Token to give to User after Login.
    const data = {
      user:
      {
        id : user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECERET);
    res.json({authtoken});
  } 

  catch (error) 
  {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


// ROUTE 3 : Authenticating a user using POST "/api/auth/getuser". No login required
router.post('/getuser', fetchuser, async (req, res) => {

  // Getting the Data of the User.
  try 
  {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } 
  catch (error) 
  {
    console.error(error.message);
    res.status(500).send('Server error');
  }

});


module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser'); 

const router = express.Router();
const JWT_SECRET = "Shravaniisagood$girl"; 
router.post('/signup', async (req, res) => {
  const { username, email, password, gender, age, dob, workingStatus } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      age,
      dob,
      workingStatus
    });

    await newUser.save();
    const payload = {
      user: {
        id: newUser._id,  
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token }); 
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Error signing up' });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const payload = {
      user: {
        id: user._id, 
      },
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});
router.get('/profile', fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      username: user.username,
      email: user.email,
      phoneNo: user.phone_number,
      gender: user.gender,
      age: user.age,
      dob: user.dob,
      workingStatus: user.workingStatus,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
})
router.post('/findByEmail', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's ID
    res.json({ _id: user._id });
  } catch (err) {
    console.error('Error finding user by email:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

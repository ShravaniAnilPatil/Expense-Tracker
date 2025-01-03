// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const fetchUser = require('../middleware/fetchUser'); 

// const router = express.Router();
// const JWT_SECRET = "Shravaniisagood$girl"; 
// router.post('/signup', async (req, res) => {
//   const { username, email, password, gender, age, dob, workingStatus } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       gender,
//       age,
//       dob,
//       workingStatus
//     });

//     await newUser.save();
//     const payload = {
//       user: {
//         id: newUser._id,  
//       },
//     };

//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ message: 'User registered successfully', token }); 
//   } catch (error) {
//     console.error('Error signing up:', error);
//     res.status(500).json({ message: 'Error signing up' });
//   }
// });
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     const payload = {
//       user: {
//         id: user._id, 
//       },
//     };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Error logging in' });
//   }
// });
// router.get('/profile', fetchUser, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json({
//       username: user.username,
//       email: user.email,
//       phoneNo: user.phone_number,
//       gender: user.gender,
//       age: user.age,
//       dob: user.dob,
//       workingStatus: user.workingStatus,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// })
// router.post('/findByEmail', async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
    
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Return the user's ID
//     res.json({ _id: user._id });
//   } catch (err) {
//     console.error('Error finding user by email:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser'); 

const router = express.Router();
const JWT_SECRET = "Shravaniisagood$girl"; 

// Signup Route
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

// Login Route
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
    // console.log(id)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name, // Ensure name exists in the User model/schema
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Fetch User by Email Route
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      return res.json({ user_id: user._id }); // Return the user_id
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/profile/:id', async (req, res) => {
  console.log("&&&&&&&&&&&&&&&&11111")
  try {
    const {id}=req.params
    console.log(id)
    const user = await User.findById(id); // Query by ID
    if (user) {
      return res.json(user); // Return the user_id
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.put('/update/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;

    console.log('Update Route Triggered for:', email);
    console.log('Payload Received:', updatedData);

    // Prevent updates to email or password fields
    delete updatedData.email;
    delete updatedData.password;

    const user = await User.findOneAndUpdate(
      { email: email },       // Filter: Find user by email
      { $set: updatedData },  // Update fields
      { new: true, runValidators: true } // Return updated document and validate fields
    );

    if (!user) {
      console.log('No user found for email:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated User:', user);
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating user profile:', error);

    // Handle Duplicate Key Error explicitly
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate email detected' });
    }

    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;
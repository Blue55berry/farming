const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
require('dotenv').config();

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      // Create new user
      user = new User({
        name,
        email,
        password
      });

      // Save user to database (password will be hashed in the model's pre-save hook)
      await user.save();

      // Create JWT payload
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      // Sign and return JWT
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Check if password matches
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Update last login time
      user.lastLogin = Date.now();
      await user.save();

      // Create JWT payload
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      // Sign and return JWT
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email avatar lastLogin role coins coinHistory userCrops savedItems progress quizResults');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, avatar } = req.body;
    
    // Build profile update object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (avatar) profileFields.avatar = avatar;
    
    try {
      let user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      // Update user
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: profileFields },
        { new: true }
      ).select('-password');
      
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/users/password
// @desc    Update user password
// @access  Private
router.put(
  '/password',
  [
    auth,
    [
      check('currentPassword', 'Current password is required').not().isEmpty(),
      check('newPassword', 'Please enter a new password with 6 or more characters').isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { currentPassword, newPassword } = req.body;
    
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      // Check if current password matches
      const isMatch = await user.comparePassword(currentPassword);
      
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Current password is incorrect' }] });
      }
      
      // Update password
      user.password = newPassword;
      await user.save();
      
      res.json({ msg: 'Password updated successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/users/save-item
// @desc    Save an item (crop, guide, diagnosis)
// @access  Private
router.post(
  '/save-item',
  [
    auth,
    [
      check('itemType', 'Item type is required').isIn(['crop', 'guide', 'diagnosis']),
      check('itemId', 'Item ID is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { itemType, itemId } = req.body;
    
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      // Check if item is already saved
      const itemIndex = user.savedItems.findIndex(
        item => item.itemType === itemType && item.itemId.toString() === itemId
      );
      
      if (itemIndex !== -1) {
        return res.status(400).json({ msg: 'Item is already saved' });
      }
      
      // Add to saved items
      user.savedItems.unshift({
        itemType,
        itemId,
        savedAt: Date.now()
      });
      
      await user.save();
      
      res.json(user.savedItems);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/users/save-item/:itemType/:itemId
// @desc    Remove a saved item
// @access  Private
router.delete('/save-item/:itemType/:itemId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Get remove index
    const removeIndex = user.savedItems.findIndex(
      item => item.itemType === req.params.itemType && item.itemId.toString() === req.params.itemId
    );
    
    if (removeIndex === -1) {
      return res.status(404).json({ msg: 'Item not found in saved items' });
    }
    
    // Remove from array
    user.savedItems.splice(removeIndex, 1);
    
    await user.save();
    
    res.json(user.savedItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/saved-items
// @desc    Get all user saved items
// @access  Private
router.get('/saved-items', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    // Get populated saved items
    const populatedUser = await User.findById(req.user.id)
      .populate({
        path: 'savedItems.itemId',
        model: item => {
          switch (item.itemType) {
            case 'crop':
              return 'Crop';
            case 'guide':
              return 'Guide';
            case 'diagnosis':
              return 'Problem';
            default:
              return 'Crop';
          }
        }
      });
    
    res.json(populatedUser.savedItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/users/update-progress
// @desc    Update module progress
// @access  Private
router.post(
  '/update-progress',
  [
    auth,
    [
      check('moduleId', 'Module ID is required').not().isEmpty(),
      check('percentComplete', 'Percent complete is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { moduleId, percentComplete, completed } = req.body;
    
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      // Find if module progress already exists
      const moduleIndex = user.progress.findIndex(
        p => p.moduleId === moduleId
      );
      
      if (moduleIndex !== -1) {
        // Update existing progress
        user.progress[moduleIndex].percentComplete = percentComplete;
        user.progress[moduleIndex].completed = completed || false;
        user.progress[moduleIndex].lastAccessed = Date.now();
      } else {
        // Add new progress
        user.progress.push({
          moduleId,
          percentComplete,
          completed: completed || false,
          lastAccessed: Date.now()
        });
      }
      
      await user.save();
      
      res.json(user.progress);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST api/users/quiz-result
// @desc    Save quiz result
// @access  Private
router.post(
  '/quiz-result',
  [
    auth,
    [
      check('quizId', 'Quiz ID is required').not().isEmpty(),
      check('score', 'Score is required').isNumeric(),
      check('maxScore', 'Max score is required').isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { quizId, score, maxScore } = req.body;
    
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      // Check if quiz result already exists
      const quizIndex = user.quizResults.findIndex(
        q => q.quizId === quizId
      );
      
      if (quizIndex !== -1) {
        // Update existing result if new score is better
        if (score > user.quizResults[quizIndex].score) {
          user.quizResults[quizIndex].score = score;
          user.quizResults[quizIndex].completedAt = Date.now();
        }
      } else {
        // Add new result
        user.quizResults.push({
          quizId,
          score,
          maxScore,
          completedAt: Date.now()
        });
      }
      
      await user.save();
      
      res.json(user.quizResults);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/users/progress
// @desc    Get user learning progress
// @access  Private
router.get('/progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user.progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/quiz-results
// @desc    Get user quiz results
// @access  Private
router.get('/quiz-results', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user.quizResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/users/add-coins
// @desc    Add coins to user account
// @access  Private
router.post('/add-coins', auth, async (req, res) => {
  const { coins, source } = req.body;

  if (typeof coins !== 'number' || coins <= 0) {
    return res.status(400).json({ msg: 'Invalid number of coins' });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.coins = (user.coins || 0) + coins;
    user.coinHistory.unshift({ amount: coins, source: source || 'Earned', date: Date.now() }); // Add to history
    await user.save();

    res.json(user); // Return the updated user object
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/leaderboard
// @desc    Get leaderboard (users sorted by coins)
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .sort({ coins: -1 }) // Sort by coins in descending order
      .select('name coins') // Select only name and coins
      .limit(20); // Limit to top 20 users

    res.json(leaderboard);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/users/crops
// @desc    Add a crop to user's personal list
// @access  Private
router.post('/crops', auth, async (req, res) => {
  const { cropId } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if crop is already added
    if (user.userCrops.includes(cropId)) {
      return res.status(400).json({ msg: 'Crop already added' });
    }

    user.userCrops.unshift(cropId);
    await user.save();

    const populatedUser = await User.findById(req.user.id).populate('userCrops');
    res.json(populatedUser.userCrops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/users/crops
// @desc    Get all crops for the current user
// @access  Private
router.get('/crops', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('userCrops');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user.userCrops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

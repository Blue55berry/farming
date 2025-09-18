const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');
const auth = require('../middleware/auth');

// @route   GET api/guides
// @desc    Get all guides
// @access  Public
router.get('/', guideController.getAllGuides);

// @route   GET api/guides/:id
// @desc    Get guide by ID
// @access  Public
router.get('/:id', guideController.getGuideById);

// @route   GET api/guides/crop/:cropId
// @desc    Get guides for a specific crop
// @access  Public
router.get('/crop/:cropId', guideController.getGuidesByCrop);

// @route   GET api/guides/difficulty/:difficulty
// @desc    Get guides by difficulty
// @access  Public
router.get('/difficulty/:difficulty', guideController.getGuidesByDifficulty);

// @route   GET api/guides/traditional
// @desc    Get traditional guides
// @access  Public
router.get('/traditional', guideController.getTraditionalGuides);

// @route   GET api/guides/modern
// @desc    Get modern guides
// @access  Public
router.get('/modern', guideController.getModernGuides);

// @route   GET api/guides/search
// @desc    Search guides
// @access  Public
router.get('/search', guideController.searchGuides);

// @route   POST api/guides
// @desc    Create a guide
// @access  Private/Admin
router.post('/', auth, guideController.createGuide);

// @route   PUT api/guides/:id
// @desc    Update a guide
// @access  Private/Admin
router.put('/:id', auth, guideController.updateGuide);

// @route   DELETE api/guides/:id
// @desc    Delete a guide
// @access  Private/Admin
router.delete('/:id', auth, guideController.deleteGuide);

// @route   GET api/guides/seed
// @desc    Seed the database with initial guides
// @access  Public
router.get('/seed', guideController.seedGuides);

module.exports = router;

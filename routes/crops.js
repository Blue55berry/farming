const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');
const auth = require('../middleware/auth');

// @route   GET api/crops
// @desc    Get all crops
// @access  Public
router.get('/', cropController.getAllCrops);

// @route   GET api/crops/:id
// @desc    Get crop by ID
// @access  Public
router.get('/:id', cropController.getCropById);

// @route   GET api/crops/category/:category
// @desc    Get crops by category
// @access  Public
router.get('/category/:category', cropController.getCropsByCategory);

// @route   GET api/crops/search
// @desc    Search crops
// @access  Public
router.get('/search', cropController.searchCrops);

// @route   POST api/crops
// @desc    Create a crop
// @access  Private/Admin
router.post('/', auth, cropController.createCrop);

// @route   PUT api/crops/:id
// @desc    Update a crop
// @access  Private/Admin
router.put('/:id', auth, cropController.updateCrop);

// @route   DELETE api/crops/:id
// @desc    Delete a crop
// @access  Private/Admin
router.delete('/:id', auth, cropController.deleteCrop);

module.exports = router;

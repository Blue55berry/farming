const express = require('express');
const router = express.Router();
const diagnosisController = require('../controllers/diagnosisController');
const auth = require('../middleware/auth');

// @route   GET api/diagnosis/plant/:plantType
// @desc    Get problems by plant type
// @access  Public
router.get('/plant/:plantType', diagnosisController.getProblemsByPlant);

// @route   POST api/diagnosis/analyze
// @desc    Analyze symptoms and diagnose problem
// @access  Public
router.post('/analyze', diagnosisController.diagnosePlantProblem);

// @route   GET api/diagnosis/solutions/:id
// @desc    Get solutions for a specific problem
// @access  Public
router.get('/solutions/:id', diagnosisController.getSolutionsForProblem);

// @route   GET api/diagnosis/common
// @desc    Get common problems
// @access  Public
router.get('/common', diagnosisController.getCommonProblems);

// @route   POST api/diagnosis
// @desc    Create a problem
// @access  Private/Admin
router.post('/', auth, diagnosisController.createProblem);

// @route   PUT api/diagnosis/:id
// @desc    Update a problem
// @access  Private/Admin
router.put('/:id', auth, diagnosisController.updateProblem);

// @route   DELETE api/diagnosis/:id
// @desc    Delete a problem
// @access  Private/Admin
router.delete('/:id', auth, diagnosisController.deleteProblem);

// @route   GET api/diagnosis/seed
// @desc    Seed the database with initial problems
// @access  Public
router.get('/seed', diagnosisController.seedProblems);

module.exports = router;

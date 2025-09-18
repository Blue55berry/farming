const Problem = require('../models/Problem');

// Get problems by plant type
exports.getProblemsByPlant = async (req, res) => {
  try {
    const problems = await Problem.find({
      affectedPlants: req.params.plantType
    }).sort({ severity: -1 });
    
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Analyze symptoms and diagnose problem
exports.diagnosePlantProblem = async (req, res) => {
  const { plantType, symptoms } = req.body;
  
  if (!plantType || !symptoms || symptoms.length === 0) {
    return res.status(400).json({ msg: 'Plant type and symptoms are required' });
  }
  
  try {
    // Find problems that match the plant type and have the most matching symptoms
    const problems = await Problem.find({
      affectedPlants: plantType,
      symptoms: { $in: symptoms }
    });
    
    if (problems.length === 0) {
      return res.status(404).json({ msg: 'No matching problems found' });
    }
    
    // Calculate match score for each problem based on how many symptoms match
    const problemsWithScore = problems.map(problem => {
      const matchingSymptoms = problem.symptoms.filter(s => symptoms.includes(s));
      const score = matchingSymptoms.length / symptoms.length;
      
      return {
        ...problem.toObject(),
        matchScore: score,
        matchingSymptoms
      };
    });
    
    // Sort by match score (descending)
    problemsWithScore.sort((a, b) => b.matchScore - a.matchScore);
    
    // Return the best matches
    res.json(problemsWithScore.slice(0, 3));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get solutions for a specific problem
exports.getSolutionsForProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    
    res.json(problem.solutions);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Get common problems
exports.getCommonProblems = async (req, res) => {
  try {
    const problems = await Problem.find()
      .sort({ severity: -1 })
      .limit(10);
    
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new problem
exports.createProblem = async (req, res) => {
  const {
    name,
    description,
    symptoms,
    affectedPlants,
    severity,
    solutions,
    preventionTips,
    images,
    category
  } = req.body;
  
  try {
    let problem = new Problem({
      name,
      description,
      symptoms,
      affectedPlants,
      severity,
      solutions,
      preventionTips,
      images,
      category
    });
    
    await problem.save();
    
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a problem
exports.updateProblem = async (req, res) => {
  const {
    name,
    description,
    symptoms,
    affectedPlants,
    severity,
    solutions,
    preventionTips,
    images,
    category
  } = req.body;
  
  // Build problem object
  const problemFields = {};
  if (name) problemFields.name = name;
  if (description) problemFields.description = description;
  if (symptoms) problemFields.symptoms = symptoms;
  if (affectedPlants) problemFields.affectedPlants = affectedPlants;
  if (severity) problemFields.severity = severity;
  if (solutions) problemFields.solutions = solutions;
  if (preventionTips) problemFields.preventionTips = preventionTips;
  if (images) problemFields.images = images;
  if (category) problemFields.category = category;
  
  try {
    let problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    
    // Update
    problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { $set: problemFields },
      { new: true }
    );
    
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a problem
exports.deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    
    await problem.remove();
    
    res.json({ msg: 'Problem removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Seed the database with initial problems
exports.seedProblems = async (req, res) => {
  const problems = [
    {
      name: 'Aphids',
      description: 'Small, soft-bodied insects that feed by sucking the nutrient-rich liquids out of plants. They can cause stunted growth, yellowing leaves, and sooty mold.',
      symptoms: ['Yellowing leaves', 'Stunted growth', 'Sticky honeydew on leaves', 'Presence of small insects'],
      affectedPlants: ['Tomatoes', 'Roses', 'Cucumbers', 'Peppers'],
      severity: 'Medium',
      solutions: [
        {
          description: 'Use a strong spray of water to dislodge the aphids from the plants.',
          steps: ['Fill a spray bottle with water.', 'Spray the affected areas of the plant, making sure to get the undersides of the leaves.', 'Repeat every few days as needed.'],
          materials: ['Spray bottle', 'Water'],
          effectiveness: 'Low',
          isOrganic: true
        },
        {
          description: 'Introduce natural predators like ladybugs or lacewings to the garden.',
          steps: ['Purchase ladybugs or lacewings from a garden supply store.', 'Release them in the evening near the affected plants.'],
          materials: ['Ladybugs', 'Lacewings'],
          effectiveness: 'High',
          isOrganic: true
        }
      ],
      preventionTips: [
        {
          description: 'Regularly inspect plants for signs of aphids.',
          difficulty: 'Easy'
        },
        {
          description: 'Encourage natural predators by planting a diverse range of flowers and herbs.',
          difficulty: 'Moderate'
        }
      ],
      images: ['/images/problems/aphids1.jpg', '/images/problems/aphids2.jpg'],
      category: 'Pest'
    }
  ];

  try {
    // Clear existing problems
    await Problem.deleteMany({});
    // Insert new problems
    await Problem.insertMany(problems);
    res.json({ msg: 'Database seeded with initial problems' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

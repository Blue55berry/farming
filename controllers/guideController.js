const Guide = require('../models/Guide');
const Crop = require('../models/Crop');

// Get all guides
exports.getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find()
      .populate('relatedCrops', 'name image')
      .sort({ createdAt: -1 });
    res.json(guides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get guide by ID
exports.getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id)
      .populate('relatedCrops', 'name image category');
    
    if (!guide) {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    
    res.json(guide);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Get guides for a specific crop
exports.getGuidesByCrop = async (req, res) => {
  try {
    const guides = await Guide.find({ relatedCrops: req.params.cropId })
      .populate('relatedCrops', 'name image')
      .sort({ createdAt: -1 });
    res.json(guides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get guides by difficulty
exports.getGuidesByDifficulty = async (req, res) => {
  try {
    const guides = await Guide.find({ difficulty: req.params.difficulty })
      .populate('relatedCrops', 'name image')
      .sort({ createdAt: -1 });
    res.json(guides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get traditional guides
exports.getTraditionalGuides = async (req, res) => {
  try {
    const guides = await Guide.find({ isTraditional: true })
      .populate('relatedCrops', 'name image')
      .sort({ createdAt: -1 });
    res.json(guides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get modern guides
exports.getModernGuides = async (req, res) => {
  try {
    const guides = await Guide.find({ isModern: true })
      .populate('relatedCrops', 'name image')
      .sort({ createdAt: -1 });
    res.json(guides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Search guides
exports.searchGuides = async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ msg: 'Search query is required' });
  }
  
  try {
    const guides = await Guide.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { summary: { $regex: q, $options: 'i' } },
        { 'steps.title': { $regex: q, $options: 'i' } },
        { 'steps.description': { $regex: q, $options: 'i' } }
      ]
    })
      .populate('relatedCrops', 'name image')
      .sort({ createdAt: -1 });
    
    res.json(guides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new guide
exports.createGuide = async (req, res) => {
  const {
    title,
    category,
    difficulty,
    summary,
    steps,
    relatedCrops,
    isTraditional,
    isModern
  } = req.body;
  
  try {
    // Verify that all related crops exist
    if (relatedCrops && relatedCrops.length > 0) {
      for (const cropId of relatedCrops) {
        const cropExists = await Crop.exists({ _id: cropId });
        if (!cropExists) {
          return res.status(400).json({ msg: `Crop with ID ${cropId} does not exist` });
        }
      }
    }
    
    let guide = new Guide({
      title,
      category,
      difficulty,
      summary,
      steps,
      relatedCrops,
      isTraditional,
      isModern
    });
    
    await guide.save();
    
    // Populate related crops before sending response
    guide = await Guide.findById(guide._id)
      .populate('relatedCrops', 'name image');
    
    res.json(guide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a guide
exports.updateGuide = async (req, res) => {
  const {
    title,
    category,
    difficulty,
    summary,
    steps,
    relatedCrops,
    isTraditional,
    isModern
  } = req.body;
  
  // Build guide object
  const guideFields = {};
  if (title) guideFields.title = title;
  if (category) guideFields.category = category;
  if (difficulty) guideFields.difficulty = difficulty;
  if (summary) guideFields.summary = summary;
  if (steps) guideFields.steps = steps;
  if (relatedCrops) guideFields.relatedCrops = relatedCrops;
  if (isTraditional !== undefined) guideFields.isTraditional = isTraditional;
  if (isModern !== undefined) guideFields.isModern = isModern;
  
  try {
    let guide = await Guide.findById(req.params.id);
    
    if (!guide) {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    
    // Verify that all related crops exist
    if (relatedCrops && relatedCrops.length > 0) {
      for (const cropId of relatedCrops) {
        const cropExists = await Crop.exists({ _id: cropId });
        if (!cropExists) {
          return res.status(400).json({ msg: `Crop with ID ${cropId} does not exist` });
        }
      }
    }
    
    // Update
    guide = await Guide.findByIdAndUpdate(
      req.params.id,
      { $set: guideFields },
      { new: true }
    ).populate('relatedCrops', 'name image');
    
    res.json(guide);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a guide
exports.deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    
    if (!guide) {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    
    await guide.remove();
    
    res.json({ msg: 'Guide removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Guide not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Seed the database with initial guides
exports.seedGuides = async (req, res) => {
  const guides = [
    {
      title: 'How to Grow Tomatoes in Your Backyard',
      category: 'Planting',
      difficulty: 'Beginner',
      summary: 'A step-by-step guide for beginners to successfully grow tomatoes at home.',
      steps: [
        {
          order: 1,
          title: 'Choose the Right Location',
          description: 'Tomatoes need at least 6-8 hours of direct sunlight per day. Choose a spot in your garden that gets plenty of sun.'
        },
        {
          order: 2,
          title: 'Prepare the Soil',
          description: 'Tomatoes prefer well-drained, fertile soil. Mix in some compost or other organic matter to enrich the soil.'
        },
        {
          order: 3,
          title: 'Plant the Seedlings',
          description: 'Dig a hole that is deep enough to cover the root ball and about two-thirds of the stem. This encourages strong root growth.'
        },
        {
          order: 4,
          title: 'Water Regularly',
          description: 'Water your tomato plants deeply and regularly, especially during hot, dry weather. Avoid getting the leaves wet to prevent diseases.'
        }
      ],
      isModern: true
    },
    {
      title: 'Advanced Composting Techniques',
      category: 'Soil Management',
      difficulty: 'Advanced',
      summary: 'Learn advanced composting methods to create nutrient-rich soil for your garden.',
      steps: [
        {
          order: 1,
          title: 'Understanding Carbon-to-Nitrogen Ratios',
          description: "Learn the importance of balancing 'brown' (carbon-rich) and 'green' (nitrogen-rich) materials for optimal decomposition."
        },
        {
          order: 2,
          title: 'Hot Composting vs. Cold Composting',
          description: 'Explore the differences between hot and cold composting methods and choose the one that best suits your needs.'
        },
        {
          order: 3,
          title: 'Using Compost Activators',
          description: 'Discover how to use compost activators to speed up the decomposition process.'
        }
      ],
      isModern: true
    }
  ];

  try {
    // Clear existing guides
    await Guide.deleteMany({});
    // Insert new guides
    await Guide.insertMany(guides);
    res.json({ msg: 'Database seeded with initial guides' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

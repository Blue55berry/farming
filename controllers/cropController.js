const Crop = require('../models/Crop');

// Get all crops
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ name: 1 });
    res.json(crops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get crop by ID
exports.getCropById = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    
    if (!crop) {
      return res.status(404).json({ msg: 'Crop not found' });
    }
    
    res.json(crop);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Crop not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Get crops by category
exports.getCropsByCategory = async (req, res) => {
  try {
    const crops = await Crop.find({ category: req.params.category }).sort({ name: 1 });
    res.json(crops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Search crops
exports.searchCrops = async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ msg: 'Search query is required' });
  }
  
  try {
    const crops = await Crop.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { soilType: { $regex: q, $options: 'i' } },
        { seasonalInfo: { $regex: q, $options: 'i' } }
      ]
    }).sort({ name: 1 });
    
    res.json(crops);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new crop
exports.createCrop = async (req, res) => {
  const {
    name,
    category,
    growthPeriod,
    waterRequirements,
    sunlightRequirements,
    soilType,
    plantingDepth,
    spacingNeeds,
    seasonalInfo,
    image,
    description
  } = req.body;
  
  try {
    let crop = new Crop({
      name,
      category,
      growthPeriod,
      waterRequirements,
      sunlightRequirements,
      soilType,
      plantingDepth,
      spacingNeeds,
      seasonalInfo,
      image,
      description
    });
    
    await crop.save();
    
    res.json(crop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a crop
exports.updateCrop = async (req, res) => {
  const {
    name,
    category,
    growthPeriod,
    waterRequirements,
    sunlightRequirements,
    soilType,
    plantingDepth,
    spacingNeeds,
    seasonalInfo,
    image,
    description
  } = req.body;
  
  // Build crop object
  const cropFields = {};
  if (name) cropFields.name = name;
  if (category) cropFields.category = category;
  if (growthPeriod) cropFields.growthPeriod = growthPeriod;
  if (waterRequirements) cropFields.waterRequirements = waterRequirements;
  if (sunlightRequirements) cropFields.sunlightRequirements = sunlightRequirements;
  if (soilType) cropFields.soilType = soilType;
  if (plantingDepth) cropFields.plantingDepth = plantingDepth;
  if (spacingNeeds) cropFields.spacingNeeds = spacingNeeds;
  if (seasonalInfo) cropFields.seasonalInfo = seasonalInfo;
  if (image) cropFields.image = image;
  if (description) cropFields.description = description;
  
  try {
    let crop = await Crop.findById(req.params.id);
    
    if (!crop) {
      return res.status(404).json({ msg: 'Crop not found' });
    }
    
    // Update
    crop = await Crop.findByIdAndUpdate(
      req.params.id,
      { $set: cropFields },
      { new: true }
    );
    
    res.json(crop);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Crop not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a crop
exports.deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    
    if (!crop) {
      return res.status(404).json({ msg: 'Crop not found' });
    }
    
    await crop.remove();
    
    res.json({ msg: 'Crop removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Crop not found' });
    }
    res.status(500).send('Server Error');
  }
};

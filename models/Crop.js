const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Vegetable', 'Fruit', 'Grain', 'Herb', 'Other']
  },
  growthPeriod: {
    type: Number,
    required: true
  },
  waterRequirements: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High']
  },
  sunlightRequirements: {
    type: String,
    required: true,
    enum: ['Full Sun', 'Partial Shade', 'Full Shade']
  },
  soilType: {
    type: String,
    required: true
  },
  plantingDepth: {
    type: String,
    required: true
  },
  spacingNeeds: {
    type: String,
    required: true
  },
  seasonalInfo: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  seedPrice: {
    type: Number,
    required: true,
    default: 10 // Default price for seeds
  },
  seedImage: {
    type: String,
  },
  seedlingImage: {
    type: String,
  },
  youngPlantImage: {
    type: String,
  },
  maturePlantImage: {
    type: String,
  },
  harvestPrice: {
    type: Number,
    required: true,
    default: 50 // Default harvest price
  }
}, { timestamps: true });

module.exports = mongoose.model('Crop', CropSchema);

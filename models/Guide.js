const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  video: {
    type: String
  }
});

const GuideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Planting', 'Growing', 'Harvesting', 'Pest Control', 'Soil Management']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  summary: {
    type: String,
    required: true
  },
  steps: [StepSchema],
  relatedCrops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop'
  }],
  isTraditional: {
    type: Boolean,
    default: false
  },
  isModern: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Guide', GuideSchema);

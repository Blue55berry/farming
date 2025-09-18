const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  steps: [String],
  materials: [String],
  effectiveness: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  isOrganic: {
    type: Boolean,
    default: false
  }
});

const PreventionTipSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Difficult'],
    default: 'Moderate'
  }
});

const ProblemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  symptoms: [{
    type: String,
    required: true
  }],
  affectedPlants: [{
    type: String,
    required: true
  }],
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  solutions: [SolutionSchema],
  preventionTips: [PreventionTipSchema],
  images: [String],
  category: {
    type: String,
    enum: ['Pest', 'Disease', 'Nutrient Deficiency', 'Environmental'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);

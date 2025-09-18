const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  coins: {
    type: Number,
    default: 0
  },
  coinHistory: [
    {
      amount: {
        type: Number,
        required: true,
      },
      source: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  userCrops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
    },
  ],
  savedItems: [{
    itemType: {
      type: String,
      enum: ['crop', 'guide', 'diagnosis'],
      required: true
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'savedItems.itemType'
    },
    savedAt: {
      type: Date,
      default: Date.now
    }
  }],
  progress: [{
    moduleId: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    percentComplete: {
      type: Number,
      default: 0
    },
    lastAccessed: {
      type: Date,
      default: Date.now
    }
  }],
  quizResults: [{
    quizId: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    maxScore: {
      type: Number,
      required: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  }],
  landPlots: [
    {
      plotNumber: { type: Number, required: true },
      isPlanted: { type: Boolean, default: false },
      cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', default: null },
      plantingTime: { type: Date, default: null },
      growthStage: { type: Number, default: 0 }, // 0-100
    },
    {
      plotNumber: { type: Number, required: true },
      isPlanted: { type: Boolean, default: false },
      cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', default: null },
      plantingTime: { type: Date, default: null },
      growthStage: { type: Number, default: 0 },
    },
    {
      plotNumber: { type: Number, required: true },
      isPlanted: { type: Boolean, default: false },
      cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', default: null },
      plantingTime: { type: Date, default: null },
      growthStage: { type: Number, default: 0 },
    },
  ],
  inventory: [
    {
      cropId: { type: mongoose.Schema.Types.ObjectId, ref: 'Crop', required: true },
      quantity: { type: Number, default: 0 },
    },
  ]
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

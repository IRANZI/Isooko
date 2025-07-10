const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  achievementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true
  },
  isUnlocked: {
    type: Boolean,
    default: false
  },
  unlockDate: {
    type: Date,
    default: null
  },
  progress: {
    current: {
      type: Number,
      default: 0
    },
    target: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    }
  },
  pointsEarned: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Compound index to ensure unique user-achievement pairs
userAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

// Index for queries
userAchievementSchema.index({ userId: 1, isUnlocked: 1 });
userAchievementSchema.index({ achievementId: 1, isUnlocked: 1 });

// Virtual for progress percentage
userAchievementSchema.virtual('progressPercentage').get(function() {
  if (this.progress.target === 0) return 0;
  return Math.min(100, Math.round((this.progress.current / this.progress.target) * 100));
});

// Method to update progress
userAchievementSchema.methods.updateProgress = function(currentValue) {
  this.progress.current = currentValue;
  this.progress.percentage = this.progressPercentage;
  
  // Check if achievement should be unlocked
  if (this.progress.current >= this.progress.target && !this.isUnlocked) {
    this.isUnlocked = true;
    this.unlockDate = new Date();
    this.pointsEarned = this.achievementId.points || 0;
  }
  
  return this.save();
};

// Method to unlock achievement
userAchievementSchema.methods.unlock = function() {
  this.isUnlocked = true;
  this.unlockDate = new Date();
  this.progress.current = this.progress.target;
  this.progress.percentage = 100;
  this.pointsEarned = this.achievementId.points || 0;
  return this.save();
};

module.exports = mongoose.model('UserAchievement', userAchievementSchema); 
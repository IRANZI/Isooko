const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Achievement title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Achievement description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  icon: {
    type: String,
    required: [true, 'Achievement icon is required']
  },
  category: {
    type: String,
    enum: ['water_quality', 'conservation', 'community', 'exploration', 'expertise'],
    required: [true, 'Achievement category is required']
  },
  criteria: {
    type: {
      type: String,
      enum: ['readings_count', 'streak_days', 'sources_visited', 'quality_score', 'community_contributions'],
      required: [true, 'Criteria type is required']
    },
    value: {
      type: Number,
      required: [true, 'Criteria value is required'],
      min: [1, 'Criteria value must be at least 1']
    },
    description: {
      type: String,
      required: [true, 'Criteria description is required']
    }
  },
  points: {
    type: Number,
    required: [true, 'Achievement points are required'],
    min: [1, 'Points must be at least 1'],
    max: [1000, 'Points cannot exceed 1000']
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  unlockDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
achievementSchema.index({ category: 1 });
achievementSchema.index({ rarity: 1 });
achievementSchema.index({ isActive: 1 });

// Virtual for achievement display
achievementSchema.virtual('displayInfo').get(function() {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    icon: this.icon,
    category: this.category,
    points: this.points,
    rarity: this.rarity,
    criteria: this.criteria
  };
});

module.exports = mongoose.model('Achievement', achievementSchema); 
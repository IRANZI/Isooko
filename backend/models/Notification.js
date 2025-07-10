const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['achievement', 'water_quality', 'system', 'reminder', 'community'],
    required: [true, 'Notification type is required']
  },
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  data: {
    // Additional data for the notification (achievement ID, water quality ID, etc.)
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  scheduledFor: {
    type: Date,
    default: null
  },
  sentAt: {
    type: Date,
    default: Date.now
  },
  readAt: {
    type: Date,
    default: null
  },
  actionUrl: {
    type: String,
    default: null
  },
  actionText: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Indexes
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ priority: 1 });
notificationSchema.index({ scheduledFor: 1 });

// Virtual for time ago
notificationSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diffInSeconds = Math.floor((now - this.sentAt) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
});

// Method to mark as read
notificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  this.readAt = new Date();
  return this.save();
};

// Method to archive
notificationSchema.methods.archive = function() {
  this.isArchived = true;
  return this.save();
};

// Static method to create achievement notification
notificationSchema.statics.createAchievementNotification = function(userId, achievement) {
  return this.create({
    userId,
    type: 'achievement',
    title: 'Achievement Unlocked! 🏆',
    message: `Congratulations! You've unlocked "${achievement.title}"`,
    data: { achievementId: achievement._id },
    priority: 'high',
    actionUrl: `/achievements/${achievement._id}`,
    actionText: 'View Achievement'
  });
};

// Static method to create water quality notification
notificationSchema.statics.createWaterQualityNotification = function(userId, waterQuality) {
  const qualityLevel = waterQuality.qualityLevel;
  let title, message, priority;
  
  switch (qualityLevel) {
    case 'excellent':
      title = 'Excellent Water Quality! 💧';
      message = 'Great news! Your water source has excellent quality.';
      priority = 'medium';
      break;
    case 'good':
      title = 'Good Water Quality 💧';
      message = 'Your water source has good quality. Keep monitoring!';
      priority = 'low';
      break;
    case 'fair':
      title = 'Fair Water Quality ⚠️';
      message = 'Your water source has fair quality. Consider additional testing.';
      priority = 'medium';
      break;
    case 'poor':
      title = 'Poor Water Quality 🚨';
      message = 'Your water source has poor quality. Immediate attention needed.';
      priority = 'high';
      break;
    case 'very_poor':
      title = 'Very Poor Water Quality 🚨';
      message = 'Your water source has very poor quality. Do not consume!';
      priority = 'urgent';
      break;
  }
  
  return this.create({
    userId,
    type: 'water_quality',
    title,
    message,
    data: { waterQualityId: waterQuality._id, qualityLevel },
    priority,
    actionUrl: `/water-quality/${waterQuality._id}`,
    actionText: 'View Details'
  });
};

module.exports = mongoose.model('Notification', notificationSchema); 
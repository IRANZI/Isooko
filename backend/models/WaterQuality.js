const mongoose = require('mongoose');

const waterQualitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  waterSourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WaterSource',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String,
    city: String,
    country: String
  },
  measurements: {
    temperature: {
      value: { type: Number, required: true },
      unit: { type: String, default: 'celsius' }
    },
    pH: {
      value: { type: Number, required: true, min: 0, max: 14 },
      unit: { type: String, default: 'pH' }
    },
    turbidity: {
      value: { type: Number, min: 0 },
      unit: { type: String, default: 'NTU' }
    },
    dissolvedOxygen: {
      value: { type: Number, min: 0 },
      unit: { type: String, default: 'mg/L' }
    }
  },
  qualityScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  qualityLevel: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'very_poor'],
    required: true
  },
  qualityColor: {
    type: String,
    enum: ['green', 'blue', 'yellow', 'orange', 'red'],
    required: true
  },
  readingMethod: {
    type: String,
    enum: ['manual', 'sensor', 'lab_test'],
    default: 'manual'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  images: [{
    url: String,
    caption: String,
    uploadedAt: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Indexes
waterQualitySchema.index({ location: '2dsphere' });
waterQualitySchema.index({ userId: 1, createdAt: -1 });
waterQualitySchema.index({ qualityLevel: 1 });

// Calculate quality score
waterQualitySchema.methods.calculateQualityScore = function() {
  let score = 0;
  let totalParameters = 0;
  
  if (this.measurements.pH && this.measurements.pH.value) {
    const ph = this.measurements.pH.value;
    if (ph >= 6.5 && ph <= 8.5) score += 25;
    else if (ph >= 6.0 && ph <= 9.0) score += 20;
    else if (ph >= 5.5 && ph <= 9.5) score += 15;
    else score += 10;
    totalParameters++;
  }
  
  if (this.measurements.temperature && this.measurements.temperature.value) {
    const temp = this.measurements.temperature.value;
    if (temp >= 10 && temp <= 25) score += 25;
    else if (temp >= 5 && temp <= 30) score += 20;
    else if (temp >= 0 && temp <= 35) score += 15;
    else score += 10;
    totalParameters++;
  }
  
  if (this.measurements.turbidity && this.measurements.turbidity.value) {
    const turbidity = this.measurements.turbidity.value;
    if (turbidity <= 1) score += 25;
    else if (turbidity <= 5) score += 20;
    else if (turbidity <= 10) score += 15;
    else score += 10;
    totalParameters++;
  }
  
  if (this.measurements.dissolvedOxygen && this.measurements.dissolvedOxygen.value) {
    const do2 = this.measurements.dissolvedOxygen.value;
    if (do2 >= 8) score += 25;
    else if (do2 >= 6) score += 20;
    else if (do2 >= 4) score += 15;
    else score += 10;
    totalParameters++;
  }
  
  this.qualityScore = totalParameters > 0 ? Math.round(score / totalParameters) : 0;
  
  if (this.qualityScore >= 80) {
    this.qualityLevel = 'excellent';
    this.qualityColor = 'green';
  } else if (this.qualityScore >= 60) {
    this.qualityLevel = 'good';
    this.qualityColor = 'blue';
  } else if (this.qualityScore >= 40) {
    this.qualityLevel = 'fair';
    this.qualityColor = 'yellow';
  } else if (this.qualityScore >= 20) {
    this.qualityLevel = 'poor';
    this.qualityColor = 'orange';
  } else {
    this.qualityLevel = 'very_poor';
    this.qualityColor = 'red';
  }
  
  return this.qualityScore;
};

module.exports = mongoose.model('WaterQuality', waterQualitySchema); 
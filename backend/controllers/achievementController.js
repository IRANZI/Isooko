const Achievement = require('../models/Achievement');

// Create a new achievement
exports.create = async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body);
    res.status(201).json(achievement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all achievements
exports.getAll = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single achievement by ID
exports.getById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) return res.status(404).json({ error: 'Not found' });
    res.json(achievement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an achievement
exports.update = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!achievement) return res.status(404).json({ error: 'Not found' });
    res.json(achievement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an achievement
exports.delete = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 
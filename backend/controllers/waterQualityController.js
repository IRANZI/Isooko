const WaterQuality = require('../models/WaterQuality');

// Create a new water quality record
exports.create = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.id;
    const record = await WaterQuality.create(data);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all water quality records (optionally filter by user)
exports.getAll = async (req, res) => {
  try {
    const filter = req.query.userId ? { userId: req.query.userId } : {};
    const records = await WaterQuality.find(filter).sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single water quality record by ID
exports.getById = async (req, res) => {
  try {
    const record = await WaterQuality.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a water quality record (only owner)
exports.update = async (req, res) => {
  try {
    const record = await WaterQuality.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Not found' });
    if (record.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    Object.assign(record, req.body);
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a water quality record (only owner)
exports.delete = async (req, res) => {
  try {
    const record = await WaterQuality.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Not found' });
    if (record.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await record.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 
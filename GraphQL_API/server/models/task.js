const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  description: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  // Add other fields if necessary
});

module.exports = mongoose.model('Task', taskSchema);

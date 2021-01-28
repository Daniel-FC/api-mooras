const moogose = require('../../database');

const TaskSchema = new moogose.Schema({
  title: {
    type: String,
    require: true
  },
  project: {
    type: moogose.Schema.Types.ObjectId,
    ref: 'Project',
    require: true
  },
  assignedTo: {
    type: moogose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = moogose.model('Task', TaskSchema);

module.exports = Task;

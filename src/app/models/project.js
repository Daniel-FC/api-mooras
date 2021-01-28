const moogose = require('../../database');

const ProjectSchema = new moogose.Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  user: {
    type: moogose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  tasks: [{
    type: moogose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  completed: {
    type: Boolean,
    require: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = moogose.model('Project', ProjectSchema);

module.exports = Project;

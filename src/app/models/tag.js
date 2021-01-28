const moogose = require('../../database');

const TagSchema = new moogose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  user: {
    type: moogose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
});

const Tag = moogose.model('Tag', TagSchema);

module.exports = Tag;

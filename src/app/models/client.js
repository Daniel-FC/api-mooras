const moogose = require('../../database');

const ClientSchema = new moogose.Schema({
  name: {
    type: String,
    require: true
  },
  user: {
    type: moogose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  value: {
    type: String,
    require: true   
  },
  tags: [{
    type: String
  }],
  phone: {
    type: String
  },
  adress: {
    type: String
  },
  birth: {
    type: Date
  }
});

const Client = moogose.model('Client', ClientSchema);

module.exports = Client;

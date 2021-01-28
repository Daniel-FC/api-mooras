const moogose = require('mongoose');

moogose.connect('mongodb://localhost/noderest', { useMongoClient: true });
moogose.Promise = global.Promise;

module.exports = moogose;

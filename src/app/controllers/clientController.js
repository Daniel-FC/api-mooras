const express = require('express');
const authMiddlewares = require('../middlewares/auth');

const Client = require('../models/Client');

const router = express.Router();

router.use(authMiddlewares);

router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().populate('user');

    return res.send({ clients });
  } catch(err) {
    return res.status(400).send({ error: 'Error loading clients' });
  }
});

router.get('/:clientId', async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId).populate('user');

    return res.send({ client });
  } catch(err) {
    return res.status(400).send({ error: 'Error loading client' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, value, tags, phone, adress, birth } = req.body;

    const client = await Client.create({ name, value, tags, phone, adress, birth,  user: req.userId });

    return res.send({ client });
  } catch(err) {
    return res.status(400).send({ error: 'Error creating new client' });
  }
});

router.put('/:clientId', async (req, res) => {
  try {
    const { name, value, tags, phone, adress, birth } = req.body;

    const client = await Client.findByIdAndUpdate(req.params.clientId, { name, value, tags, phone, adress, birth,  user: req.userId }, { new: true });

    return res.send({ client });
  } catch(err) {
    return res.status(400).send({ error: 'Error updating client' });
  }
});

router.delete('/:clientId', async (req, res) => {
  try {
    await Client.findByIdAndRemove(req.params.clientId);

    return res.send();
  } catch(err) {
    return res.status(400).send({ error: 'Error deleting client' });
  }
});

module.exports = app => app.use('/clients', router);

const express = require('express');
const authMiddlewares = require('../middlewares/auth');

const Tag = require('../models/Tag');

const router = express.Router();

router.use(authMiddlewares);

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find().populate('user');

    return res.send({ tags });
  } catch(err) {
    return res.status(400).send({ error: 'Error loading tags' });
  }
});

router.get('/:tagId', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.tagId).populate('user');

    return res.send({ tag });
  } catch(err) {
    return res.status(400).send({ error: 'Error loading tag' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    if(await Tag.findOne({ name }))
      return res.status(400).send({ error: 'Tag already exists'})   

    const tag = await Tag.create({ name, user: req.userId });

    return res.send({ tag });
  } catch(err) {
    return res.status(400).send({ error: 'Error creating new tag' });
  }
});

router.put('/:tagId', async (req, res) => {
  try {
    const { name } = req.body;

    const tag = await Tag.findByIdAndUpdate(req.params.tagId, { name }, { new: true });

    return res.send({ tag });
  } catch(err) {
    return res.status(400).send({ error: 'Error updating tag' });
  }
});

router.delete('/:tagId', async (req, res) => {
  try {
    await Tag.findByIdAndRemove(req.params.tagId);

    return res.send();
  } catch(err) {
    return res.status(400).send({ error: 'Error deleting tag' });
  }
});

module.exports = app => app.use('/tags', router);

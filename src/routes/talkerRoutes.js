const express = require('express');
const talker = require('../utils/talker');
const validateTalkers = require('../middlewares/validateTalkes');
const validateTalker = require('../middlewares/validateTalker');

const router = express.Router();

router.get('/', validateTalkers, async (_req, res) => {
  const talkers = await talker.readTalkerFile();
  res.status(200).json(talkers);
});

router.get('/:id', validateTalker, async (req, res) => {
  const { id } = req.params;
  const talkerById = await talker.talkerById(id);
  res.status(200).json(talkerById);
});

module.exports = router;
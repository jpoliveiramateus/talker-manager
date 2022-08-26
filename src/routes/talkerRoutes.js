const express = require('express');
const talker = require('../utils/talker');
const validateTalkers = require('../middlewares/validateTalkes');

const router = express.Router();

router.get('/', validateTalkers, async (_req, res) => {
  const talkers = await talker.readTalkerFile();
  res.status(200).json(talkers);
});

module.exports = router;
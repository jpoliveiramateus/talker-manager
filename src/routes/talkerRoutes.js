const express = require('express');
const talker = require('../utils/talker');

const validateTalkers = require('../middlewares/validateTalkes');
const validateTalker = require('../middlewares/validateTalker');

const auth = require('../middlewares/auth');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAtAndRate = require('../middlewares/validateWatchedAtAndRate');

const router = express.Router();

router.get('/', validateTalkers, async (_req, res) => {
  const talkers = await talker.readTalkerFile();
  res.status(200).json(talkers);
});

router.post('/', auth, validateName, validateAge,
  validateTalk, validateWatchedAtAndRate, async (req, res) => {
  const insertTalker = await talker.insertTalkerFile(req.body);
  res.status(201).json(insertTalker);
});

router.get('/:id', validateTalker, async (req, res) => {
  const { id } = req.params;
  const talkerById = await talker.talkerById(id);
  res.status(200).json(talkerById);
});

router.put('/:id', auth, validateName, validateAge,
validateTalk, validateWatchedAtAndRate, async (req, res) => {
  const { id } = req.params;
  const editedTalkerById = await talker.editTalkerById(id, req.body);
  res.status(!editedTalkerById ? 404 : 200)
    .json(!editedTalkerById ? { message: 'Id não encontrado!' } : editedTalkerById);
});

module.exports = router;
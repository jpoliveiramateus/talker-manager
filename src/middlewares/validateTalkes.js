const talker = require('../utils/talker');

const validateTalkers = async (_req, res, next) => {
  const talkers = await talker.readTalkerFile();
  if (talkers.length === 0) {
    return res.status(200).json([]);
  }
  next();
};

module.exports = validateTalkers;
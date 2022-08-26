const talker = require('../utils/talker');

const validateTalker = async (req, res, next) => {
  const { id } = req.params;
  const talkerById = await talker.talkerById(id);
  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  next();
};

module.exports = validateTalker;
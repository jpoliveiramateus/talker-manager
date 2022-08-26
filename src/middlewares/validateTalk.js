const validateTalk = (req, res, next) => {
  if (!('talk' in req.body)) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }

  if (!('watchedAt' in req.body.talk)) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!('rate' in req.body.talk)) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  next();
};

module.exports = validateTalk;
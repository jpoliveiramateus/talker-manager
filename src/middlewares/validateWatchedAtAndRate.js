const validateWatchedAtAndRate = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;

  const validateDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!validateDate.test(watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!Number.isInteger(rate) || rate > 5 || rate < 1) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = validateWatchedAtAndRate;
const validateAge = (req, res, next) => {
  if (!('age' in req.body)) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }

  if (Number(req.body.age) < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

module.exports = validateAge;
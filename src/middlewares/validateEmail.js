const validateEmail = (req, res, next) => {
  if (!('email' in req.body)) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
  const emailValidate = /\S+@\S+\.\S+/;
  if (!emailValidate.test(req.body.email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = validateEmail;
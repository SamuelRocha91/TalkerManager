const HTTP_BAD_REQUEST = 400;

const validEmail = (req, res, next) => {
    const { email } = req.body;
    const validateEmail = /\S+@\S+\.\S+/;
    if (!email) { 
      return res.status(HTTP_BAD_REQUEST).json({
      message: 'O campo "email" é obrigatório',
    });
  }
    if (!validateEmail.test(email)) {
      return res.status(HTTP_BAD_REQUEST).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
    next();
};

const validPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) { 
      return res.status(HTTP_BAD_REQUEST).json({
        message: 'O campo "password" é obrigatório',
      });
  }
  if (password.length < 6) { 
    return res.status(HTTP_BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

module.exports = {
    validEmail,
    validPassword,
};
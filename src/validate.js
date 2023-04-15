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

const validToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (typeof authorization !== 'string' || authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

const validName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
          message: 'O campo "name" é obrigatório',
        });
      }
      if (name.length < 3) {
        return res.status(400).json({
          message: 'O "name" deve ter pelo menos 3 caracteres',
        });
      }
      next();
};

const validAge = (req, res, next) => {
    const { age } = req.body;
    if (!age || age.length === 0) {
        return res.status(400).json({
          message: 'O campo "age" é obrigatório',
        });
      }
      if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json({
          message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
        });
      }
      next();
    };

    const valideTalk = (req, res, next) => {
        const { talk } = req.body;
        if (!talk) {
            return res.status(400).json({ message: 'O campo "talk" é obrigatório',
            });
          }
          next();
    };

    const valideRate = (req, res, next) => {
        const { talk } = req.body;
        const { rate } = talk;
        if (rate === undefined || rate.length === 0) {
            return res.status(400).json({ message: 'O campo "rate" é obrigatório',
            });
          }
        if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
            return res.status(400).json({
              message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
            });
          }
          next();
    };

  const valideWatched = (req, res, next) => {
    const { talk } = req.body;
    const { watchedAt } = talk;
    
      if (!watchedAt) {
        return res.status(400).json({
          message: 'O campo "watchedAt" é obrigatório',
        });
      }
    
      const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    
      if (!isFormatDate.test(watchedAt)) {
        return res.status(400).json(
          { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
        );
      }
      next();
};

module.exports = {
    validEmail,
    validPassword,
    validToken,
    validName,
    validAge,
    valideTalk,
    valideWatched,
    valideRate,
};
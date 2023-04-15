const { findAllJson } = require('./readAndWriteFileSync');

const HTTP_OK_STATUS = 200;

const nullQuery = async (req, res, next) => {
    const { q, rate } = req.query;
    const data = await findAllJson();
  if (!q && !rate) {
    return res.status(200).json(data);
  }
  next();
};

const justQueryQ = async (req, res, next) => {
    const { q, rate } = req.query;
    const data = await findAllJson();
if (q && !rate) {
    const searchTerm = data.filter(({ name }) => name.includes(q));
    return res.status(HTTP_OK_STATUS).json(searchTerm || []);
  }
  next();
};

const validateQueryRate = (req, res, next) => {
    const { rate } = req.query;
    const num = Number(rate);
if (Number(rate) < 1 || Number(rate) > 5 || Number.isNaN(rate) || !Number.isInteger(num)) {
  return res.status(400).json({
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  });
  }
  next();
};

const justQueryRate = async (req, res, next) => {
    const { q, rate } = req.query;
  const data = await findAllJson();

  if (!q && rate) {
    const searchTerm = data.filter(({ talk }) => talk.rate === Number(rate));
    return res.status(HTTP_OK_STATUS).json(searchTerm || []);
  }
  next();
};

module.exports = {
    nullQuery,
    justQueryQ,
    validateQueryRate,
    justQueryRate,
};

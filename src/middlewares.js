const { findAllJson } = require('./readAndWriteFileSync');

const HTTP_OK_STATUS = 200;

const nullQuery = async (req, res, next) => {
    const { q, rate, date } = req.query;
    const data = await findAllJson();
  if (!q && !rate && !date) {
    return res.status(200).json(data);
  }
  next();
};

const justQueryQ = async (req, res, next) => {
    const { q, rate, date } = req.query;
    const data = await findAllJson();
if (q && !rate && !date) {
    const searchTerm = data.filter(({ name }) => name.includes(q));
    return res.status(HTTP_OK_STATUS).json(searchTerm || []);
  }
  next();
};

const validateQueryRate = (rate, res) => {
    const num = Number(rate);
if (Number(rate) < 1 || Number(rate) > 5 || Number.isNaN(rate) || !Number.isInteger(num)) {
  return res.status(400).json({
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  });
  }
};

const justQueryRate = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const data = await findAllJson();
  if (!q && rate && !date) {
    validateQueryRate(rate, res);
    const searchTerm = data.filter(({ talk }) => talk.rate === Number(rate));
    return res.status(HTTP_OK_STATUS).json(searchTerm || []);
  }
  next();
};

const validateData = async (req, res, next) => {
    const { date } = req.query;
    const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
    if (date && !isFormatDate.test(date)) {
        return res.status(400).json(
          { message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' },
        );
      } 
      next();
};

const justQueryDate = async (req, res, next) => {
    const { date, rate, q } = req.query;
    const data = await findAllJson();
    if (date && !rate && !q) {
            const searchTerm = data.filter(({ talk }) => talk.watchedAt === date);
            return res.status(HTTP_OK_STATUS).json(searchTerm || []);
    }
    next();
};

const qAndDate = async (req, res, next) => {
    const { q, date, rate } = req.query;
    const data = await findAllJson();
    if (date && q && !rate) {
      const searchTerm = data.filter(({ talk: { watchedAt }, name }) =>
      watchedAt === date && name.includes(q));
      return res.status(HTTP_OK_STATUS).json(searchTerm || []);
    }
    next();
};

const rateAndDate = async (req, res, next) => {
    const { date, rate, q } = req.query;
    const data = await findAllJson();
    if (rate && date && !q) {
      const searchTerm = data.filter(({ talk }) => talk.rate === Number(rate)
      && talk.watchedAt === date);
      return res.status(HTTP_OK_STATUS).json(searchTerm);
    }
    next();
};

const qAndRate = async (req, res, next) => {
    const { q, rate, date } = req.query;
    const data = await findAllJson();
    if (q && rate && !date) {
      const searchTerm = data.filter(({ talk, name }) => talk.rate === Number(rate)
      && name.includes(q));
      return res.status(HTTP_OK_STATUS).json(searchTerm);
    }
    next();
};

module.exports = {
    nullQuery,
    justQueryQ,
    validateQueryRate,
    justQueryRate,
    justQueryDate,
    validateData,
    qAndRate,
    rateAndDate,
    qAndDate,
};

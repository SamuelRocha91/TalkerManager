const express = require('express');
const findAllJson = require('./readFileSync');
const randomToken = require('./cripto');

randomToken();
const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const data = await findAllJson();
  if (!data) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await findAllJson();
  const talkerId = data.find((element) => element.id === Number(id));
  if (!talkerId) {
    return res.status(HTTP_NOT_FOUND).json({
    message: 'Pessoa palestrante não encontrada',
  });
}
  res.status(HTTP_OK_STATUS).json(talkerId);
});

app.post('/login', async (req, res) => {
  const token = randomToken();
  res.status(HTTP_OK_STATUS).json({ token });
});
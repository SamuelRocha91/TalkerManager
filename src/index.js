const express = require('express');
const { findAllJson, writeInJson, findByIdJson, deletePerson } = require('./readAndWriteFileSync');
const randomToken = require('./cripto');
const { 
  valideRate1,
  valideRate2,
  validEmail,
  validPassword,
  validToken,
  validName,
  validAge,
  valideTalk,
  valideWatched } = require('./validate');
const { nullQuery, justQueryQ, validateQueryRate, justQueryRate } = require('./middlewares');

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

app.get('/talker/search', validToken, nullQuery,
justQueryQ, validateQueryRate, justQueryRate, async (req, res) => {
  const { q, rate } = req.query;
  const data = await findAllJson();

  if (q && rate) {
    const searchTerm = data.filter(({ talk, name }) => talk.rate === Number(rate)
    && name.includes(q));
    return res.status(HTTP_OK_STATUS).json(searchTerm);
  }
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

app.post('/login', validEmail, validPassword, async (req, res) => {
  const token = randomToken();
  res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', validToken, validName, validAge, valideTalk,
valideWatched, valideRate1, valideRate2, async (req, res) => {
  const { name, age, talk } = req.body;

  const addPerson = await writeInJson({
    name, age, talk,
  });
  res.status(201).json(addPerson);
});

app.put('/talker/:id', validToken, validName,
validAge, valideTalk, valideWatched, valideRate1, valideRate2, async (req, res) => {
  const { id } = req.params;
  const number = Number(id);
  const person = await findByIdJson(number, req.body);
  res.status(person.status).json(person.object);
});

app.delete('/talker/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const number = Number(id);
  await deletePerson(number);
  res.sendStatus(204);
});

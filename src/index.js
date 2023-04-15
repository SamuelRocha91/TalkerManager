const express = require('express');
const findAllJson = require('./readFileSync');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
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
  if(!data) return  res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(data);
});

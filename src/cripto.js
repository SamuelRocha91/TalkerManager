const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}
// conforme aprendizado na resolução de exercícios do módulo 4.4 de backend
module.exports = generateToken;
const fs = require('fs').promises;
const path = require('path');

async function findAllJson() {
    const data = await fs.readFile(path.resolve(__dirname, './talker.json'), 'utf-8');
    return JSON.parse(data);
}

module.exports = findAllJson;

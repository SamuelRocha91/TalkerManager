const fs = require('fs').promises;
const path = require('path');

async function findAllJson() {
    const data = await fs.readFile(path.resolve(__dirname, './talker.json'), 'utf-8');
    return JSON.parse(data);
}

async function writeInJson(newPerson) {
    const data = await findAllJson();
    const newdata = {
        id: data.length + 1,
        ...newPerson,
    };
    data.push(newdata);
    await fs.writeFile(path.resolve(__dirname, './talker.json'), JSON.stringify(data));
    return newdata;
}

module.exports = {
    findAllJson,
    writeInJson,
};

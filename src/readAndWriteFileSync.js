const fs = require('fs').promises;
const path = require('path');

async function findAllJson() {
    const data = await fs.readFile(path.resolve(__dirname, './talker.json'), 'utf-8');
    return JSON.parse(data);
}

async function findByIdJson(number, param) {
    const data = await fs.readFile(path.resolve(__dirname, './talker.json'), 'utf-8');
    const convertData = JSON.parse(data);
    const findPerson = convertData.find((info) => info.id === number);
    if (findPerson === undefined) {
        const result = { status: 404,
            object: { message: 'Pessoa palestrante não encontrada' },
        };
        return result;
    }
    const index = convertData.indexOf(findPerson);
    const newPerson = { id: index + 1, ...param };
    convertData.splice(index, 1, newPerson);
    await fs.writeFile(path.resolve(__dirname, './talker.json'), JSON.stringify(convertData));
    const result = {
        status: 200,
        object: newPerson,
    };
    return result;
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
    findByIdJson,
    writeInJson,
};

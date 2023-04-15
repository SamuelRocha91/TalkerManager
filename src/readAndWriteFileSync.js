const fs = require('fs').promises;
const path = require('path');

const pathName = './talker.json';

async function findAllJson() {
    const data = await fs.readFile(path.resolve(__dirname, pathName), 'utf-8');
    return JSON.parse(data);
}

async function findByIdJson(number, param) {
    const data = await fs.readFile(path.resolve(__dirname, pathName), 'utf-8');
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
    await fs.writeFile(path.resolve(__dirname, pathName), JSON.stringify(convertData));
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
    await fs.writeFile(path.resolve(__dirname, pathName), JSON.stringify(data));
    return newdata;
}

async function deletePerson(number) {
    const data = await findAllJson();
    const findData = data.find((convert) => convert.id === number);
    const index = data.indexOf(findData);
    data.splice(index, 1);
    await fs.writeFile(path.resolve(__dirname, pathName), JSON.stringify(data));
}

module.exports = {
    findAllJson,
    findByIdJson,
    writeInJson,
    deletePerson,
};

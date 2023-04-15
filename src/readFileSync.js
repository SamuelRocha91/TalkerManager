const fs = require('fs').promises;
const path = require('path')

async function readJson() {
    try {
    const data = await fs.readFile(path.resolve(__dirname, './talker.json'), 'utf-8')
    console.log(data)
    return JSON.parse(data)
    } catch(error) {
        console.log(error)
    }
}

module.exports = readJson;
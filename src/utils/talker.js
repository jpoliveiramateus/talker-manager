const fs = require('fs').promises;
const { join } = require('path');

const readTalkerFile = async () => {
  const path = '../talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return console.error('Erro ao ler arquivo:', error.path);
  }
};

const talkerById = async (id) => {
  const talkers = await readTalkerFile();
  let talker;

  talkers.forEach((tal) => {
    if (tal.id === Number(id)) {
      talker = tal;
    }
  });
  
  return talker;
};

module.exports = {
  readTalkerFile,
  talkerById,
};
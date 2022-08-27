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

const writeTalkerFile = async (content) => {
  const path = '../talker.json';
  try {
    await fs.writeFile(join(__dirname, path), JSON.stringify(content));
  } catch (error) {
    return console.error('Erro ao escrever arquivo:', error.path);
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

const insertTalkerFile = async (talker) => {
  const talkers = await readTalkerFile();
  const id = talkers.length + 1;
  const insertTalker = {
    id,
    ...talker,
  };
  talkers.push(insertTalker);
  await writeTalkerFile(talkers);
  return insertTalker;
};

const editTalkerById = async (id, talker) => {
  const talkers = await readTalkerFile();

  const findTalker = talkers.find((tal) => tal.id === Number(id));
  findTalker.name = talker.name;
  findTalker.age = talker.age;
  findTalker.talk = talker.talk;

  if (findTalker) {
    await writeTalkerFile(talkers);
    return findTalker;
  }

  return null;
};

const removeTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  const findTalker = talkers.find((tal) => tal.id === Number(id));

  if (findTalker) {
    const talkersFiltered = talkers.filter((tal) => tal.id !== Number(id));
    await writeTalkerFile(talkersFiltered);
    return true;
  }

  return false;
};

const searchByQuery = async (query) => {
  const talkers = await readTalkerFile();
  if (query) {
    const talkersFiltered = talkers
      .filter((tal) => tal.name.toLowerCase().includes(query.toLowerCase()));
    if (talkersFiltered.length > 0) {
      return talkersFiltered;
    }
    return [];
  }

  return talkers;
};

module.exports = {
  readTalkerFile,
  talkerById,
  insertTalkerFile,
  editTalkerById,
  removeTalkerById,
  searchByQuery,
};
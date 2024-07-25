const fs = require('fs');
const configFilePath = './config.json';

function readApiKey() {
  try {
    const configFileContent = fs.readFileSync(configFilePath, 'utf8');
    const config = JSON.parse(configFileContent);
    return config.apiKey;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Error: Groq token not set yet');
      console.log(`Please use "yt-short config --apiKey <grow_api_key>"`);
      process.exit(1);
    } else {
      throw error;
    }
  }
}

function saveApiKey(apiKey) {
  let config = {};
  try {
    const configFileContent = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(configFileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Config file (${configFilePath}) not found, creating new one...`);
    } else {
      throw error;
    }
  }

  config.apiKey = apiKey;
  const configFileContent = JSON.stringify(config, null, 2);
  fs.writeFileSync(configFilePath, configFileContent);
}

function readDefaultLanguage() {
  try {
    const configFileContent = fs.readFileSync(configFilePath, 'utf8');
    const config = JSON.parse(configFileContent);
    return config.defaultLanguage || 'en'; // return 'en' if defaultLanguage is not set
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Config file (${configFilePath}) not found, setting default language to "en"`);
      saveDefaultLanguage('en');
      return 'en';
    } else {
      throw error;
    }
  }
}

function saveDefaultLanguage(defaultLanguage) {
  let config = {};
  try {
    const configFileContent = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(configFileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Config file (${configFilePath}) not found, creating new one...`);
    } else {
      throw error;
    }
  }

  config.defaultLanguage = defaultLanguage;
  const configFileContent = JSON.stringify(config, null, 2);
  fs.writeFileSync(configFilePath, configFileContent);
}


function readModel() {
  try {
    const configFileContent = fs.readFileSync(configFilePath, 'utf8');
    const config = JSON.parse(configFileContent);
    return config.model || 'llama-3.1-8b-instant';
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Config file (${configFilePath}) not found, setting default language to "llama-3.1-8b-instant"`);
      saveModel('llama-3.1-8b-instant');
      return 'llama-3.1-8b-instant';
    } else {
      throw error;
    }
  }
}

function saveModel(model) {
  let config = {};
  try {
    const configFileContent = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(configFileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Config file (${configFilePath}) not found, creating new one...`);
    } else {
      throw error;
    }
  }

  config.model = model;
  const configFileContent = JSON.stringify(config, null, 2);
  fs.writeFileSync(configFilePath, configFileContent);
}

module.exports = { 
  readApiKey, 
  saveApiKey, 
  readDefaultLanguage, 
  saveDefaultLanguage,
  saveModel,
  readModel
};

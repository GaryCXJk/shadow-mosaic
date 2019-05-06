// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain, ipcRenderer } from 'electron';
import { languageShort } from '../constants/general';

const fs = require('fs');
const path = require('path');

const isRenderer = process && process.type === 'renderer';

const configStore = {
  defaultConfig: {
    config: {
      theme: 'dark',
      language: languageShort || 'en',
    },
  },
};

class ConfigManager {
  static load() {
    if (configStore.data) {
      return Promise.resolve(configStore.data);
    }
    return new Promise((resolve) => {
      fs.readFile(path.join(__static, '/config.json'), 'utf8', (err, data) => {
        if (err) {
          configStore.data = configStore.defaultConfig;
        } else {
          configStore.data = JSON.parse(data);
        }
        resolve(configStore.data);
      });
    });
  }

  static get(event = {}) {
    if (isRenderer) {
      return ipcRenderer.send('config-manager-get');
    }
    // eslint-disable-next-line no-param-reassign
    event.returnValue = configStore.data;
    return configStore.data;
  }

  static getStore(event = {}) {
    if (isRenderer) {
      return ipcRenderer.send('config-manager-get-store');
    }
    // eslint-disable-next-line no-param-reassign
    event.returnValue = configStore.store;
    return configStore.store;
  }

  static setStore(store) {
    if (isRenderer) {
      ipcRenderer.send('config-manager-set-store', store);
    } else {
      configStore.store = store;
    }
  }

  static setStoreIpc(_event, store) {
    configStore.store = store;
    console.log(store);
  }
}

if (!isRenderer) {
  ipcMain.on('config-manager-get', ConfigManager.get);
  ipcMain.on('config-manager-get-store', ConfigManager.getStore);
  ipcMain.on('config-manager-set-store', ConfigManager.setStoreIpc);
}

export default ConfigManager;

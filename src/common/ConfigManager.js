// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain, ipcRenderer } from 'electron';
import WindowManager from './WindowManager';
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
    if (isRenderer) {
      ipcRenderer.sendSync('config-manager-load');
    }

    if (configStore.data) {
      WindowManager.emit('store-update', configStore.data);
    }
    fs.readFile(path.join(__static, '/config.json'), 'utf8', (err, data) => {
      if (err) {
        configStore.data = configStore.defaultConfig;
      } else {
        configStore.data = JSON.parse(data);
      }
      WindowManager.emit('store-update', configStore.data);
    });
  }

  static get() {
    if (isRenderer) {
      return ipcRenderer.sendSync('config-manager-get');
    }
    return configStore.data;
  }

  static getIpc(event) {
    // eslint-disable-next-line no-param-reassign
    event.returnValue = configStore.data;
  }

  static set(state) {
    if (isRenderer) {
      ipcRenderer.send('config-manager-set', state);
    }
  }

  static setIpc(_event, state) {
    configStore.data = {
      ...configStore.data,
      ...state,
    };

    WindowManager.emit('store-update', configStore.data);
  }
}

if (!isRenderer) {
  ipcMain.on('config-manager-load', ConfigManager.load);
  ipcMain.on('config-manager-get', ConfigManager.getIpc);
  ipcMain.on('config-manager-set', ConfigManager.setIpc);
}

export default ConfigManager;

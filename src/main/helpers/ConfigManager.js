// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from 'electron';
import { languageShort } from 'common/constants/general';
import WindowManager from 'common/helpers/WindowManager';

// We need both fs and path to load in and save the config file.
const fs = require('fs');
const path = require('path');

/* This variable stores the ConfigManager data, since we would only need to load
 * it once. It also stores a default configuration, in case loading the file fails.
 */
const configStore = {
  defaultConfig: {
    config: {
      theme: 'dark',
      language: languageShort || 'en',
    },
  },
};

/**
 * Manages the configuration.
 */
class ConfigManager {
  /**
   * Loads the configuration file.
   */
  static load() {
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

  /**
   * Retrieves the configuration data. When the renderer calls it, it will send
   * a request to the main process synchronously, so that it will retrieve the
   * data immediately instead of having to wait for it.
   */
  static get() {
    return configStore.data;
  }

  /**
   * Retrieves the configuration data. This method will only be called by the
   * main process, and will send back immediately.
   */
  static getMain(event) {
    // eslint-disable-next-line no-param-reassign
    event.returnValue = configStore.data;
  }

  /**
   * Sets a new configuration state. This is purely meant for the renderer.
   */
  static set(state) {
    configStore.data = {
      ...configStore.data,
      ...state,
    };
  }

  /**
   * Sets a new configuration state. This is purely meant for the main process.
   * Once it's done, it will send back a message to every application window that
   * is currently open.
   */
  static setMain(_event, state) {
    configStore.data = {
      ...configStore.data,
      ...state,
    };

    WindowManager.emit('store-update', configStore.data);
  }
}

/* We'll want to attach listeners to the main process for any requests that the
 * renderers send.
 */
ipcMain.on('config-manager-load', ConfigManager.load);
ipcMain.on('config-manager-get', ConfigManager.getMain);
ipcMain.on('config-manager-set', ConfigManager.setMain);

export default ConfigManager;

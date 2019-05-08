// eslint-disable-next-line import/no-extraneous-dependencies
import { app, ipcMain } from 'electron';
import { languageShort } from 'common/constants/general';
import {
  EVENT_CONFIG_MANAGER_LOAD,
  EVENT_CONFIG_MANAGER_GET,
  EVENT_CONFIG_MANAGER_SET,
} from 'common/constants/events';
import WindowManager from './WindowManager';

// We need both fs and path to load in and save the config file.
const fs = require('fs');
const path = require('path');

const configFile = path.join(app.getPath('userData'), 'config.json');

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
    fs.readFile(configFile, 'utf8', (err, data) => {
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
   * Sets a new configuration state. This is purely meant for the renderer.
   */
  static set(state) {
    configStore.data = {
      ...configStore.data,
      ...state,
    };

    const content = JSON.stringify(configStore.data);

    fs.writeFile(configFile, content, (err) => {
      if (err) {
        console.log(err);
      } else {
        WindowManager.emit('store-update', configStore.data);
      }
    });
  }
}


/* eslint-disable no-param-reassign */

/**
 * Retrieves the configuration data. This method will only be called by the
 * main process, and will send back immediately.
 */
const getEvent = (event) => {
  event.returnValue = ConfigManager.get();
};

/**
 * Sets a new configuration state. This is purely meant for the main process.
 * Once it's done, it will send back a message to every application window that
 * is currently open.
 */
const setEvent = (_event, state) => {
  ConfigManager.set(state);
};

/* eslin-enable no-param-reassign */

/* We'll want to attach listeners to the main process for any requests that the
 * renderers send.
 */
ipcMain.on(EVENT_CONFIG_MANAGER_LOAD, ConfigManager.load);
ipcMain.on(EVENT_CONFIG_MANAGER_GET, getEvent);
ipcMain.on(EVENT_CONFIG_MANAGER_SET, setEvent);

export default ConfigManager;

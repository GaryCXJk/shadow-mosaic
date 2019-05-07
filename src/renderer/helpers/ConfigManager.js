// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import {
  EVENT_CONFIG_MANAGER_LOAD,
  EVENT_CONFIG_MANAGER_GET,
  EVENT_CONFIG_MANAGER_SET,
} from 'common/constants/events';

/**
 * Manages the configuration.
 */
class ConfigManager {
  /**
   * Loads the configuration file.
   */
  static load() {
    ipcRenderer.send(EVENT_CONFIG_MANAGER_LOAD);
  }

  /**
   * Retrieves the configuration data. When the renderer calls it, it will send
   * a request to the main process synchronously, so that it will retrieve the
   * data immediately instead of having to wait for it.
   */
  static get() {
    return ipcRenderer.sendSync(EVENT_CONFIG_MANAGER_GET);
  }

  /**
   * Sets a new configuration state. This is purely meant for the renderer.
   */
  static set(state) {
    ipcRenderer.send(EVENT_CONFIG_MANAGER_SET, state);
  }
}

export default ConfigManager;

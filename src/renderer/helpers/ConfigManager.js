// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';

/**
 * Manages the configuration.
 */
class ConfigManager {
  /**
   * Loads the configuration file.
   */
  static load() {
    ipcRenderer.send('config-manager-load');
  }

  /**
   * Retrieves the configuration data. When the renderer calls it, it will send
   * a request to the main process synchronously, so that it will retrieve the
   * data immediately instead of having to wait for it.
   */
  static get() {
    return ipcRenderer.sendSync('config-manager-get');
  }

  /**
   * Sets a new configuration state. This is purely meant for the renderer.
   */
  static set(state) {
    ipcRenderer.send('config-manager-set', state);
  }
}

export default ConfigManager;

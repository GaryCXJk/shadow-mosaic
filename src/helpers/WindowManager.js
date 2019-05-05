// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';

const windows = {};

class WindowManager {
  static get(windowName, createIfNotExist = false) {
    if (createIfNotExist && !windows[windowName]) {
      return this.create(windowName);
    }
    return windows[windowName] || null;
  }

  static create(windowName, options = {}) {
    const window = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
      },
      frame: false,
    });

    windows[windowName] = window;

    const location = options.location ? `#${options.location}` : '';

    if (options.isDevelopment) {
      window.webContents.openDevTools();
      window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}${location}`);
    } else {
      window.loadURL(formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      }));
    }

    return windows[windowName];
  }

  static destroy(windowName) {
    windows[windowName] = null;
    delete windows[windowName];
  }
}

export default WindowManager;

// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import { isDevelopment } from '../constants/general';

const windows = {};
const copyable = [
  'width',
  'height',
  'minWidth',
  'maxWidth',
  'minHeight',
  'maxHeight',
  'resizable',
];

class WindowManager {
  static get(windowName, createIfNotExist = false) {
    if (createIfNotExist && !windows[windowName]) {
      return this.create(windowName);
    }
    return windows[windowName] || null;
  }

  static create(windowName, options = {}) {
    const windowOptions = {
      webPreferences: {
        nodeIntegration: true,
      },
      frame: false,
    };
    if (options.modalParent) {
      const parentWindow = this.get(options.modalParent);
      if (parentWindow) {
        windowOptions.modal = true;
        windowOptions.parent = parentWindow;
      }
    }
    copyable.forEach((prop) => {
      if (typeof options[prop] !== 'undefined') {
        windowOptions[prop] = options[prop];
      }
    });

    const window = new BrowserWindow(windowOptions);

    windows[windowName] = window;

    const location = options.location ? `#${options.location}` : '';

    if (isDevelopment) {
      if (!options.hideDevtools) {
        window.webContents.openDevTools();
      }
      window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}${location}`);
    } else {
      window.loadURL(formatUrl({
        pathname: path.join(__dirname, `index.html${location}`),
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

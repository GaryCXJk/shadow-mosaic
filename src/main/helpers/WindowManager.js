// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { format as formatUrl } from 'url';
import { isDevelopment } from 'common/constants/general';
import {
  EVENT_WINDOW_MANAGER_CREATE,
  EVENT_WINDOW_MANAGER_DESTROY,
  EVENT_WINDOW_MANAGER_MINIMIZE,
  EVENT_WINDOW_MANAGER_MAXIMIZE,
  EVENT_WINDOW_MANAGER_CLOSE,
  EVENT_WINDOW_MANAGER_ADD_LISTENER,
  EVENT_WINDOW_MANAGER_CALL_METHOD,
} from 'common/constants/events';

const windows = {};
const listeners = {};
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
        webSecurity: false,
      },
      frame: false,
    };
    if (options.modalParent) {
      const parentWindow = this.get(options.modalParent);
      if (parentWindow) {
        windowOptions.modal = true;
        windowOptions.parent = parentWindow;
      }
    } else if (options.parent) {
      const parentWindow = this.get(options.parent);
      if (parentWindow) {
        windowOptions.parent = parentWindow;
      }
    }
    copyable.forEach((prop) => {
      if (typeof options[prop] !== 'undefined') {
        windowOptions[prop] = options[prop];
      }
    });

    const win = new BrowserWindow(windowOptions);

    windows[windowName] = win;

    if (isDevelopment) {
      if (!options.hideDevtools) {
        win.webContents.openDevTools();
      }
      const location = options.location ? `#${options.location}` : '';
      win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}${location}`);
    } else {
      const locationPath = formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
        hash: options.location,
      });
      win.loadURL(locationPath);
    }
    return windows[windowName];
  }

  static destroy(windowName) {
    if (windows[windowName]) {
      windows[windowName].destroy();
    }
    windows[windowName] = null;
    delete windows[windowName];
    listeners[windowName] = null;
    delete listeners[windowName];
  }

  static minimize(windowName) {
    if (windows[windowName]) {
      windows[windowName].minimize();
    }
  }

  static maximize(windowName) {
    if (windows[windowName]) {
      if (windows[windowName].isMaximized()) {
        windows[windowName].unmaximize();
      } else {
        windows[windowName].maximize();
      }
    }
  }

  static close(windowName) {
    if (windows[windowName]) {
      windows[windowName].close();

      if (windows[windowName] && !windows[windowName].closed) {
        windows[windowName].destroy();
      }
    }
    windows[windowName] = null;
    delete windows[windowName];
    listeners[windowName] = null;
    delete listeners[windowName];
  }

  static callMethod(windowName, method, ...args) {
    if (windows[windowName]) {
      return windows[windowName][method].call(windows[windowName], ...args);
    }
    return null;
  }

  static addListener(windowName, event) {
    if (windows[windowName]) {
      listeners[windowName] = listeners[windowName] || [];
      if (!listeners[windowName].includes(event)) {
        listeners[windowName].push(event);
        const listener = WindowManager.sendListener.bind(this, windowName, event);
        windows[windowName].on(event, listener);
      }
    }
  }

  static sendListener(windowName, event) {
    if (windows[windowName]) {
      windows[windowName].webContents.send(event);
    }
  }

  static emit(event, payload) {
    Object.keys(windows).forEach((windowName) => {
      const win = windows[windowName];
      if (win && !win.isDestroyed()) {
        win.webContents.send(event, payload);
      } else if (win) {
        this.destroy(windowName);
      }
    });
  }
}

/* eslint-disable no-param-reassign */

const createEvent = (_event, windowName, options = {}) => {
  WindowManager.create(windowName, options);
};

const destroyEvent = (_event, windowName) => {
  WindowManager.destroy(windowName);
};

const minimizeEvent = (_event, windowName) => {
  WindowManager.minimize(windowName);
};

const maximizeEvent = (_event, windowName) => {
  WindowManager.maximize(windowName);
};

const closeEvent = (_event, windowName) => {
  WindowManager.close(windowName);
};

const addListener = (_event, windowName, event) => {
  WindowManager.addListener(windowName, event);
};

const callMethod = (event, windowName, method, ...args) => {
  event.returnValue = WindowManager.callMethod(windowName, method, ...args);
};

/* eslint-enable no-param-reassign */

ipcMain.on(EVENT_WINDOW_MANAGER_CREATE, createEvent);
ipcMain.on(EVENT_WINDOW_MANAGER_DESTROY, destroyEvent);
ipcMain.on(EVENT_WINDOW_MANAGER_MINIMIZE, minimizeEvent);
ipcMain.on(EVENT_WINDOW_MANAGER_MAXIMIZE, maximizeEvent);
ipcMain.on(EVENT_WINDOW_MANAGER_CLOSE, closeEvent);
ipcMain.on(EVENT_WINDOW_MANAGER_ADD_LISTENER, addListener);
ipcMain.on(EVENT_WINDOW_MANAGER_CALL_METHOD, callMethod);

export default WindowManager;

// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import {
  EVENT_WINDOW_MANAGER_CREATE,
  EVENT_WINDOW_MANAGER_DESTROY,
  EVENT_WINDOW_MANAGER_MINIMIZE,
  EVENT_WINDOW_MANAGER_MAXIMIZE,
  EVENT_WINDOW_MANAGER_CLOSE,
  EVENT_WINDOW_MANAGER_ADD_LISTENER,
  EVENT_WINDOW_MANAGER_CALL_METHOD,
} from 'common/constants/events';

const listeners = {};

class WindowManager {
  static create(windowName, options = {}) {
    ipcRenderer.send(EVENT_WINDOW_MANAGER_CREATE, windowName, options);
  }

  static destroy(windowName) {
    ipcRenderer.send(EVENT_WINDOW_MANAGER_DESTROY, windowName);
  }

  static minimize(windowName) {
    ipcRenderer.send(EVENT_WINDOW_MANAGER_MINIMIZE, windowName);
  }

  static maximize(windowName) {
    ipcRenderer.send(EVENT_WINDOW_MANAGER_MAXIMIZE, windowName);
  }

  static close(windowName) {
    ipcRenderer.send(EVENT_WINDOW_MANAGER_CLOSE, windowName);
  }

  static trigger(windowName, event) {
    if (listeners[windowName] && listeners[windowName][event]) {
      listeners[windowName][event].forEach((listener) => {
        listener();
      });
    }
  }

  static on(windowName, event, listener) {
    listeners[windowName] = listeners[windowName] || {};
    if (!listeners[windowName][event]) {
      listeners[windowName][event] = [];
      const triggerEvent = WindowManager.trigger.bind(this, windowName, event);
      ipcRenderer.on(event, triggerEvent);
    }
    listeners[windowName][event].push(listener);
    ipcRenderer.send(EVENT_WINDOW_MANAGER_ADD_LISTENER, windowName, event);
  }

  static off(windowName, event, listener) {
    if (listeners[windowName]
      && listeners[windowName][event]
      && listeners[windowName].includes(listener)) {
      const listenerIndex = listeners[windowName].indexOf(listener);
      listeners[windowName].splice(listenerIndex, 1);
    }
  }

  static callMethod(windowName, method, ...args) {
    return ipcRenderer.sendSync(EVENT_WINDOW_MANAGER_CALL_METHOD, windowName, method, ...args);
  }
}

export default WindowManager;

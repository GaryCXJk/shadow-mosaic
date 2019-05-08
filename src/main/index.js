// eslint-disable-next-line import/no-extraneous-dependencies
import { app } from 'electron';
import { isDevelopment } from 'common/constants/general';
import ConfigManager from './helpers/ConfigManager';
import WindowManager from './helpers/WindowManager';

function createMainWindow() {
  if (isDevelopment) {
    /* eslint-disable import/no-extraneous-dependencies, global-require */
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');
    /* eslint-disable import/no-extraneous-dependencies */

    Promise.all([
      installExtension(REACT_DEVELOPER_TOOLS),
      installExtension(REDUX_DEVTOOLS),
    ]).then();
  }
  ConfigManager.load();

  const window = WindowManager.create('main');

  window.on('closed', () => {
    WindowManager.destroy('main');
    app.quit();
  });

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (WindowManager.get('main') === null) {
    createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  createMainWindow();
});

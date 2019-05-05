// eslint-disable-next-line import/no-extraneous-dependencies
import { app } from 'electron';
import { isDevelopment } from '../constants/general';
import WindowManager from '../helpers/WindowManager';

global.WindowManager = WindowManager;

function createMainWindow() {
  const window = WindowManager.create('main', {
    isDevelopment,
  });

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

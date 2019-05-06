// eslint-disable-next-line import/no-extraneous-dependencies
import { app } from 'electron';
// eslint-disable-next-line import/no-extraneous-dependencies
import installExtension, {
  REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import ConfigManager from 'common/ConfigManager';
import WindowManager from 'common/WindowManager';

global.ConfigManager = ConfigManager;
global.WindowManager = WindowManager;

installExtension(REACT_DEVELOPER_TOOLS);
installExtension(REDUX_DEVTOOLS);

function createMainWindow() {
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

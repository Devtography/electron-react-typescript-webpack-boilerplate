/**
 * Entry point of the Election app.
 */
import * as path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, app, ipcMain } from 'electron';
import * as nodeEnv from '_utils/node-env';

let mainWindow: Electron.BrowserWindow | undefined;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      devTools: nodeEnv.dev,
      preload: path.join(__dirname, './preload.bundle.js'),
      webSecurity: nodeEnv.prod,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html').finally(() => { /* no action */ });

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = undefined;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  if (nodeEnv.dev || nodeEnv.prod) createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows.length === 0) createWindow();
  });
}).finally(() => { /* no action */ });

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('renderer-ready', () => {
  // eslint-disable-next-line no-console
  console.log('Renderer is ready.');
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// eslint-disable-next-line import/prefer-default-export
export const exportedForTests = nodeEnv.test ? { createWindow } : undefined;

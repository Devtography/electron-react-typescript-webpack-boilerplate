// eslint-disable-next-line import/no-extraneous-dependencies
import { contextBridge } from 'electron';
import ipcAPI from '_preload/ipc-api.js';

contextBridge.exposeInMainWorld('ipcAPI', ipcAPI);

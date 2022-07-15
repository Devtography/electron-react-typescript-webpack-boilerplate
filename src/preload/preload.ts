import ipcAPI from '_preload/ipc-api';
// eslint-disable-next-line import/no-extraneous-dependencies
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('ipcAPI', ipcAPI);

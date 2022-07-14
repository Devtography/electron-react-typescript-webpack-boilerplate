// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  /** Notify main the renderer is ready. */
  rendererReady: () => { ipcRenderer.send('renderer-ready'); },
});

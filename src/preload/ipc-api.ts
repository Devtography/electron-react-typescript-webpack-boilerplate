// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';

/** Notify main the renderer is ready. */
function rendererReady() {
  ipcRenderer.send('renderer-ready');
}

export default { rendererReady };

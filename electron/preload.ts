import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  selectDirectory: (): Promise<string | undefined> =>
    ipcRenderer.invoke('select-directory'),
});

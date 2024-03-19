export const ipcRenderer = window.electron?.ipcRenderer;

export const isElectron = navigator.userAgent.toLowerCase().includes(' electron/');

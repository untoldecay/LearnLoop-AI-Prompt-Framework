const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File system operations
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  saveFile: (filePath, content) => ipcRenderer.invoke('save-file', filePath, content),
  readDirectory: (dirPath) => ipcRenderer.invoke('read-directory', dirPath),
  createFile: (filePath, content) => ipcRenderer.invoke('create-file', filePath, content),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),
  getFileStats: (filePath) => ipcRenderer.invoke('get-file-stats', filePath),
  createDirectory: (dirPath) => ipcRenderer.invoke('create-directory', dirPath),
  moveFile: (oldPath, newPath) => ipcRenderer.invoke('move-file', oldPath, newPath),
  
  // File watching
  startFileWatcher: (dirPath) => ipcRenderer.invoke('start-file-watcher', dirPath),
  stopFileWatcher: () => ipcRenderer.invoke('stop-file-watcher'),
  
  // External operations
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Platform info
  platform: process.platform,
  
  // File watcher events
  onFileChanged: (callback) => {
    ipcRenderer.on('file-changed', callback);
  },
  
  onFileAdded: (callback) => {
    ipcRenderer.on('file-added', callback);
  },
  
  onFileDeleted: (callback) => {
    ipcRenderer.on('file-deleted', callback);
  },
  
  onDirectoryAdded: (callback) => {
    ipcRenderer.on('directory-added', callback);
  },
  
  onDirectoryDeleted: (callback) => {
    ipcRenderer.on('directory-deleted', callback);
  },
  
  removeFileChangedListener: (callback) => {
    ipcRenderer.removeListener('file-changed', callback);
  },
  
  removeFileAddedListener: (callback) => {
    ipcRenderer.removeListener('file-added', callback);
  },
  
  removeFileDeletedListener: (callback) => {
    ipcRenderer.removeListener('file-deleted', callback);
  },
  
  removeDirectoryAddedListener: (callback) => {
    ipcRenderer.removeListener('directory-added', callback);
  },
  
  removeDirectoryDeletedListener: (callback) => {
    ipcRenderer.removeListener('directory-deleted', callback);
  },
  
  // Menu events
  onMenuAction: (callback) => {
    ipcRenderer.on('menu-action', callback);
  },
  
  removeMenuActionListener: (callback) => {
    ipcRenderer.removeListener('menu-action', callback);
  }
});

// Store API for application settings
contextBridge.exposeInMainWorld('storeAPI', {
  get: (key) => ipcRenderer.invoke('store-get', key),
  set: (key, value) => ipcRenderer.invoke('store-set', key, value),
  delete: (key) => ipcRenderer.invoke('store-delete', key),
  clear: () => ipcRenderer.invoke('store-clear')
});
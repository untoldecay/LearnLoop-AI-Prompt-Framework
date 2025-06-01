const { app, BrowserWindow, Menu, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const chokidar = require('chokidar');
const isDev = process.env.NODE_ENV === 'development';

class MainWindow {
  constructor() {
    this.window = null;
    this.fileWatcher = null;
    this.watchedPath = null;
    this.createWindow();
    this.setupEventHandlers();
  }

  createWindow() {
    this.window = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 1200,
      minHeight: 800,
      titleBarStyle: 'hiddenInset',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, 'preload.js')
      },
      show: false
    });

    // Load the app
    if (isDev) {
      this.window.loadURL('http://localhost:3001');
      this.window.webContents.openDevTools();
    } else {
      this.window.loadFile(path.join(__dirname, '../build/index.html'));
    }

    // Show window when ready
    this.window.once('ready-to-show', () => {
      this.window.show();
    });

    // Handle window closed
    this.window.on('closed', () => {
      this.stopFileWatcher();
      this.window = null;
    });
  }

  setupEventHandlers() {
    // File operations
    ipcMain.handle('select-folder', async () => {
      const result = await dialog.showOpenDialog(this.window, {
        properties: ['openDirectory'],
        title: 'Select Project Folder'
      });
      return result;
    });

    ipcMain.handle('save-file', async (event, filePath, content) => {
      try {
        const fs = require('fs').promises;
        await fs.writeFile(filePath, content, 'utf8');
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('read-file', async (event, filePath) => {
      try {
        const fs = require('fs').promises;
        const content = await fs.readFile(filePath, 'utf8');
        return { success: true, content };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('read-directory', async (event, dirPath) => {
      try {
        const fs = require('fs').promises;
        const path = require('path');
        
        const readDirRecursive = async (dir) => {
          const items = await fs.readdir(dir);
          const result = [];
          
          for (const item of items) {
            const fullPath = path.join(dir, item);
            const stats = await fs.stat(fullPath);
            
            if (stats.isDirectory()) {
              result.push({
                name: item,
                path: fullPath,
                type: 'directory',
                children: await readDirRecursive(fullPath)
              });
            } else if (path.extname(item) === '.md') {
              result.push({
                name: item,
                path: fullPath,
                type: 'file'
              });
            }
          }
          
          return result.sort((a, b) => {
            if (a.type === b.type) return a.name.localeCompare(b.name);
            return a.type === 'directory' ? -1 : 1;
          });
        };
        
        const files = await readDirRecursive(dirPath);
        return { success: true, files };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('create-file', async (event, filePath, content = '') => {
      try {
        const fs = require('fs').promises;
        const path = require('path');
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content, 'utf8');
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('delete-file', async (event, filePath) => {
      try {
        const fs = require('fs').promises;
        await fs.unlink(filePath);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // Open external links
    ipcMain.handle('open-external', async (event, url) => {
      await shell.openExternal(url);
    });

    // File watching
    ipcMain.handle('start-file-watcher', async (event, dirPath) => {
      try {
        this.stopFileWatcher();
        
        this.watchedPath = dirPath;
        this.fileWatcher = chokidar.watch(dirPath, {
          ignored: /(^|[\/\\])\../, // ignore dotfiles
          persistent: true,
          ignoreInitial: true,
          depth: 10,
          awaitWriteFinish: {
            stabilityThreshold: 100,
            pollInterval: 50
          }
        });

        this.fileWatcher
          .on('add', (filePath) => {
            if (path.extname(filePath) === '.md') {
              this.window?.webContents.send('file-added', filePath);
            }
          })
          .on('change', (filePath) => {
            if (path.extname(filePath) === '.md') {
              this.window?.webContents.send('file-changed', filePath);
            }
          })
          .on('unlink', (filePath) => {
            if (path.extname(filePath) === '.md') {
              this.window?.webContents.send('file-deleted', filePath);
            }
          })
          .on('addDir', (dirPath) => {
            this.window?.webContents.send('directory-added', dirPath);
          })
          .on('unlinkDir', (dirPath) => {
            this.window?.webContents.send('directory-deleted', dirPath);
          })
          .on('error', (error) => {
            console.error('File watcher error:', error);
          });

        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('stop-file-watcher', () => {
      this.stopFileWatcher();
      return { success: true };
    });

    // Enhanced file operations
    ipcMain.handle('get-file-stats', async (event, filePath) => {
      try {
        const fs = require('fs').promises;
        const stats = await fs.stat(filePath);
        const content = await fs.readFile(filePath, 'utf8');
        
        return {
          success: true,
          stats: {
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
            wordCount: content.split(/\s+/).filter(word => word.length > 0).length,
            characterCount: content.length,
            lineCount: content.split('\n').length
          }
        };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('create-directory', async (event, dirPath) => {
      try {
        const fs = require('fs').promises;
        await fs.mkdir(dirPath, { recursive: true });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    ipcMain.handle('move-file', async (event, oldPath, newPath) => {
      try {
        const fs = require('fs').promises;
        const path = require('path');
        
        // Ensure target directory exists
        await fs.mkdir(path.dirname(newPath), { recursive: true });
        await fs.rename(oldPath, newPath);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });

    // App info
    ipcMain.handle('get-app-version', () => {
      return app.getVersion();
    });
  }

  stopFileWatcher() {
    if (this.fileWatcher) {
      this.fileWatcher.close();
      this.fileWatcher = null;
      this.watchedPath = null;
    }
  }
}

// App event handlers
app.whenReady().then(() => {
  new MainWindow();
  
  // Create application menu
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project...',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // Will be handled by renderer
          }
        },
        {
          label: 'Open Project...',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            // Will be handled by renderer
          }
        },
        { type: 'separator' },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            // Will be handled by renderer
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new MainWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});
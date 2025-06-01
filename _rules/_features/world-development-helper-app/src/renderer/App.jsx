import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Split from 'react-split';
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import RightPanel from './components/RightPanel';
import './App.css';

function App() {
  const [projectPath, setProjectPath] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileTree, setFileTree] = useState([]);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'editor'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileWatcherActive, setFileWatcherActive] = useState(false);
  const [lastActivity, setLastActivity] = useState(null);

  // Load project folder
  const loadProject = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Stop existing file watcher
      if (fileWatcherActive) {
        await window.electronAPI.stopFileWatcher();
        setFileWatcherActive(false);
      }
      
      const result = await window.electronAPI.selectFolder();
      if (!result.canceled && result.filePaths.length > 0) {
        const folderPath = result.filePaths[0];
        setProjectPath(folderPath);
        
        // Read directory structure
        const dirResult = await window.electronAPI.readDirectory(folderPath);
        if (dirResult.success) {
          setFileTree(dirResult.files);
          
          // Start file watcher
          const watchResult = await window.electronAPI.startFileWatcher(folderPath);
          if (watchResult.success) {
            setFileWatcherActive(true);
          }
        } else {
          setError(`Failed to read directory: ${dirResult.error}`);
        }
      }
    } catch (err) {
      setError(`Error loading project: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = async (file) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      setCurrentView('editor');
    }
  };

  // Handle view changes
  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view === 'dashboard') {
      setSelectedFile(null);
    }
  };

  // Create new file
  const createNewFile = async (fileName, content = '') => {
    if (!projectPath) return;
    
    try {
      const filePath = `${projectPath}/${fileName}`;
      const result = await window.electronAPI.createFile(filePath, content);
      
      if (result.success) {
        // Refresh file tree
        const dirResult = await window.electronAPI.readDirectory(projectPath);
        if (dirResult.success) {
          setFileTree(dirResult.files);
        }
      } else {
        setError(`Failed to create file: ${result.error}`);
      }
    } catch (err) {
      setError(`Error creating file: ${err.message}`);
    }
  };

  // Refresh project
  const refreshProject = async () => {
    if (!projectPath) return;
    
    try {
      const dirResult = await window.electronAPI.readDirectory(projectPath);
      if (dirResult.success) {
        setFileTree(dirResult.files);
      } else {
        setError(`Failed to refresh directory: ${dirResult.error}`);
      }
    } catch (err) {
      setError(`Error refreshing project: ${err.message}`);
    }
  };

  // Delete file
  const deleteFile = async (filePath) => {
    try {
      const result = await window.electronAPI.deleteFile(filePath);
      if (result.success) {
        // If deleted file was selected, clear selection
        if (selectedFile && selectedFile.path === filePath) {
          setSelectedFile(null);
          setCurrentView('dashboard');
        }
        // Refresh file tree
        await refreshProject();
      } else {
        setError(`Failed to delete file: ${result.error}`);
      }
    } catch (err) {
      setError(`Error deleting file: ${err.message}`);
    }
  };

  // Rename file
  const renameFile = async (oldPath, newPath) => {
    try {
      // Read content first
      const readResult = await window.electronAPI.readFile(oldPath);
      if (!readResult.success) {
        setError(`Failed to read file for rename: ${readResult.error}`);
        return;
      }

      // Create new file
      const createResult = await window.electronAPI.createFile(newPath, readResult.content);
      if (!createResult.success) {
        setError(`Failed to create renamed file: ${createResult.error}`);
        return;
      }

      // Delete old file
      const deleteResult = await window.electronAPI.deleteFile(oldPath);
      if (!deleteResult.success) {
        setError(`Failed to delete old file: ${deleteResult.error}`);
        return;
      }

      // Update selected file if it was the renamed one
      if (selectedFile && selectedFile.path === oldPath) {
        setSelectedFile({
          ...selectedFile,
          path: newPath,
          name: newPath.split('/').pop()
        });
      }

      // Refresh file tree
      await refreshProject();
    } catch (err) {
      setError(`Error renaming file: ${err.message}`);
    }
  };

  // Save file
  const saveFile = async (filePath, content) => {
    try {
      const result = await window.electronAPI.saveFile(filePath, content);
      if (!result.success) {
        setError(`Failed to save file: ${result.error}`);
      }
      return result.success;
    } catch (err) {
      setError(`Error saving file: ${err.message}`);
      return false;
    }
  };

  // File watcher event handlers
  useEffect(() => {
    const handleFileAdded = (event, filePath) => {
      console.log('File added:', filePath);
      setLastActivity({
        type: 'added',
        timestamp: new Date(),
        message: `File added: ${filePath.split('/').pop()}`
      });
      refreshProject();
    };

    const handleFileChanged = (event, filePath) => {
      console.log('File changed:', filePath);
      setLastActivity({
        type: 'changed',
        timestamp: new Date(),
        message: `File modified: ${filePath.split('/').pop()}`
      });
      // Optionally refresh if the changed file is not currently selected
      if (!selectedFile || selectedFile.path !== filePath) {
        refreshProject();
      }
    };

    const handleFileDeleted = (event, filePath) => {
      console.log('File deleted:', filePath);
      setLastActivity({
        type: 'deleted',
        timestamp: new Date(),
        message: `File deleted: ${filePath.split('/').pop()}`
      });
      // Clear selection if deleted file was selected
      if (selectedFile && selectedFile.path === filePath) {
        setSelectedFile(null);
        setCurrentView('dashboard');
      }
      refreshProject();
    };

    const handleDirectoryAdded = (event, dirPath) => {
      console.log('Directory added:', dirPath);
      setLastActivity({
        type: 'directory_added',
        timestamp: new Date(),
        message: `Folder added: ${dirPath.split('/').pop()}`
      });
      refreshProject();
    };

    const handleDirectoryDeleted = (event, dirPath) => {
      console.log('Directory deleted:', dirPath);
      setLastActivity({
        type: 'directory_deleted',
        timestamp: new Date(),
        message: `Folder deleted: ${dirPath.split('/').pop()}`
      });
      refreshProject();
    };

    // Set up event listeners
    if (window.electronAPI) {
      window.electronAPI.onFileAdded(handleFileAdded);
      window.electronAPI.onFileChanged(handleFileChanged);
      window.electronAPI.onFileDeleted(handleFileDeleted);
      window.electronAPI.onDirectoryAdded(handleDirectoryAdded);
      window.electronAPI.onDirectoryDeleted(handleDirectoryDeleted);
    }

    // Cleanup event listeners
    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeFileAddedListener(handleFileAdded);
        window.electronAPI.removeFileChangedListener(handleFileChanged);
        window.electronAPI.removeFileDeletedListener(handleFileDeleted);
        window.electronAPI.removeDirectoryAddedListener(handleDirectoryAdded);
        window.electronAPI.removeDirectoryDeletedListener(handleDirectoryDeleted);
      }
    };
  }, [selectedFile, refreshProject]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (fileWatcherActive && window.electronAPI) {
        window.electronAPI.stopFileWatcher();
      }
    };
  }, [fileWatcherActive]);

  return (
    <Router>
      <div className="app">
        <div className="app-header">
          <div className="app-title">World Development Helper</div>
          <div className="header-info">
            {projectPath && (
              <div className="project-path">{projectPath}</div>
            )}
            {fileWatcherActive && (
              <div className="watcher-status">
                <div className="status-indicator active"></div>
                File watching active
              </div>
            )}
            {lastActivity && (
              <div className="last-activity">
                {lastActivity.message} • {lastActivity.timestamp.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
        
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}
        
        <div className="app-content">
          <Split
            sizes={[20, 60, 20]}
            minSize={[200, 400, 300]}
            expandToMin={false}
            gutterSize={4}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            className="split-container"
          >
            {/* Left Panel - Project Tree */}
            <div className="panel left-panel">
              <LeftPanel
                projectPath={projectPath}
                fileTree={fileTree}
                onLoadProject={loadProject}
                onFileSelect={handleFileSelect}
                onCreateFile={createNewFile}
                onDeleteFile={deleteFile}
                onRenameFile={renameFile}
                onRefreshProject={refreshProject}
                isLoading={isLoading}
                selectedFile={selectedFile}
              />
            </div>
            
            {/* Center Panel - Dashboard or Editor */}
            <div className="panel center-panel">
              <CenterPanel
                currentView={currentView}
                selectedFile={selectedFile}
                onViewChange={handleViewChange}
                onSaveFile={saveFile}
                projectPath={projectPath}
                fileTree={fileTree}
              />
            </div>
            
            {/* Right Panel - AI Chat */}
            <div className="panel right-panel">
              <RightPanel
                selectedFile={selectedFile}
                projectPath={projectPath}
              />
            </div>
          </Split>
        </div>
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <div>Loading...</div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, FileText, BookOpen, Users, Map, Settings, Clock, TrendingUp, Activity } from 'lucide-react';
import './CenterPanel.css';

const Dashboard = ({ projectPath, fileTree }) => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalCharacters: 0,
    totalWords: 0,
    lastModified: null,
    recentActivity: [],
    extractedConcepts: [],
    characters: [],
    locations: []
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fileTree.length > 0) {
      calculateProjectStats();
    }
  }, [fileTree]);

  const calculateProjectStats = async () => {
    setIsLoading(true);
    try {
      let totalFiles = 0;
      let totalWords = 0;
      let totalCharacters = 0;
      let lastModified = null;
      const recentActivity = [];

      const processFiles = async (items) => {
        for (const item of items) {
          if (item.type === 'file') {
            totalFiles++;
            try {
              const fileStats = await window.electronAPI.getFileStats(item.path);
              if (fileStats.success) {
                totalWords += fileStats.stats.wordCount;
                totalCharacters += fileStats.stats.characterCount;
                
                if (!lastModified || fileStats.stats.modified > lastModified) {
                  lastModified = fileStats.stats.modified;
                }

                recentActivity.push({
                  file: item.name,
                  path: item.path,
                  modified: fileStats.stats.modified,
                  words: fileStats.stats.wordCount
                });
              }
            } catch (error) {
              console.error('Error getting file stats:', error);
            }
          } else if (item.children) {
            await processFiles(item.children);
          }
        }
      };

      await processFiles(fileTree);

      // Sort recent activity by modification date
      recentActivity.sort((a, b) => new Date(b.modified) - new Date(a.modified));

      setStats(prev => ({
        ...prev,
        totalFiles,
        totalWords,
        totalCharacters,
        lastModified,
        recentActivity: recentActivity.slice(0, 10) // Keep only 10 most recent
      }));
    } catch (error) {
      console.error('Error calculating project stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Project Dashboard</h2>
        <p>Overview of your world-building project</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalFiles}</div>
            <div className="stat-label">Markdown Files</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BookOpen size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalWords.toLocaleString()}</div>
            <div className="stat-label">Total Words</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.characters.length}</div>
            <div className="stat-label">Characters</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Map size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.locations.length}</div>
            <div className="stat-label">Locations</div>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section">
          <div className="section-header">
            <h3><Clock size={16} /> Recent Activity</h3>
            {isLoading && <div className="loading-spinner small" />}
          </div>
          <div className="section-content">
            {stats.recentActivity.length > 0 ? (
              <div className="activity-list">
                {stats.recentActivity.slice(0, 5).map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      <FileText size={14} />
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">{activity.file}</div>
                      <div className="activity-meta">
                        {activity.words} words • {new Date(activity.modified).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="placeholder-text">
                Recent file changes will appear here as you work on your project.
              </p>
            )}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h3><TrendingUp size={16} /> Project Overview</h3>
          </div>
          <div className="section-content">
            <div className="overview-stats">
              <div className="overview-item">
                <span className="overview-label">Total Characters:</span>
                <span className="overview-value">{stats.totalCharacters.toLocaleString()}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Average per File:</span>
                <span className="overview-value">
                  {stats.totalFiles > 0 ? Math.round(stats.totalWords / stats.totalFiles) : 0} words
                </span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Last Modified:</span>
                <span className="overview-value">
                  {stats.lastModified ? new Date(stats.lastModified).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h3><Users size={16} /> Characters</h3>
          </div>
          <div className="section-content">
            <p className="placeholder-text">
              AI-extracted characters from your content will be displayed here.
              <br /><small>Connect N8N RAG system to enable automatic extraction.</small>
            </p>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <h3><Map size={16} /> Locations</h3>
          </div>
          <div className="section-content">
            <p className="placeholder-text">
              Geographical elements and location references will be mapped here.
              <br /><small>Content analysis will identify places mentioned in your writing.</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Editor = ({ selectedFile, onSaveFile }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const autoSaveTimeout = useRef(null);

  useEffect(() => {
    if (selectedFile) {
      loadFileContent();
    }
    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [selectedFile]);

  useEffect(() => {
    // Update word and character counts
    const words = content.split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    setCharCount(content.length);
  }, [content]);

  const loadFileContent = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    try {
      const result = await window.electronAPI.readFile(selectedFile.path);
      if (result.success) {
        setContent(result.content);
        setHasChanges(false);
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Error loading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setHasChanges(true);
  };

  const handleSave = async (isAutoSave = false) => {
    if (!selectedFile || (!hasChanges && !isAutoSave)) return;
    
    setIsSaving(true);
    try {
      const success = await onSaveFile(selectedFile.path, content);
      if (success) {
        setHasChanges(false);
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Error saving file:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const triggerAutoSave = () => {
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current);
    }
    autoSaveTimeout.current = setTimeout(() => {
      handleSave(true);
    }, 2000); // Auto-save after 2 seconds of inactivity
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    setHasChanges(true);
    triggerAutoSave();
  };

  if (!selectedFile) {
    return (
      <div className="editor-empty">
        <div className="empty-content">
          <FileText size={48} className="empty-icon" />
          <h3>No File Selected</h3>
          <p>Select a markdown file from the project tree to start editing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <div className="file-info">
          <FileText size={16} />
          <span className="file-name">{selectedFile.name}</span>
          {hasChanges && <span className="unsaved-indicator">●</span>}
        </div>
        <div className="editor-actions">
          <button 
            className={`button small ${hasChanges ? '' : 'secondary'}`}
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save {hasChanges && '●'}
          </button>
        </div>
      </div>

      <div className="editor-content">
        {isLoading ? (
          <div className="editor-loading">
            <div className="loading-spinner"></div>
            <span>Loading file...</span>
          </div>
        ) : (
          <textarea
            className="editor-textarea scrollbar-style"
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder="Start writing your markdown content..."
            spellCheck="false"
          />
        )}
      </div>


    </div>
  );
};

const CenterPanel = ({ 
  currentView, 
  selectedFile, 
  onViewChange, 
  onSaveFile, 
  projectPath, 
  fileTree 
}) => {
  return (
    <div className="center-panel-container">
      <div className="panel-header">
        <div className="view-tabs">
          <button 
            className={`tab ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => onViewChange('dashboard')}
          >
            <BarChart3 size={14} />
            Dashboard
          </button>
          <button 
            className={`tab ${currentView === 'editor' ? 'active' : ''}`}
            onClick={() => onViewChange('editor')}
            disabled={!selectedFile}
          >
            <FileText size={14} />
            {selectedFile ? selectedFile.name : 'Editor'}
          </button>
        </div>
        <div className="header-actions">
          <button className="icon-button" title="Center Panel Settings">
            <Settings size={14} />
          </button>
        </div>
      </div>

      <div className="panel-content">
        {currentView === 'dashboard' ? (
          <Dashboard projectPath={projectPath} fileTree={fileTree} />
        ) : (
          <Editor selectedFile={selectedFile} onSaveFile={onSaveFile} />
        )}
      </div>
    </div>
  );
};

export default CenterPanel;
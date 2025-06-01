import React, { useState } from "react";
import {
  FolderOpen,
  File,
  Plus,
  Settings,
  ChevronRight,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

const TreeNode = ({ node, onFileSelect, selectedFile, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const handleClick = () => {
    if (node.type === "directory") {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect(node);
    }
  };

  const isSelected = selectedFile && selectedFile.path === node.path;

  return (
    <div className="tree-node">
      <div
        className={`tree-item ${isSelected ? "selected" : ""}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        <div className="tree-item-content">
          {node.type === "directory" ? (
            <>
              {isExpanded ? (
                <ChevronDown size={14} className="tree-icon" />
              ) : (
                <ChevronRight size={14} className="tree-icon" />
              )}
              <FolderOpen size={14} className="tree-icon" />
            </>
          ) : (
            <>
              <div style={{ width: 14 }} />
              <File size={14} className="tree-icon" />
            </>
          )}
          <span className="tree-label">{node.name}</span>
        </div>
      </div>

      {node.type === "directory" && isExpanded && node.children && (
        <div className="tree-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const LeftPanel = ({
  projectPath,
  fileTree,
  onLoadProject,
  onFileSelect,
  onCreateFile,
  onDeleteFile,
  onRenameFile,
  onRefreshProject,
  isLoading,
  selectedFile,
}) => {
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const fileName = newFileName.endsWith(".md")
        ? newFileName
        : `${newFileName}.md`;
      onCreateFile(fileName);
      setNewFileName("");
      setShowNewFileDialog(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateFile();
    } else if (e.key === "Escape") {
      setShowNewFileDialog(false);
      setNewFileName("");
    }
  };

  return (
    <div className="left-panel-container">
      <div className="panel-header">
        <span>Explorer</span>
        <div className="header-actions">
          <button
            className="icon-button"
            onClick={() => setShowNewFileDialog(true)}
            title="New File"
            disabled={!projectPath}
          >
            <Plus size={14} />
          </button>
          <button className="icon-button" title="Settings">
            <Settings size={14} />
          </button>
        </div>
      </div>

      <div className="panel-content scrollbar-style">
        {!projectPath ? (
          <div className="empty-state">
            <div className="empty-state-content">
              <FolderOpen size={48} className="empty-icon" />
              <h3>No Project Open</h3>
              <p>
                Open a project folder to start working with your markdown files.
              </p>
              <button
                className="button"
                onClick={onLoadProject}
                disabled={isLoading}
              >
                Open Project
              </button>
            </div>
          </div>
        ) : (
          <div className="file-tree">
            <div className="project-info">
              <div className="project-header">
                <div className="project-name">
                  {projectPath.split("/").pop()}
                </div>
                <div className="project-actions">
                  <button
                    className="icon-button small"
                    onClick={onRefreshProject}
                    title="Refresh Project"
                  >
                    <RotateCcw size={12} />
                  </button>
                  <button
                    className="icon-button small"
                    onClick={onLoadProject}
                    title="Change Project"
                  >
                    <FolderOpen size={12} />
                  </button>
                </div>
              </div>
              <div className="project-path">{projectPath}</div>
            </div>

            {showNewFileDialog && (
              <div className="new-file-dialog">
                <input
                  type="text"
                  className="input"
                  placeholder="filename.md"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
                <div className="dialog-actions">
                  <button
                    className="button small"
                    onClick={handleCreateFile}
                    disabled={!newFileName.trim()}
                  >
                    Create
                  </button>
                  <button
                    className="button small secondary"
                    onClick={() => {
                      setShowNewFileDialog(false);
                      setNewFileName("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {fileTree.length > 0 ? (
              <div className="tree-container">
                {fileTree.map((node) => (
                  <TreeNode
                    key={node.path}
                    node={node}
                    onFileSelect={onFileSelect}
                    selectedFile={selectedFile}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-folder">
                <p>No markdown files found in this project.</p>
                <button
                  className="button small"
                  onClick={() => setShowNewFileDialog(true)}
                >
                  Create First File
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .left-panel-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .header-actions {
          display: flex;
          gap: 4px;
        }

        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px;
        }

        .empty-state-content {
          text-align: center;
          max-width: 200px;
        }

        .empty-icon {
          color: #5a5a5a;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 14px;
          margin-bottom: 8px;
          color: #cccccc;
        }

        .empty-state p {
          font-size: 12px;
          color: #969696;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .file-tree {
          padding: 8px 0;
        }

        .project-info {
          padding: 8px 12px;
          margin-bottom: 8px;
          background-color: #2d2d30;
          border-radius: 4px;
        }

        .project-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .project-name {
          font-weight: 600;
          font-size: 12px;
          color: #cccccc;
        }

        .project-path {
          font-size: 10px;
          color: #969696;
          word-break: break-all;
        }

        .project-actions {
          display: flex;
          gap: 4px;
        }

        .action-btn.small {
          padding: 4px;
        }

        .tree-container {
          user-select: none;
        }

        .tree-item {
          padding: 4px 8px;
          cursor: pointer;
          transition: background-color 0.15s;
          border-radius: 3px;
          margin: 1px 4px;
        }

        .tree-item:hover {
          background-color: #2a2d2e;
        }

        .tree-item.selected {
          background-color: #37373d;
        }

        .tree-item-content {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tree-icon {
          color: #cccccc;
          flex-shrink: 0;
        }

        .tree-label {
          font-size: 13px;
          color: #cccccc;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .new-file-dialog {
          margin: 8px 12px 16px 12px;
          padding: 12px;
          background-color: #2d2d30;
          border-radius: 4px;
          border: 1px solid #3e3e42;
        }

        .dialog-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .empty-folder {
          padding: 20px 12px;
          text-align: center;
        }

        .empty-folder p {
          font-size: 12px;
          color: #969696;
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
};

export default LeftPanel;

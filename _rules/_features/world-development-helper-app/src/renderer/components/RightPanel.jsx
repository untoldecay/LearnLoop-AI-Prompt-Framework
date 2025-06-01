import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, MessageSquare, Settings, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

const ChatMessage = ({ message, isUser, isError }) => {
  return (
    <div className={`chat-message ${isUser ? 'user' : 'ai'} ${isError ? 'error' : ''}`}>
      <div className="message-avatar">
        {isUser ? <User size={16} /> : isError ? <AlertCircle size={16} /> : <Bot size={16} />}
      </div>
      <div className="message-content">
        <div className="message-text">{message.text}</div>
        <div className="message-time">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

const RightPanel = ({ selectedFile, projectPath }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // N8N webhook integration
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      timestamp: new Date(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (webhookUrl && isConnected) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            message: text.trim(),
            selectedFile: selectedFile ? {
              path: selectedFile.path,
              name: selectedFile.name,
              type: selectedFile.type
            } : null,
            projectPath: projectPath,
            timestamp: new Date().toISOString(),
            context: {
              hasProject: !!projectPath,
              fileCount: 0 // TODO: Add actual file count
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const aiMessage = {
            id: Date.now() + 1,
            text: data.response || data.message || "I received your message but couldn't generate a response.",
            timestamp: new Date(),
            isUser: false
          };
          setMessages(prev => [...prev, aiMessage]);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } else {
        // Fallback placeholder response
        setTimeout(() => {
          const aiMessage = {
            id: Date.now() + 1,
            text: "AI Assistant is not configured. Please set up the N8N webhook URL in settings to enable AI responses.",
            timestamp: new Date(),
            isUser: false
          };
          setMessages(prev => [...prev, aiMessage]);
        }, 500);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: Failed to send message. ${error.message}`,
        timestamp: new Date(),
        isUser: false,
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const testConnection = async () => {
    if (!webhookUrl) {
      setConnectionStatus('error');
      return;
    }

    setConnectionStatus('testing');
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Connection test',
          test: true,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsConnected(true);
        setConnectionStatus('connected');
      } else {
        setIsConnected(false);
        setConnectionStatus('error');
      }
    } catch (error) {
      console.error('Connection test failed:', error);
      setIsConnected(false);
      setConnectionStatus('error');
    }
  };

  const saveSettings = () => {
    // Save webhook URL to localStorage or electron-store
    if (webhookUrl) {
      localStorage.setItem('n8n-webhook-url', webhookUrl);
      setShowSettings(false);
      if (webhookUrl !== '') {
        testConnection();
      }
    }
  };

  const loadSettings = () => {
    const savedUrl = localStorage.getItem('n8n-webhook-url');
    if (savedUrl) {
      setWebhookUrl(savedUrl);
      // Auto-test connection on load
      setTimeout(testConnection, 1000);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <div className="right-panel-container">
      <div className="panel-header">
        <div className="header-title">
          <MessageSquare size={14} />
          <span>AI Assistant</span>
        </div>
        <div className="header-actions">
          <button 
            className="icon-button" 
            onClick={testConnection}
            title="Test N8N Connection"
            disabled={!webhookUrl || connectionStatus === 'testing'}
          >
            {connectionStatus === 'connected' && <CheckCircle size={14} color="#4ade80" />}
            {connectionStatus === 'error' && <AlertCircle size={14} color="#f87171" />}
            {connectionStatus === 'testing' && <div className="spinner" />}
            {connectionStatus === 'disconnected' && <div className="connection-indicator disconnected" />}
          </button>
          <button 
            className="icon-button" 
            onClick={clearChat}
            title="Clear Chat"
            disabled={messages.length === 0}
          >
            <Trash2 size={14} />
          </button>
          <button 
            className="icon-button" 
            onClick={() => setShowSettings(!showSettings)}
            title="Chat Settings"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <div className="settings-header">
            <h4>AI Assistant Settings</h4>
          </div>
          <div className="settings-content">
            <div className="setting-item">
              <label>N8N Webhook URL:</label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-n8n-instance.com/webhook/..."
                className="webhook-input"
              />
            </div>
            <div className="settings-actions">
              <button className="button primary" onClick={saveSettings}>
                Save & Test
              </button>
              <button className="button" onClick={() => setShowSettings(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="chat-container">
        <div className="chat-messages scrollbar-style">
          {messages.length === 0 ? (
            <div className="chat-empty">
              <div className="empty-content">
                <Bot size={48} className="empty-icon" />
                <h3>AI Assistant Ready</h3>
                <p>Start a conversation about your world-building project. I can help you develop ideas, analyze content, and create new markdown files.</p>
                {selectedFile && (
                  <div className="context-info">
                    <span>Currently viewing: {selectedFile.name}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isUser={message.isUser}
                  isError={message.isError}
                />
              ))}
              {isLoading && (
                <div className="typing-indicator">
                  <div className="message-avatar">
                    <Bot size={16} />
                  </div>
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="chat-input-container">
          <form onSubmit={handleSubmit} className="chat-form">
            <div className="input-wrapper">
              <textarea
                className="chat-input scrollbar-style"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your world, request analysis, or get help writing..."
                rows="3"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="send-button"
                disabled={!inputValue.trim() || isLoading}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
          
          <div className="chat-status">
            <div className="status-left">
              <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
                {isConnected ? 'Connected to N8N' : 'Not Connected'}
              </span>
            </div>
            <div className="status-right">
              <span className="context-indicator">
                {selectedFile ? `Context: ${selectedFile.name}` : 'No file context'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .right-panel-container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .connection-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #f14c4c;
        }

        .connection-indicator.connected {
          background-color: #73c991;
        }

        .chat-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
        }

        .chat-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px;
        }

        .empty-content {
          text-align: center;
          max-width: 250px;
        }

        .empty-icon {
          color: #5a5a5a;
          margin-bottom: 16px;
        }

        .empty-content h3 {
          font-size: 14px;
          margin-bottom: 8px;
          color: #cccccc;
        }

        .empty-content p {
          font-size: 12px;
          color: #969696;
          line-height: 1.4;
          margin-bottom: 16px;
        }

        .context-info {
          margin-top: 16px;
          padding: 8px 12px;
          background-color: #2d2d30;
          border-radius: 4px;
          border-left: 3px solid #0e639c;
        }

        .context-info span {
          font-size: 11px;
          color: #cccccc;
        }

        .settings-panel {
          background-color: #2d2d30;
          border-bottom: 1px solid #3e3e42;
          padding: 12px;
        }

        .settings-header h4 {
          margin: 0 0 12px 0;
          font-size: 13px;
          color: #cccccc;
          font-weight: 600;
        }

        .setting-item {
          margin-bottom: 12px;
        }

        .setting-item label {
          display: block;
          font-size: 12px;
          color: #cccccc;
          margin-bottom: 4px;
        }

        .webhook-input {
          width: 100%;
          background-color: #3c3c3c;
          border: 1px solid #3e3e42;
          color: #cccccc;
          padding: 6px 8px;
          border-radius: 3px;
          font-size: 12px;
          font-family: 'Monaco', 'Menlo', monospace;
        }

        .webhook-input:focus {
          outline: none;
          border-color: #0e639c;
        }

        .settings-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid #3e3e42;
          border-top: 2px solid #0e639c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .chat-message.error {
          border-left: 3px solid #f87171;
          background-color: #fef2f220;
        }

        .chat-message.error .message-avatar {
          color: #f87171;
        }

        .chat-message.error .message-text {
          color: #f87171;
        }

        .empty-content p {
          font-size: 12px;
          color: #969696;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .context-info {
          padding: 8px 12px;
          background-color: #2d2d30;
          border-radius: 4px;
          font-size: 11px;
          color: #969696;
        }

        .messages-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-message {
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }

        .chat-message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #3c3c3c;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #cccccc;
        }

        .chat-message.user .message-avatar {
          background-color: #0e639c;
        }

        .message-content {
          flex: 1;
          max-width: 80%;
        }

        .chat-message.user .message-content {
          text-align: right;
        }

        .message-text {
          background-color: #3c3c3c;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.4;
          color: #cccccc;
          white-space: pre-wrap;
        }

        .chat-message.user .message-text {
          background-color: #0e639c;
          color: white;
        }

        .message-time {
          font-size: 10px;
          color: #969696;
          margin-top: 4px;
        }

        .typing-indicator {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .typing-dots {
          background-color: #3c3c3c;
          padding: 8px 12px;
          border-radius: 12px;
          display: flex;
          gap: 4px;
        }

        .typing-dots span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #969696;
          animation: typing 1.5s infinite;
        }

        .typing-dots span:nth-child(2) {
          animation-delay: 0.3s;
        }

        .typing-dots span:nth-child(3) {
          animation-delay: 0.6s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }

        .chat-input-container {
          border-top: 1px solid #3e3e42;
          padding: 12px;
        }

        .chat-form {
          margin-bottom: 8px;
        }

        .input-wrapper {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .chat-input {
          flex: 1;
          background-color: #3c3c3c;
          border: 1px solid #5a5a5a;
          color: #cccccc;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          resize: none;
          min-height: 36px;
          max-height: 120px;
        }

        .chat-input:focus {
          border-color: #0e639c;
        }

        .chat-input::placeholder {
          color: #969696;
        }

        .send-button {
          background-color: #0e639c;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          min-width: 36px;
          height: 36px;
        }

        .send-button:hover:not(:disabled) {
          background-color: #1177bb;
        }

        .send-button:disabled {
          background-color: #5a5a5a;
          cursor: not-allowed;
        }

        .chat-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          color: #969696;
        }

        .status-indicator.connected {
          color: #73c991;
        }

        .status-indicator.disconnected {
          color: #f14c4c;
        }
      `}</style>
    </div>
  );
};

export default RightPanel;
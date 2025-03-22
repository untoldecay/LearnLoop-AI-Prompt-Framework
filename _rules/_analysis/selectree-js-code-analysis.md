# Selectree UI JavaScript Code Analysis

## Overview

This document analyzes the JavaScript code (`ui-script.js`) that drives the Selectree Figma plugin UI. The code handles the user interaction, state management, and communication with the Figma plugin backend.

## Code Structure

The JavaScript code follows a functional organization with several key components:

1. **State Management**
2. **UI Updates and Animations**
3. **Event Handlers**
4. **Communication with Plugin Backend**
5. **Debug Utilities**

## Key State Variables

```javascript
// State variables
let targetSelected = false;
let parentSelected = false;
let debugEntries = [];
```

These variables track:
- Whether a target layer has been selected
- Whether a parent scope has been selected
- Debug log entries for troubleshooting

## UI Management Functions

### Button Updates

```javascript
function updateButtons() {
  const targetItem = document.getElementById('selectTarget');
  const parentItem = document.getElementById('selectParent');
  const findBtn = document.getElementById('findSimilar');

  if (targetSelected) {
    targetItem.classList.add('active');
    parentItem.classList.remove('disabled');
  } else {
    targetItem.classList.remove('active');
    parentItem.classList.add('disabled');
  }

  if (parentSelected) {
    parentItem.classList.add('active');
  } else {
    parentItem.classList.remove('active');
  }

  findBtn.disabled = !(targetSelected && parentSelected);
}
```

This function updates the button states based on the current selection state. It:
- Activates/deactivates the target selection button
- Enables/disables the parent selection button based on target selection
- Enables/disables the Find Similar button when both selections are made

### Message Display

```javascript
function showMessage(type, text) {
  // Get all message containers
  const stepsMessages = document.querySelector('.steps-messages');
  const errorsMessages = document.querySelector('.errors-messages');
  const successMessages = document.querySelector('.success-messages');
  
  // Hide all message containers first
  stepsMessages.style.display = 'none';
  errorsMessages.style.display = 'none';
  successMessages.style.display = 'none';
  
  // Select the appropriate container based on message type
  let container;
  if (type === 'error') {
    container = errorsMessages;
  } else if (type === 'success') {
    container = successMessages;
  } else {
    container = stepsMessages;
  }
  
  // Update the message text and show the container
  const messageEl = container.querySelector('.message');
  if (messageEl) {
    messageEl.textContent = text;
    container.style.display = 'flex';
  }
}
```

This function manages different types of messages (info, error, success) in the UI.

## Event Handlers

### Selection Handlers

```javascript
function onSelectTarget() {
  parent.postMessage({ pluginMessage: { type: 'select-target' } }, '*');
}

function onSelectParent() {
  if (targetSelected) {
    parent.postMessage({ pluginMessage: { type: 'select-parent' } }, '*');
  }
}
```

These functions handle when the user clicks on the target or parent selection buttons, sending messages to the plugin backend.

### Action Handlers

```javascript
function onFindSimilar(event) {
  event.preventDefault();
  parent.postMessage({ pluginMessage: { type: 'find-similar' } }, '*');
  
  // Show loading state
  showMessage('info', 'Finding similar layers...');
  
  // Apply loading animation to the button
  const button = document.getElementById('findSimilar');
  button.classList.add('loading');
}

function onCancel() {
  clearMessage();
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
}
```

These functions handle the Find Similar and Cancel actions.

## Communication with Plugin

The most critical part of the code is the message handler that receives messages from the plugin backend:

```javascript
onmessage = (event) => {
  if (!event.data.pluginMessage) return;
  
  const msg = event.data.pluginMessage;
  
  if (msg.type === 'target-selected') {
    targetSelected = true;
    document.getElementById('targetName').textContent = msg.name;
    clearMessage();
    updateButtons();
    
    // Show next step message
    showMessage('info', 'Now select a parent element to define the search scope');
  }
  else if (msg.type === 'parent-selected') {
    parentSelected = true;
    document.getElementById('parentName').textContent = msg.name;
    clearMessage();
    updateButtons();
    
    // Show next step message
    showMessage('info', 'Click "Find Similar" to search for similar elements');
  }
  else if (msg.type === 'watching-target') {
    const targetItem = document.getElementById('selectTarget');
    if (targetItem) {
      targetItem.classList.add('watching');
    }
    showMessage('info', msg.message);
  }
  // ... additional message handlers
};
```

This handler processes various message types:
- `target-selected`: Updates UI when a target is selected
- `parent-selected`: Updates UI when a parent is selected
- `watching-target` and `watching-parent`: Adds watching animation
- `current-selection`: Updates display of currently selected element
- `selection-complete`: Shows success message after finding similar layers
- `reset`: Resets all UI states
- `error`, `info`, `debug`: Handles different types of messages

## Initialization

The code initializes the UI when the document loads:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  updateButtons();
  
  // Add event listeners to buttons
  const targetBtn = document.getElementById('selectTarget');
  const parentBtn = document.getElementById('selectParent');
  const findBtn = document.getElementById('findSimilar');
  const cancelBtn = document.getElementById('cancel');
  
  if (targetBtn) targetBtn.addEventListener('click', onSelectTarget);
  if (parentBtn) parentBtn.addEventListener('click', onSelectParent);
  if (findBtn) findBtn.addEventListener('click', onFindSimilar);
  if (cancelBtn) cancelBtn.addEventListener('click', onCancel);
});
```

This sets up all the event listeners and initializes the UI state.

## Debug Features

The code includes several debugging utilities:

```javascript
function addDebugEntry(message, data) {
  debugEntries.push({ message, data });
  const debugLog = document.getElementById('debugLog');
  if (!debugLog) return;
  
  const entry = document.createElement('div');
  entry.className = 'debug-entry';
  
  let text = message;
  if (data) {
    text += '\n' + JSON.stringify(data, null, 2);
  }
  
  entry.textContent = text;
  debugLog.appendChild(entry);
  debugLog.scrollTop = debugLog.scrollHeight;
}

function toggleDebug(e) {
  e.preventDefault();
  const debugLog = document.getElementById('debugLog');
  if (debugLog) {
    debugLog.classList.toggle('visible');
  }
}

function copyLogs(e) {
  e.preventDefault();
  const logText = debugEntries.map(entry => {
    let text = entry.message;
    if (entry.data) {
      text += '\n' + JSON.stringify(entry.data, null, 2);
    }
    return text;
  }).join('\n\n');
  
  navigator.clipboard.writeText(logText).then(() => {
    parent.postMessage({ pluginMessage: { type: 'notify', message: 'Logs copied to clipboard' } }, '*');
  });
}
```

These functions allow for debugging during development and troubleshooting.

## Gaps in Current Implementation vs. Enhanced UI States

When comparing the current JavaScript implementation to the enhanced UI state model described in the analysis document, several gaps are apparent:

1. **Missing Enhanced States**:
   - The current implementation only uses `active` and `watching` states
   - Missing `step2`, `step3`, and `step4` states for progressive disclosure
   - No handling of the validation buttons (Ok/reload)

2. **Limited State Management**:
   - Only tracks boolean flags for selection (`targetSelected`, `parentSelected`)
   - No tracking of validation states (`targetValidated`, `parentValidated`)
   - No handling for the distinction between selection and validation

3. **Simplified Flow**:
   - Current flow is more linear with fewer steps
   - No explicit validation steps
   - No handling of layer pre-selection when modifying selections

4. **Message Handling**:
   - Missing message types for handling validation events
   - No message type for checking existing Figma selection 
   - No auto-validation flow when layer is already selected

## Required Changes for Enhanced UI

To implement the enhanced UI states, the following changes would be needed:

1. **Extended State Variables**:
   ```javascript
   let isWatchingForTarget = false;
   let isWatchingForParent = false;
   let targetSelected = false;
   let targetValidated = false;
   let parentSelected = false;
   let parentValidated = false;
   ```

2. **New CSS Class Management**:
   ```javascript
   // Example for updating target selection
   function updateTargetSelection(name) {
     const targetItem = document.getElementById('selectTarget');
     targetItem.classList.remove('watching');
     targetItem.classList.add('step2');
     document.getElementById('targetName').textContent = name;
     targetSelected = true;
     updateButtons();
   }
   
   // Example for validating target
   function validateTargetSelection() {
     const targetItem = document.getElementById('selectTarget');
     const sqrBtn = targetItem.querySelector('.cta.sqr');
     
     targetItem.classList.remove('step2');
     targetItem.classList.add('step3');
     sqrBtn.classList.add('active');
     targetValidated = true;
     
     const parentItem = document.getElementById('selectParent');
     parentItem.classList.remove('disabled');
     parentItem.classList.add('watching');
     isWatchingForParent = true;
     
     showMessage('info', 'Select a layer as Parent layer from your canvas');
   }
   ```

3. **Enhanced Message Handling**:
   ```javascript
   else if (msg.type === 'check-selection-result') {
     if (msg.hasSelection) {
       // Auto-validate if layer is already selected
       if (isWatchingForTarget) {
         updateTargetSelection(msg.name);
         validateTargetSelection();
       } else if (isWatchingForParent) {
         updateParentSelection(msg.name);
         validateParentSelection();
       }
     } else {
       // Enter watching state if no layer is selected
       if (!targetValidated) {
         const targetItem = document.getElementById('selectTarget');
         targetItem.classList.add('watching');
         isWatchingForTarget = true;
       } else {
         const parentItem = document.getElementById('selectParent');
         parentItem.classList.add('watching');
         isWatchingForParent = true;
       }
     }
   }
   ```

4. **Square Button Handlers**:
   ```javascript
   function setupSquareButtons() {
     const targetSqrBtn = document.querySelector('#selectTarget .cta.sqr');
     const parentSqrBtn = document.querySelector('#selectParent .cta.sqr');
     
     if (targetSqrBtn) {
       targetSqrBtn.addEventListener('click', function() {
         if (this.classList.contains('active')) {
           // Change target selection
           this.classList.remove('active');
           parent.postMessage({ pluginMessage: { type: 'check-selection' } }, '*');
         } else {
           // Validate current target selection
           this.classList.add('active');
           validateTargetSelection();
         }
       });
     }
     
     // Similar handler for parent square button
   }
   ```

## Conclusion

The current JavaScript implementation provides a basic framework for the Selectree plugin UI but lacks the sophisticated state management and validation flow described in the enhanced UI state model. Implementing the changes outlined above would transform the UI to provide a more interactive, guided experience with clearer visual feedback at each step of the process.

The code is well-structured and follows good practices such as:
- Separation of concerns between state management, UI updates, and communication
- Clear function naming and organization
- Comprehensive error and message handling
- Debug utilities for troubleshooting

With the proposed enhancements, the Selectree plugin would deliver a more polished, user-friendly experience that aligns with modern UX principles.

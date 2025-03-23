# Figma Plugin Communication Learning Card

## UI-to-Plugin Communication

### Core Concept
Figma plugins operate in two separate contexts:
1. **Plugin Code** - Runs in the Figma environment with access to the document
2. **Plugin UI** - Runs in an iframe with access to HTML/CSS/JS

### Communication Pattern

```
┌────────────────┐                      ┌────────────────┐
│                │                      │                │
│   Plugin UI    │  parent.postMessage  │  Plugin Code   │
│   (iframe)     │ ─────────────────>  │  (figma env)   │
│                │                      │                │
└────────────────┘                      └────────────────┘
        ▲                                      │
        │                                      │
        │       figma.ui.postMessage           │
        └──────────────────────────────────────┘
```

### How It Works

#### 1. From UI to Plugin

```javascript
// In UI code (e.g., ui-script.js)
function onSelectParent() {
  if (targetSelected) {
    parent.postMessage({ pluginMessage: { type: 'select-parent' } }, '*');
  }
}
```

* `parent` refers to the parent window (the Figma plugin environment)
* `postMessage()` is a web API for cross-frame communication
* `pluginMessage` property is required by Figma's API
* `type` property identifies the action being requested
* `'*'` specifies any origin can receive the message

#### 2. From Plugin to UI

```javascript
// In plugin code (e.g., code.js)
figma.ui.onmessage = (msg) => {
  if (msg.type === 'select-parent') {
    isWatchingForParent = true;
    // Start watching for selection in Figma
    figma.ui.postMessage({ 
      type: 'watching-parent',
      message: 'Now select a parent element' 
    });
  }
};
```

* `figma.ui.onmessage` receives messages from the UI
* `figma.ui.postMessage()` sends messages back to the UI

### Typical Communication Flow

1. **UI Action**: User clicks a button in the UI
2. **UI → Plugin**: UI sends message to plugin using `parent.postMessage()`
3. **Plugin Processing**: Plugin processes the message in `figma.ui.onmessage`
4. **Plugin Action**: Plugin performs actions in Figma (selection, creation, etc.)
5. **Plugin → UI**: Plugin sends result/status back to UI using `figma.ui.postMessage()`
6. **UI Update**: UI updates to reflect the current state

### Best Practices

1. **Type-based Routing**: Use a `type` property to route messages to the correct handler
2. **Structured Data**: Include all necessary data in your message objects
3. **Error Handling**: Include error handling in both directions
4. **State Management**: Keep UI and plugin states synchronized

### Example: Complete Communication Cycle

```
┌─────────────────┐     { type: 'select-parent' }     ┌─────────────────┐
│                 │ ──────────────────────────────>   │                 │
│      UI         │                                    │     Plugin      │
│                 │   { type: 'parent-selected',       │                 │
│                 │ <────  name: 'Frame 1' }  ────────│                 │
└─────────────────┘                                    └─────────────────┘
```

This mechanism enables the seemingly seamless integration between your plugin's UI and its functionality, despite them running in separate contexts.

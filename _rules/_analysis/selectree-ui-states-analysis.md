# Selectree UI States Analysis (Revised)

## Overview
This document analyzes the enhanced UI design for the Selectree plugin, focusing on the various visual states and user flow. The design implements a progressive disclosure pattern with clear visual feedback and explicit validation steps at each stage.

## Selection Item States

### 1. Default/Initial State
- **Visual Characteristics:**
  - Background: `var(--color-background-default)`
  - Border: 1px solid primary color
  - Label: Fully visible
  - Target Name: Hidden (opacity: 0)
- **Purpose:** Base state for selection items

### 2. Active State (`.active`)
- **Visual Characteristics:**
  - Full opacity
  - Standard border color
  - Cursor: pointer
- **Purpose:** Indicates which selection item is currently in focus/ready for interaction

### 3. Disabled State (`.disabled`)
- **Visual Characteristics:**
  - Opacity: 0.5
  - Border: 1px solid transparent
  - Cursor: not-allowed
- **Purpose:** Indicates an element that cannot be interacted with yet (e.g., parent scope when target is not selected)

### 4. Watching State (`.watching`)
- **Visual Characteristics:**
  - Animation: Pulsing border color between primary and secondary colors
  - Otherwise identical to active state
- **Purpose:** Visual feedback that the plugin is waiting for the user to make a selection in Figma

### 5. Step 2 State (`.step2`)
- **Visual Characteristics:**
  - Background: rgba(var(--color-primary-rgb), 0.20) (light blue)
  - Label: Shifted left (min-width: 43px)
  - Icon: Moved to left position
  - Target Name: Visible (opacity: 1)
  - Message List: Shifted up to show second message
  - Validation Button: Visible with "Ok" text
- **Purpose:** Indicates layer selection is made but awaiting user validation

### 6. Step 3 State (`.step3`)
- **Visual Characteristics:**
  - Background: Default
  - Border: Transparent
  - Content: Reduced opacity (0.5)
  - Icon: Reduced size (scale: 0.7)
  - Message List: Shifted to show third message
- **Purpose:** Indicates an item that was validated and is now in "completed" state

### 7. Step 4 State (`.step4`)
- **Visual Characteristics:**
  - Similar to Step 3 visual state
  - Message List: Shifted to show fourth message
- **Purpose:** Final state before the selection process completes

### Validation Button States
- **Initial State:**
  - Shows "Ok" text
  - Used to confirm a selection
- **Active State (`.active`):**
  - Shows reload icon
  - Used to change/update a previous selection
  - When clicked, returns associated item to "watching" state

## User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        INITIAL STATE                        │
│                                                             │
│  ┌───────────────┐        ┌───────────────┐                 │
│  │ Target (.watching) │   │ Parent (.disabled) │            │
│  └───────────────┘        └───────────────┘                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     TARGET LAYER SELECTED                   │
│                                                             │
│  ┌───────────────┐        ┌───────────────┐                 │
│  │ Target (.step2) │      │ Parent (.disabled) │            │
│  │ [Ok Button]     │      └───────────────┘                 │
│  └───────────────┘                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     TARGET VALIDATED                        │
│                                                             │
│  ┌───────────────┐        ┌───────────────┐                 │
│  │ Target (.step3) │      │ Parent (.watching) │            │
│  │ [⟳ Button]     │      └───────────────┘                 │
│  └───────────────┘                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    PARENT LAYER SELECTED                    │
│                                                             │
│  ┌───────────────┐        ┌───────────────┐                 │
│  │ Target (.step3) │      │ Parent (.step2) │               │
│  │ [⟳ Button]     │      │ [Ok Button]     │               │
│  └───────────────┘        └───────────────┘                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     PARENT VALIDATED                        │
│                                                             │
│  ┌───────────────┐        ┌───────────────┐     ┌─────────┐ │
│  │ Target (.step3) │      │ Parent (.step3) │   │ Find Btn │ │
│  │ [⟳ Button]     │      │ [⟳ Button]     │   │ (enabled) │ │
│  └───────────────┘        └───────────────┘     └─────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     SELECTION COMPLETE                      │
│                                                             │
│                    (Success message shown)                  │
└─────────────────────────────────────────────────────────────┘
```

## Detailed User Flow Description

1. **Initial State - Target Already Watching**
   - **Starting Condition:**
     - Target item starts in "watching" state (pulsing border)
     - Parent item is disabled
     - Message shows "Select a layer as Target layer from your canvas"
     - Find button is disabled
   - **Purpose:** User can immediately select a layer in Figma without having to first click in UI

2. **Target Layer Selected (Not Yet Validated)**
   - **Trigger:** User selects a layer in Figma
   - **UI Changes:**
     - Target item transitions to "step2" state
     - Target name becomes visible (showing selected layer name)
     - Square "Ok" button appears for validation
     - Message changes to "Validate selection as Target layer or select another layer"
   - **Purpose:** Shows selected layer and awaits user confirmation

3. **Target Validated**
   - **Trigger:** User clicks "Ok" button on target item
   - **UI Changes:**
     - Target item transitions to "step3" state (dimmed)
     - "Ok" button changes to reload icon button
     - Parent item enters "watching" state (pulsing border)
     - Message changes to "Select a layer as Parent layer from your canvas"
   - **Purpose:** Confirms target selection and transitions to parent selection

4. **Parent Layer Selected (Not Yet Validated)**
   - **Trigger:** User selects a parent layer in Figma
   - **UI Changes:**
     - Parent item transitions to "step2" state
     - Parent name becomes visible (showing selected layer name)
     - Square "Ok" button appears for validation
     - Message changes to "Validate selection as Parent layer or select another layer"
   - **Purpose:** Shows selected parent and awaits user confirmation

5. **Parent Validated**
   - **Trigger:** User clicks "Ok" button on parent item
   - **UI Changes:**
     - Parent item transitions to "step3" state (dimmed)
     - "Ok" button changes to reload icon button
     - Find button becomes enabled
     - Message indicates user should click "Match!" to find similar layers
   - **Purpose:** Confirms parent selection and enables finding similar layers

6. **Modification of Previous Selections**
   - **Trigger:** User clicks reload icon button on either target or parent
   - **UI Changes:**
     - **With layer already selected in Figma:**
       - Immediately uses that layer as the new selection
       - Auto-validates the selection without waiting for "Ok" button
       - If target was changed: Automatically transitions to parent selection
       - If parent was changed: Activates Find button if all conditions are met
     - **Without layer selected in Figma:**
       - Item enters "watching" state
       - User must select a layer in Figma
       - After selection, returns to appropriate validation step
   - **Purpose:** Provides efficient way to change selections, with or without pre-selected layers

7. **Finding Similar Layers**
   - **Trigger:** Find button clicked
   - **UI Changes:**
     - Loading animation may appear briefly on button
     - Success message appears showing count of matches
     - Figma canvas updates to show selected elements
   - **Purpose:** Completes the main task of finding similar layers

## Implementation Considerations

### Square Button Toggle Functionality
The square buttons have two states that need to be managed:
```javascript
// Initial state - "Ok" text showing
// After clicked - Changes to reload icon
sqrBtn.addEventListener('click', function(event) {
    if (sqrBtn.classList.contains('active')) {
        // Already active, user wants to change selection
        sqrBtn.classList.remove('active');
        
        // Check if a layer is already selected in Figma
        parent.postMessage({ pluginMessage: { type: 'check-selection' } }, '*');
        
        // This will be handled by a message handler:
        // If selection exists:
        //   - Immediately use that layer
        //   - Auto-validate (no need for "Ok" button click)
        //   - Progress to next step based on which item was changed
        // If no selection:
        //   - Enter watching state
    } else {
        // Not active, user is validating current selection
        sqrBtn.classList.add('active');
        // Progress to next step
    }
});
```

### State Management in JavaScript
The UI states should be managed with the following variables:
- `isWatchingForTarget`: Boolean indicating target selection mode
- `isWatchingForParent`: Boolean indicating parent selection mode  
- `targetSelected`: Boolean indicating target has been selected (but not necessarily validated)
- `targetValidated`: Boolean indicating target has been validated
- `parentSelected`: Boolean indicating parent has been selected (but not necessarily validated)
- `parentValidated`: Boolean indicating parent has been validated

### CSS Class Management
The JavaScript should add/remove appropriate CSS classes:
```javascript
// Example validation flow
// 1. When target selected
targetItem.classList.add('step2');
targetItem.classList.remove('watching');

// 2. When target validated
targetItem.classList.remove('step2');
targetItem.classList.add('step3');
sqrBtn.classList.add('active'); // Changes to reload icon
parentItem.classList.remove('disabled');
parentItem.classList.add('watching');
```

### Animation Considerations
- Transitions between states should be smooth (300ms cubic-bezier)
- The initial "watching" animation for the target should start immediately on plugin load
- Button transitions should provide clear feedback of state changes

## Accessibility Considerations
- Square buttons should have appropriate ARIA labels that update based on their current state
- Success and error states should be announced to screen readers
- The validation flow provides users with clear control over the process

---

This analysis provides a comprehensive reference for implementing the JavaScript logic to manage all UI states, ensuring the user flow follows the designed multi-step process with explicit validation steps at each stage.

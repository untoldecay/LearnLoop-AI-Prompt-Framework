Break down the following feature into separate logical prompts that can be supplied to an AI coding assistant for implementation in logical chunks. Do not perform any code generation at this stage.

**ENHANCED BREAKDOWN WITH AUTOMATIC COMPLEXITY EVALUATION**

This enhanced breakdown process includes automatic task complexity evaluation and subdivision to ensure optimal task granularity.

Guidelines for Feature Breakdown:

1. Identify core components of the feature
2. List dependencies and prerequisites
3. Break down into small, manageable tasks
4. Consider error handling and edge cases
5. Note UI/UX requirements
6. Identify potential integration points
7. Consider testing requirements
8. Emphasize important aspects from previous discussions
9. Ensure plan aligns with user's approach and philosophy
10. **NEW: Automatically evaluate and subdivide complex tasks**

Template for Response:

1. Feature Overview
   * Brief description of the feature
   * Main objectives and expected outcome
   * User's approach and key priorities

2. Component Breakdown
   * List major components
   * Dependencies between components
   * Technical requirements

3. Implementation Steps (Initial)
   * Ordered list of tasks with estimated complexity
   * Dependencies between tasks
   * Request commits after significant steps

4. **AUTOMATIC COMPLEXITY EVALUATION AND SUBDIVISION**
   
   **Apply complexity evaluation to each implementation step:**
   
   For each task in Implementation Steps:
   
   a) **Complexity Assessment** (using @complexity-evaluation.md):
      - Evaluate using 6-factor scoring system
      - Calculate final complexity score (1-5)
      - Document factor breakdown and reasoning
   
   b) **Subdivision Decision**:
      - IF complexity score > 3: Apply subdivision using @task-subdivision-logic.md
      - IF complexity score ≤ 3: Keep original task
   
   c) **Subdivision Process** (if needed):
      - Select appropriate strategy (Sequential/Component/Functional)
      - Generate subtasks with target complexity 2-3
      - Validate dependencies and logical flow
      - Ensure original requirements preservation

5. Implementation Steps (Final - After Subdivision)
   * **Refined task list with optimized complexity**
   * Clear dependencies between all tasks/subtasks
   * Estimated complexity score for each task (2-3 range)
   * Implementation order with reasoning
   * Subdivision notes where applied

6. Considerations
   * Security, performance, and error handling needs
   * Testing requirements
   * **NEW: Complexity management and subdivision quality**

7. Validation Criteria
   * Success criteria and test scenarios
   * Edge cases to consider
   * **NEW: Task complexity within acceptable range (2-3)**

8. Learning Capture Plan
   * Key technical issues likely to be encountered
   * Concise solutions for common problems (token-efficient format)
   * Focus on AI-relevant knowledge, not human documentation
   * **NEW: Complexity evaluation insights and subdivision learnings**

9. ETA
   * Estimated completion time for entire feature
   * Breakdown of time for each implementation step
   * **NEW: Adjusted estimates based on subdivision refinements**

## Complexity Evaluation Integration Process

### Step 1: Initial Task List Creation
Create initial implementation steps following standard breakdown guidelines.

### Step 2: Complexity Evaluation
For each implementation task, apply complexity evaluation:

```
## Task Complexity Evaluation

**Task**: [Task description]

### Factor Assessment:
- Implementation Scope: [1-5] - [justification]
- Logic Complexity: [1-5] - [justification]  
- Dependencies: [1-5] - [justification]
- Testing Requirements: [1-5] - [justification]
- Implementation Time: [1-5] - [justification]
- Risk Level: [1-5] - [justification]

**Calculation**: ([Primary avg] × 0.4) + ([Secondary avg] × 0.3) + ([Tertiary avg] × 0.3) = [Final score]

**Subdivision Required**: [Yes/No based on score > 3]
```

### Step 3: Subdivision Application (if needed)
For tasks with complexity > 3:

```
## Task Subdivision

**Original Task**: [Original task description]
**Complexity Score**: [Score] / 5
**Strategy**: [Sequential/Component/Functional]

### Subdivided Tasks:

#### Subtask 1: [Title]
- **Description**: [What this accomplishes]
- **Estimated Complexity**: [2-3]
- **Dependencies**: [Prerequisites]
- **Deliverable**: [Clear outcome]

#### Subtask 2: [Title]
- **Description**: [What this accomplishes]
- **Estimated Complexity**: [2-3]
- **Dependencies**: [Prerequisites]
- **Deliverable**: [Clear outcome]

[Continue for all subtasks...]

### Implementation Order:
1. [Subtask 1] - [Sequence reasoning]
2. [Subtask 2] - [Sequence reasoning]
[Continue...]
```

### Step 4: Final Task List Generation
Combine non-subdivided tasks with subdivided tasks to create the final implementation plan.

## Quality Validation Checklist

Before proceeding to implementation:

- [ ] All tasks have complexity score ≤ 3
- [ ] Dependencies are clearly defined and minimal
- [ ] Implementation order is logical
- [ ] Original feature requirements fully covered
- [ ] Each task has clear deliverable and success criteria
- [ ] Subdivision maintains coherence where applied
- [ ] Time estimates realistic for complexity levels

After user validation of your enhanced breakdown proposal:

1. **CRITICAL: CREATE FEATURE FOLDER AND PLAN FILE IMMEDIATELY**
   * Create a dedicated folder in "_rules/_features" named after the feature (e.g., "_rules/_features/[feature-name]")
   * Inside this folder, create a plan .md file named after the feature (e.g., "_rules/_features/[feature-name]/[feature-name]-plan.md")
   * Create a 'devlog' subfolder for implementation logs (e.g., "_rules/_features/[feature-name]/devlog/")
   * **NEW: Create 'complexity-analysis' subfolder for subdivision documentation**
   * DO NOT implement any code until folder structure is created and confirmed

2. **Enhanced Plan File Format**
   * Use checklist format with sections:
     - [ ] Feature requirements
     - [ ] Component implementation (with complexity scores)
     - [ ] Testing
     - [ ] Learning capture
     - [ ] Review
   * Include ETA section to update after each step
   * **NEW: Include complexity analysis summary**
   * **NEW: Document subdivision decisions and reasoning**
   * If based on analysis from "_rules/_analysis", include reference link

⚠️ **IMPORTANT WARNING**: 
- DO NOT GENERATE ANY OTHER DOCUMENT THAN REQUESTED. Only create files specified in these instructions.
- NEVER skip creating the feature folder and plan file in "_rules/_features".
- ALWAYS create the plan file BEFORE implementing any code.
- **NEW: ALWAYS apply complexity evaluation to all tasks before finalizing plan**
- **NEW: DOCUMENT subdivision decisions in complexity-analysis folder**
- DO NOT OUTPUT THE ENTIRE SUMMARY OF WHAT YOU DONE IN THE CHAT CREATING THE FEATURE FOLDER AND PLAN FILE, JUST A COMPACT OVERVIEW (too overwhelming otherwise)
- ALWAYS ITERATE ON EXISTING FILES unless specifically instructed otherwise by the user. Do not create draft files or temporary versions - modify the actual target files directly to minimize file proliferation and cognitive load.
- MAINTAIN PLAN CONSISTENCY: When marking tasks as completed, ALWAYS update BOTH the component checkboxes at the top of the plan AND the implementation steps at the bottom. Keep all progress indicators in sync.

Enhanced Implementation Process and User Flow:

1. **Enhanced Initial Implementation**
   * Implement tasks in first step of breakdown plan (now optimally complex)
   * Thoroughly test implementation
   * Document challenges/deviations in "01-[feature-title]-devlog-[title]-[date].md" inside the 'devlog' folder
   * **NEW: Document complexity accuracy in devlog**

2. **Validation Request:**
   * Present completed step to user for validation
   * Include what has been implemented, test results, and next steps
   * **NEW: Report actual vs estimated complexity**
   * Ask directly for validation or change requests without artificial UI elements
   * Example: "I've completed [step] (estimated complexity: [X], actual: [Y]). Here's what was implemented. Does this look good or would you like changes?"

3. **After User Validation:**
   * Update ETA in feature plan
   * Mark step as done in BOTH component sections AND implementation steps: `- [x] Completed step`
   * Document challenges in "XX-[feature-name]-devlog-[title]-[date].md" in the 'devlog' folder
   * **NEW: Update complexity analysis with actual implementation insights**
   * Request commit with suggested message
   * Example: "Should I commit these changes with message: 'feat: implement [feature] - [functionality]'?"

4. **Before Next Step:**
   * Confirm updated ETA
   * Verify documentation is current
   * Validate plan consistency to ensure both component checkboxes and implementation steps are in sync
   * **NEW: Review complexity estimates for remaining tasks based on learnings**
   * Ask about proceeding to next step
   * Example: "Updated ETA is [estimate]. Plan consistency validated. Complexity estimates reviewed. Ready to proceed with [next step]?"

5. **Repeat Process** for each implementation step

6. **Final Validation:**
   * Present entire feature implementation to user for final validation
   * Compile token-efficiently the most important learnings from 'devlog' folder into '_rules/_learnings/ai/' for AI assistant reference
   * **NEW: Include complexity evaluation accuracy and subdivision effectiveness insights**
   * Focus ONLY on problems encountered and solutions found to prevent repeating mistakes in future
   * Use concise, structured format with minimal narrative and maximum information density
   * Include implementation summary, test results, and documentation status
   * Ask directly about documentation needs

7. **Documentation Completion:**
   * If requested, create documentation in "_rules/_documentation" folder following '_rules/_prompts/documentation.md'
   * Update feature tracking file
   * **NEW: Archive complexity analysis for future reference**
   * Suggest final review

## Integration Notes

This enhanced breakdown template integrates:
- Automatic complexity evaluation using established criteria
- Task subdivision logic for optimal granularity
- Quality validation to ensure manageable task sizes
- Enhanced documentation and learning capture
- Improved ETA accuracy through complexity-based estimation

The result is a more structured, predictable, and manageable feature implementation process.
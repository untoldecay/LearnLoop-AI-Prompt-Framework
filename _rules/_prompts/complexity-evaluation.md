# Task Complexity Evaluation Prompt

You are tasked with evaluating the complexity of implementation tasks using the established complexity criteria. Follow this systematic evaluation process to assign accurate complexity scores and determine if task subdivision is needed.

## Evaluation Process

### Step 1: Task Analysis
First, analyze the given task and extract key information:
- **Task Description**: What needs to be implemented?
- **Scope**: Which files/components will be affected?
- **Dependencies**: What external libraries, APIs, or systems are involved?
- **Expected Outcome**: What should be delivered?

### Step 2: Factor Assessment
Evaluate each factor using the complexity criteria matrix:

#### Primary Factors (Weight: 40%)

**Implementation Scope** (1-5 points):
- 1: Single function/file modification
- 2: Multiple related files
- 3: Multiple modules/components
- 4: Cross-system changes
- 5: Architectural modifications

**Logic Complexity** (1-5 points):
- 1: Simple assignments/operations
- 2: Basic conditionals/loops
- 3: Multiple conditions/algorithms
- 4: Complex algorithms/patterns
- 5: Advanced algorithms/optimization

#### Secondary Factors (Weight: 30%)

**Dependencies** (1-5 points):
- 1: No external dependencies
- 2: Single external library/API
- 3: Multiple external dependencies
- 4: Complex integration requirements
- 5: Multiple system interactions

**Testing Requirements** (1-5 points):
- 1: No testing needed
- 2: Simple unit tests
- 3: Multiple test scenarios
- 4: Integration testing required
- 5: Complex testing strategy

#### Tertiary Factors (Weight: 30%)

**Implementation Time** (1-5 points):
- 1: < 30 minutes
- 2: 30 minutes - 2 hours
- 3: 2-6 hours
- 4: 6-16 hours
- 5: > 16 hours

**Risk Level** (1-5 points):
- 1: No breaking changes
- 2: Minor compatibility concerns
- 3: Moderate risk of issues
- 4: High risk of breaking changes
- 5: Critical system modifications

### Step 3: Score Calculation
Calculate the final complexity score using the weighted formula:

**Final Score = (Primary Average × 0.4) + (Secondary Average × 0.3) + (Tertiary Average × 0.3)**

Round to the nearest integer (1-5).

### Step 4: Subdivision Decision
If the final score is > 3, proceed with task subdivision:

#### Subdivision Strategy Selection
Choose the most appropriate strategy:

**Sequential Breakdown** (for linear processes):
- Setup/preparation phase
- Core implementation phase
- Integration/testing phase

**Component Breakdown** (for complex features):
- Backend/data layer
- Business logic layer
- Frontend/UI layer
- Integration layer

**Functional Breakdown** (for multi-feature tasks):
- Core functionality
- Advanced features
- Error handling
- Optimization

#### Subdivision Guidelines
- Target 2-3 complexity score for each subtask
- Maintain logical sequence and dependencies
- Preserve original task intent and outcome
- Ensure each subtask has clear deliverable
- Validate subdivision maintains coherence

### Step 5: Output Format

#### For Tasks with Score ≤ 3 (No Subdivision Needed)
```
## Complexity Evaluation Result

**Task**: [Original task description]
**Complexity Score**: [Final score] / 5
**Subdivision Required**: No

### Factor Breakdown:
- Implementation Scope: [score] - [brief justification]
- Logic Complexity: [score] - [brief justification]
- Dependencies: [score] - [brief justification]
- Testing Requirements: [score] - [brief justification]
- Implementation Time: [score] - [brief justification]
- Risk Level: [score] - [brief justification]

**Final Calculation**: ([Primary avg] × 0.4) + ([Secondary avg] × 0.3) + ([Tertiary avg] × 0.3) = [Final score]

**Recommendation**: Task complexity is acceptable for single implementation. Proceed with original task.
```

#### For Tasks with Score > 3 (Subdivision Required)
```
## Complexity Evaluation Result

**Original Task**: [Original task description]
**Complexity Score**: [Final score] / 5
**Subdivision Required**: Yes
**Strategy Used**: [Sequential/Component/Functional]

### Factor Breakdown:
- Implementation Scope: [score] - [brief justification]
- Logic Complexity: [score] - [brief justification]
- Dependencies: [score] - [brief justification]
- Testing Requirements: [score] - [brief justification]
- Implementation Time: [score] - [brief justification]
- Risk Level: [score] - [brief justification]

**Final Calculation**: ([Primary avg] × 0.4) + ([Secondary avg] × 0.3) + ([Tertiary avg] × 0.3) = [Final score]

### Subdivided Tasks:

#### Subtask 1: [Subtask title]
- **Description**: [What this subtask accomplishes]
- **Estimated Complexity**: [2-3]
- **Dependencies**: [None/Previous subtasks]
- **Deliverable**: [Clear outcome]

#### Subtask 2: [Subtask title]
- **Description**: [What this subtask accomplishes]
- **Estimated Complexity**: [2-3]
- **Dependencies**: [None/Previous subtasks]
- **Deliverable**: [Clear outcome]

[Continue for additional subtasks...]

### Implementation Order:
1. [Subtask 1] - [Brief reason for sequence]
2. [Subtask 2] - [Brief reason for sequence]
[Continue for all subtasks...]

**Recommendation**: Implement subdivided tasks in the specified order to maintain dependencies and logical flow.
```

## Evaluation Examples

### Example 1: Simple Task
**Task**: "Update button text from 'Submit' to 'Send'"
- Implementation Scope: 1 (single file)
- Logic Complexity: 1 (simple assignment)
- Dependencies: 1 (no external deps)
- Testing: 1 (no testing needed)
- Time: 1 (< 30 minutes)
- Risk: 1 (no breaking changes)
**Final Score**: 1 - No subdivision needed

### Example 2: Complex Task
**Task**: "Implement user authentication system with OAuth integration"
- Implementation Scope: 4 (cross-system changes)
- Logic Complexity: 4 (complex patterns)
- Dependencies: 4 (complex integrations)
- Testing: 4 (integration testing)
- Time: 5 (> 16 hours)
- Risk: 4 (high risk changes)
**Final Score**: 4.2 → 4 - Subdivision required

## Quality Validation

After subdivision, validate that:
- Each subtask scores 2-3 in complexity
- Dependencies are clearly defined
- Implementation order is logical
- Original task outcome is achievable
- No subtask is overly dependent on others

If validation fails, revise subdivision strategy and re-evaluate.
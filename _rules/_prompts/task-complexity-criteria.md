# Task Complexity Evaluation Criteria

## Complexity Scoring System (1-5 Scale)

### Scoring Guidelines

**Score 1 - Trivial**
- Single file edit with minimal logic
- Simple text/content changes
- No dependencies or interactions
- Implementation time: < 30 minutes
- Examples: Update text, change styling, add simple comment

**Score 2 - Simple** 
- Single component/function implementation
- Minimal external dependencies
- Straightforward logic flow
- Implementation time: 30 minutes - 2 hours
- Examples: Add basic validation, create simple utility function, basic UI component

**Score 3 - Moderate**
- Multiple file changes required
- Some external dependencies or API integration
- Moderate logic complexity
- Implementation time: 2-6 hours
- Examples: Form with validation and submission, basic CRUD operations, simple state management

**Score 4 - Complex**
- Multiple components/modules involved
- Complex business logic or algorithms
- Multiple external dependencies
- Cross-system integration required
- Implementation time: 6-16 hours
- Examples: Authentication system, complex data processing, multi-step workflows

**Score 5 - Very Complex**
- Architectural changes required
- Multiple systems integration
- Complex algorithms or data structures
- Significant testing requirements
- Implementation time: > 16 hours
- Examples: Database schema changes, new framework integration, complex security implementations

## Subdivision Threshold

**Automatic Subdivision Trigger:** Tasks with complexity score > 3

**Subdivision Rules:**
- Score 4 tasks: Break into 2-3 subtasks (target score 2-3 each)
- Score 5 tasks: Break into 3-5 subtasks (target score 2-3 each)
- Maintain logical sequence and dependencies
- Preserve original task intent and outcome

## Evaluation Criteria Matrix

### Primary Factors (Weight: 40%)

**Implementation Scope**
- Single function/file (1 point)
- Multiple related files (2 points)
- Multiple modules/components (3 points)
- Cross-system changes (4 points)
- Architectural modifications (5 points)

**Logic Complexity**
- Simple assignments/operations (1 point)
- Basic conditionals/loops (2 points)
- Multiple conditions/algorithms (3 points)
- Complex algorithms/patterns (4 points)
- Advanced algorithms/optimization (5 points)

### Secondary Factors (Weight: 30%)

**Dependencies**
- No external dependencies (1 point)
- Single external library/API (2 points)
- Multiple external dependencies (3 points)
- Complex integration requirements (4 points)
- Multiple system interactions (5 points)

**Testing Requirements**
- No testing needed (1 point)
- Simple unit tests (2 points)
- Multiple test scenarios (3 points)
- Integration testing required (4 points)
- Complex testing strategy (5 points)

### Tertiary Factors (Weight: 30%)

**Implementation Time**
- < 30 minutes (1 point)
- 30 minutes - 2 hours (2 points)
- 2-6 hours (3 points)
- 6-16 hours (4 points)
- > 16 hours (5 points)

**Risk Level**
- No breaking changes (1 point)
- Minor compatibility concerns (2 points)
- Moderate risk of issues (3 points)
- High risk of breaking changes (4 points)
- Critical system modifications (5 points)

## Calculation Method

**Final Score = (Primary Factors Average × 0.4) + (Secondary Factors Average × 0.3) + (Tertiary Factors Average × 0.3)**

Round to nearest integer (1-5)

## Subdivision Guidelines

### When to Subdivide
- Any task scoring > 3 should be evaluated for subdivision
- Consider natural breakpoints and logical boundaries
- Preserve dependencies and execution order
- Ensure each subtask has clear deliverable

### Subdivision Strategies

**Sequential Breakdown** (for linear processes)
- Step 1: Setup/preparation
- Step 2: Core implementation  
- Step 3: Integration/testing

**Component Breakdown** (for complex features)
- Backend/data layer
- Business logic layer
- Frontend/UI layer
- Integration layer

**Functional Breakdown** (for multi-feature tasks)
- Core functionality
- Advanced features
- Error handling
- Optimization

### Subdivision Quality Checks
- Each subtask scores 2-3 in complexity
- Subtasks maintain logical coherence
- Dependencies are clearly defined
- Implementation order is preserved
- Original task outcome is achievable

## Examples

**Example 1: "Implement user authentication system" (Original Score: 5)**

Subdivision:
1. Create user model and database schema (Score: 3)
2. Implement login/logout endpoints (Score: 3) 
3. Add frontend authentication forms (Score: 2)
4. Integrate session management (Score: 2)
5. Add security middleware and testing (Score: 3)

**Example 2: "Add email validation to form" (Original Score: 2)**

No subdivision needed - complexity is acceptable for single implementation.

**Example 3: "Build real-time chat feature" (Original Score: 5)**

Subdivision:
1. Setup WebSocket connection infrastructure (Score: 3)
2. Implement message sending/receiving (Score: 3)
3. Add chat UI components (Score: 2)
4. Implement message persistence (Score: 3)
5. Add user presence and notifications (Score: 3)
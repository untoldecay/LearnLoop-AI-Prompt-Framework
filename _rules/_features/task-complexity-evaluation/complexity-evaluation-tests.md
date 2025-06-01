# Complexity Evaluation Test Suite

## Test Case 1: Trivial Task (Expected Score: 1)

**Task**: "Fix typo in README.md file - change 'recieve' to 'receive'"

### Expected Evaluation:
- Implementation Scope: 1 (single file)
- Logic Complexity: 1 (simple text change)
- Dependencies: 1 (no external dependencies)
- Testing Requirements: 1 (no testing needed)
- Implementation Time: 1 (< 30 minutes)
- Risk Level: 1 (no breaking changes)

**Expected Final Score**: 1
**Expected Subdivision**: No

## Test Case 2: Simple Task (Expected Score: 2)

**Task**: "Add client-side email validation to contact form"

### Expected Evaluation:
- Implementation Scope: 2 (multiple related files - form component + validation)
- Logic Complexity: 2 (basic conditional logic for email regex)
- Dependencies: 1 (no external dependencies)
- Testing Requirements: 2 (simple unit tests)
- Implementation Time: 2 (1-2 hours)
- Risk Level: 1 (no breaking changes)

**Expected Final Score**: 1.7 → 2
**Expected Subdivision**: No

## Test Case 3: Moderate Task (Expected Score: 3)

**Task**: "Create user profile page with form validation and image upload"

### Expected Evaluation:
- Implementation Scope: 3 (multiple components - form, validation, upload)
- Logic Complexity: 3 (multiple conditions, file handling)
- Dependencies: 2 (image processing library)
- Testing Requirements: 3 (multiple test scenarios)
- Implementation Time: 3 (4-6 hours)
- Risk Level: 2 (minor compatibility concerns)

**Expected Final Score**: 2.7 → 3
**Expected Subdivision**: No (borderline, but acceptable)

## Test Case 4: Complex Task (Expected Score: 4)

**Task**: "Implement real-time notifications system with WebSocket connections and push notifications"

### Expected Evaluation:
- Implementation Scope: 4 (cross-system changes - backend, frontend, notification service)
- Logic Complexity: 4 (complex real-time patterns, connection management)
- Dependencies: 4 (WebSocket library, push notification service, database)
- Testing Requirements: 4 (integration testing, real-time scenarios)
- Implementation Time: 4 (8-12 hours)
- Risk Level: 3 (moderate risk of connection issues)

**Expected Final Score**: 3.8 → 4
**Expected Subdivision**: Yes (3-4 subtasks)

### Expected Subdivision:
1. Setup WebSocket infrastructure and connection handling (Score: 3)
2. Implement notification data model and persistence (Score: 2)
3. Create frontend notification UI components (Score: 2)
4. Integrate push notification service and testing (Score: 3)

## Test Case 5: Very Complex Task (Expected Score: 5)

**Task**: "Migrate entire application from REST API to GraphQL with schema stitching and real-time subscriptions"

### Expected Evaluation:
- Implementation Scope: 5 (architectural modifications across entire system)
- Logic Complexity: 5 (advanced GraphQL patterns, schema design)
- Dependencies: 5 (multiple GraphQL libraries, migration tools)
- Testing Requirements: 5 (complex testing strategy, migration validation)
- Implementation Time: 5 (> 20 hours)
- Risk Level: 5 (critical system modifications)

**Expected Final Score**: 5
**Expected Subdivision**: Yes (4-5 subtasks)

### Expected Subdivision:
1. Design GraphQL schema and setup basic server (Score: 3)
2. Migrate core entities and implement resolvers (Score: 3)
3. Implement real-time subscriptions (Score: 3)
4. Update frontend to use GraphQL client (Score: 3)
5. Migration testing and performance optimization (Score: 2)

## Test Case 6: Edge Case - Unclear Scope

**Task**: "Improve application performance"

### Expected Behavior:
- Should request clarification on specific performance areas
- Should not assign score without clear scope definition
- Should suggest breaking down into specific performance improvements

## Test Case 7: Edge Case - Multiple Concerns

**Task**: "Add user authentication, implement file upload, and create admin dashboard"

### Expected Behavior:
- Should identify this as multiple separate features
- Should suggest breaking into individual tasks before complexity evaluation
- Each component should be evaluated separately

## Test Case 8: Boundary Testing - Score 3.5

**Task**: "Implement search functionality with filters, pagination, and sorting"

### Expected Evaluation:
- Implementation Scope: 3 (multiple components)
- Logic Complexity: 3 (search algorithms, filtering logic)
- Dependencies: 3 (search library, database queries)
- Testing Requirements: 4 (multiple search scenarios)
- Implementation Time: 3 (4-6 hours)
- Risk Level: 2 (minor performance concerns)

**Expected Final Score**: 3.1 → 3
**Expected Subdivision**: No (just above threshold but manageable)

## Validation Criteria for Tests

### Scoring Accuracy
- Scores should be within ±0.5 of expected values
- Subdivision decisions should match expectations
- Factor assessments should be logically justified

### Subdivision Quality
- Each subtask should score 2-3 in complexity
- Dependencies should be clearly maintained
- Implementation order should be logical
- Original task outcome should be achievable

### Edge Case Handling
- Unclear tasks should request clarification
- Multi-feature tasks should be identified and separated
- Boundary cases should be handled consistently

## Test Execution Process

1. **Run Evaluation**: Apply complexity-evaluation.md prompt to each test case
2. **Compare Results**: Check actual vs expected scores and subdivisions
3. **Validate Logic**: Ensure factor assessments are reasonable
4. **Check Subdivisions**: Verify subtask quality and dependencies
5. **Document Deviations**: Note any unexpected results and analyze causes

## Success Criteria

- 90% of test cases produce expected scores (±0.5)
- 100% of subdivision decisions are correct
- All subdivided tasks meet quality criteria
- Edge cases are handled appropriately
- Evaluation reasoning is clear and consistent
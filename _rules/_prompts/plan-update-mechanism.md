# Plan Update Mechanism

## Overview

The plan update mechanism automatically modifies existing plan files to incorporate subdivided tasks from complexity evaluation, maintaining plan structure, dependencies, and progress tracking while ensuring seamless integration with the Learnloop framework.

## Core Update Algorithm

### Input Requirements
- Original plan file path
- Subdivision analysis results
- Task complexity evaluations
- Dependency mappings
- Implementation progress status

### Update Process Steps

#### Step 1: Plan File Analysis
```
ANALYZE existing_plan_file:
  - Parse current structure and sections
  - Identify implementation steps section
  - Extract existing task list and progress
  - Preserve completed tasks and dependencies
  - Map current ETA and time estimates
```

#### Step 2: Subdivision Integration Mapping
```
FOR each subdivided_task:
  IDENTIFY original_task_position in plan
  EXTRACT subdivision_results:
    - Subtask list with complexity scores
    - Dependency relationships
    - Implementation order
    - Time estimates
  PRESERVE original_task_context:
    - Prerequisites
    - Related components
    - Success criteria
```

#### Step 3: Plan Structure Preservation
```
MAINTAIN plan_integrity:
  - Keep all original sections intact
  - Preserve checklist format and structure
  - Maintain component implementation tracking
  - Retain ETA and progress indicators
  - Keep learning capture and validation sections
```

#### Step 4: Task Replacement Logic
```
FOR each task requiring subdivision:
  IF task_status == completed:
    PRESERVE as-is with completion markers
  ELIF task_status == in_progress:
    SPLIT into completed_subtasks + remaining_subtasks
    MAINTAIN progress indicators
  ELSE:
    REPLACE with subdivision_results
    UPDATE dependency chains
    RECALCULATE time estimates
```

#### Step 5: Dependency Chain Updates
```
UPDATE dependency_relationships:
  - Map original dependencies to subdivided tasks
  - Ensure prerequisite chains remain valid
  - Identify new parallel execution opportunities
  - Preserve sequential requirements
  - Update implementation order accordingly
```

## Plan File Structure Management

### Section Preservation Rules

#### Feature Requirements Section
```
PRESERVE exactly as-is:
  - [ ] Original requirements checklist
  - No modifications to high-level requirements
  - Maintain original requirement tracking
```

#### Component Implementation Section
```
UPDATE with subdivision details:
  - [ ] Original component → [status]
    - [ ] Subtask 1 (Complexity: 2)
    - [ ] Subtask 2 (Complexity: 3)
    - [ ] Subtask 3 (Complexity: 2)
  - Maintain parent-child relationship
  - Preserve completion status hierarchy
```

#### Implementation Steps Section
```
REPLACE subdivided tasks:
  ### Step X: Original Task Title
  - [ ] Subtask X.1: [Description] (Complexity: 2)
  - [ ] Subtask X.2: [Description] (Complexity: 3)
  - [ ] Subtask X.3: [Description] (Complexity: 2)
  
  Dependencies: [Updated dependency chain]
  Time estimate: [Recalculated based on subtasks]
```

### Progress Tracking Integration

#### Completion Status Mapping
```
IF original_task == completed:
  MARK all_subtasks as completed
  PRESERVE completion_timestamps
  MAINTAIN devlog_references

IF original_task == in_progress:
  ANALYZE progress_level
  MARK appropriate_subtasks as completed
  UPDATE remaining_task_estimates
  PRESERVE work_completed_indicators
```

#### ETA Recalculation
```
CALCULATE new_eta:
  completed_time = SUM(completed_subtask_estimates)
  remaining_time = SUM(remaining_subtask_estimates)
  total_estimated = completed_time + remaining_time
  
UPDATE eta_section:
  - Original estimate vs new estimate comparison
  - Progress percentage based on subdivided tasks
  - Revised completion timeline
```

## File Operation Procedures

### Backup and Safety
```
BEFORE any modifications:
  CREATE backup_file = original_plan + "_backup_" + timestamp
  VALIDATE file_structure_integrity
  ENSURE write_permissions available
  
IF update_fails:
  RESTORE from backup_file
  LOG error_details for analysis
  RETURN failure_status with explanation
```

### Atomic Updates
```
UPDATE process:
  1. READ original_plan_content
  2. GENERATE updated_content in memory
  3. VALIDATE updated_structure
  4. WRITE to temporary_file
  5. VERIFY temporary_file integrity
  6. ATOMIC_REPLACE original with temporary
  7. CLEANUP temporary and backup files
```

### Validation Checks
```
POST_UPDATE validation:
  - All original sections present
  - Checklist format preserved
  - Dependencies remain valid
  - ETA calculations correct
  - No data loss occurred
  - File structure integrity maintained
```

## Update Templates

### Subdivided Task Template
```
### Step [X]: [Original Task Title] (Subdivided for Complexity)

**Original Complexity**: [Score] → **Target Complexity**: 2-3 per subtask
**Subdivision Strategy**: [Sequential/Component/Functional]

#### Subtask [X.1]: [Subtask Title]
- [ ] [Detailed description of subtask]
- **Complexity**: [2-3]
- **Dependencies**: [Prerequisites from other tasks/subtasks]
- **Deliverable**: [Clear outcome expected]
- **Time Estimate**: [Hours/days]

#### Subtask [X.2]: [Subtask Title]
- [ ] [Detailed description of subtask]
- **Complexity**: [2-3]
- **Dependencies**: [Prerequisites from other tasks/subtasks]
- **Deliverable**: [Clear outcome expected]
- **Time Estimate**: [Hours/days]

[Continue for all subtasks...]

**Implementation Order**: 
1. Subtask [X.1] - [Reasoning for sequence]
2. Subtask [X.2] - [Reasoning for sequence]
[Continue...]

**Subdivision Notes**: [Why subdivision was applied, strategy chosen]
```

### Component Implementation Update Template
```
## Component Implementation
- [x] **Component A** - [Original description]
- [ ] **Component B** - [Original description] (Subdivided)
  - [ ] Component B.1: [Subtask description] (Complexity: 2)
  - [ ] Component B.2: [Subtask description] (Complexity: 3)
  - [ ] Component B.3: [Subtask description] (Complexity: 2)
- [ ] **Component C** - [Original description]
```

### ETA Update Template
```
## ETA
**Total Estimated Time**: [Original] → [Updated] days
**Current Status**: [Current phase with subdivision details]
**Next Milestone**: [Next task/subtask to be completed]
**Last Updated**: [Timestamp of subdivision update]

### Time Allocation Breakdown:
- Completed work: [X] hours
- Remaining subdivided tasks: [Y] hours
- Original estimate accuracy: [Percentage]
- Subdivision impact: [Positive/Neutral/Negative] time adjustment

### Progress Tracking:
- Tasks completed: [X] of [Total]
- Subtasks from subdivision: [X] of [Y]
- Overall completion: [Percentage]%
```

## Error Handling and Recovery

### Common Error Scenarios

#### File Access Issues
```
IF file_locked OR permission_denied:
  WAIT for file_availability (max 30 seconds)
  RETRY operation
  IF still_failed:
    LOG error_details
    RETURN failure with suggested_manual_steps
```

#### Structure Corruption
```
IF plan_structure_invalid:
  ATTEMPT structure_repair using templates
  IF repair_successful:
    CONTINUE with update
  ELSE:
    RESTORE from backup
    SUGGEST manual_review
```

#### Dependency Conflicts
```
IF dependency_chain_broken:
  ANALYZE conflict_source
  SUGGEST dependency_resolution
  PROVIDE manual_update_guidance
  PRESERVE original_plan integrity
```

### Recovery Procedures
```
UPDATE failure_recovery:
  1. RESTORE original_plan from backup
  2. LOG detailed_error_information
  3. GENERATE error_report with:
     - Failure point identification
     - Suggested manual corrections
     - Alternative subdivision approaches
  4. NOTIFY user of failure and next steps
```

## Integration Points

### Complexity Evaluation Integration
```
RECEIVE from complexity_evaluation:
  - Task complexity scores
  - Subdivision requirements
  - Strategy recommendations
  - Quality validation results

APPLY to plan_update:
  - Automatic subdivision triggering
  - Subtask generation
  - Dependency preservation
  - ETA recalculation
```

### Breakdown Template Integration
```
COORDINATE with breakdown_enhanced:
  - Receive subdivision instructions
  - Apply to existing plans
  - Maintain template compatibility
  - Preserve workflow continuity
```

### Version Control Integration
```
SUPPORT git_workflow:
  - Generate meaningful_commit_messages
  - Track plan_evolution over time
  - Enable diff_viewing for changes
  - Maintain change_history
```

## Quality Assurance

### Update Validation Checklist
```
POST_UPDATE verification:
  ✓ All original sections preserved
  ✓ Subdivided tasks have complexity 2-3
  ✓ Dependencies remain valid and minimal
  ✓ ETA calculations accurate
  ✓ Progress tracking functional
  ✓ File structure integrity maintained
  ✓ Backup created successfully
  ✓ No data loss occurred
```

### Performance Metrics
```
TRACK update_performance:
  - Update processing time
  - File size impact
  - Subdivision accuracy
  - User satisfaction with results
  - Error rate and recovery success
```

## Usage Guidelines

### When to Apply Updates
- After complexity evaluation identifies high-complexity tasks
- When subdivision analysis provides subtask breakdown
- During plan refinement phases
- Before implementation phase begins

### Best Practices
- Always create backups before updates
- Validate subdivision quality before applying
- Preserve user customizations and notes
- Maintain clear audit trail of changes
- Test updates on copy before applying to main plan

### Integration Workflow
1. Run complexity evaluation on plan tasks
2. Generate subdivision analysis for complex tasks
3. Apply plan update mechanism
4. Validate updated plan structure
5. Commit changes with descriptive message
6. Continue with implementation using updated plan
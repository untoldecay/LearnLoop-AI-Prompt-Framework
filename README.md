# 🤖 AI Prompt Framework

A structured system that transforms how developers work with AI coding assistants, bringing software engineering best practices to AI interactions.

## 🚀 What This Framework Does

For developers and teams working with AI coding assistants, this framework solves common frustrations:

| Without Framework | With Framework |
|----------------|---------------|
| Inconsistent code quality | Enforced coding standards across AI outputs |
| Lost context and repeated explanations | Structured memory system preserves important details |
| Wasted tokens on repeated instructions | Optimized AI interactions with focused tasks |
| Incomplete documentation | Built-in documentation workflows |
| Testing challenges | Self-contained test environments |

**Who is this for?** Development teams and individual developers who want to leverage AI assistants while maintaining professional code standards. This framework helps you:

- Establish consistent AI interaction patterns
- Implement proper software engineering practices
- Create maintainable, well-documented code
- Preserve knowledge across AI interactions

## 🚀 Getting Started

### Quick Setup

```bash
# Option 1: Clone directly (recommended for new projects)
git clone https://github.com/your-username/ai-prompt-framework.git my-project
cd my-project
rm -rf .git  # Remove existing git history
git init     # Start fresh git repository

# Option 2: Add to existing project
git clone https://github.com/your-username/ai-prompt-framework.git temp
cp -r temp/_rules your-existing-project/
rm -rf temp
```

### Step-by-Step Installation

1. **Add Framework Files**
   - Copy the entire `_rules` folder to your project root
   - Ensure all subdirectories are included (`_prompts`, `_features`, etc.)

2. **Configure AI Assistant**
   - Copy the content of `_rules/.windsufrules` into your AI assistant's custom instructions
   - For Windsurf-compatible AI assistants, this enables all framework features
   - For other AI assistants, you may need to adapt the instructions format

3. **Verify Installation**
   - Check that the following structure exists in your project:
     ```
     your-project/
     ├── _rules/
     │   ├── .windsufrules
     │   ├── _prompts/
     │   ├── _features/
     │   └── _documentation/
     └── ... (your project files)
     ```
   - Test with a simple prompt: `@_rules/_prompts/breakdown.md for a simple feature`

### Troubleshooting

| Problem | Solution |
|---------|----------|
| AI assistant doesn't recognize framework files | Ensure file paths are correct and use the @ symbol when referencing files |
| Missing subdirectories | Re-copy the entire _rules directory to ensure all components are included |
| Custom instructions not working | Check character limits of your AI assistant; you may need to prioritize rules |

## Core Principles

Each principle enforces professional software engineering standards in AI-generated code:

### 📖 Readability
- **What**: Debug logs & comments for easier debugging and maintenance
- **Why**: Makes troubleshooting faster and onboarding new developers easier
- **Example**:
  ```javascript
  // Good practice
  function processUserData(userData) {
    console.log("Processing user data:", userData.id);
    // Validate input before processing
    if (!userData.email) {
      console.error("Missing email in user data");
      return false;
    }
    return true;
  }
  
  // Instead of
  function processUserData(userData) {
    if (!userData.email) return false;
    return true;
  }
  ```

### 📚 Documentation
- **What**: Docstrings, parameter docs, and detailed function descriptions
- **Why**: Preserves knowledge and ensures consistent understanding
- **Example**:
  ```python
  def calculate_user_metrics(user_id, start_date=None, include_inactive=False):
      """
      Calculate engagement metrics for the specified user.
      
      Args:
          user_id (int): The unique identifier of the user
          start_date (datetime, optional): The start date for metrics calculation
          include_inactive (bool): Whether to include inactive periods
          
      Returns:
          dict: Dictionary containing engagement metrics
              - session_count (int): Number of sessions
              - average_duration (float): Average session duration in minutes
      
      Raises:
          ValueError: If user_id doesn't exist
      """
      # Implementation
  ```

### 🛡️ Error Handling
- **What**: Try-catch blocks with meaningful error messages
- **Why**: Prevents cryptic crashes and improves debugging
- **Example**:
  ```javascript
  // Good practice
  try {
    const data = JSON.parse(userInput);
    processData(data);
  } catch (error) {
    console.error(`Failed to process user input: ${error.message}`);
    showUserFriendlyError("We couldn't process your request. Please check the format and try again.");
  }
  
  // Instead of
  const data = JSON.parse(userInput);
  processData(data);
  ```

### 🧪 Testing
- **What**: Self-contained test folders with dedicated dependencies
- **Why**: Ensures code reliability and prevents regressions
- **Implementation**: 
  - Each test folder is self-contained with its own package.json
  - Tests run independently without relying on parent project
  - Test dependencies are explicitly declared

### 🧩 Maintainability
- **What**: DRY principle & single-purpose functions
- **Why**: Makes code easier to update, maintain, and reuse
- **Example**:
  ```javascript
  // Good practice: Single-purpose functions
  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 8;
  }
  
  function validateUserInput(user) {
    return validateEmail(user.email) && validatePassword(user.password);
  }
  
  // Instead of
  function validateUser(user) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(user.email) && user.password.length >= 8;
  }
  ```

### 🏗️ Code Modularization
- **What**: Facade pattern for files over 1000 lines
- **Why**: Improves code organization and maintainability
- **Implementation**: 
  - Alert when files exceed 600 lines
  - Apply facade pattern at 1000+ lines
  - Original file becomes facade that re-exports from specialized modules

### 🔄 Version Control
- **What**: Standardized commit format with descriptive messages
- **Why**: Makes project history clear and meaningful
- **Example**:
  ```
  feat: add user authentication flow
  - Implement login form validation
  - Add JWT token handling
  - Create authentication middleware
  ```

## How To Use

This framework provides structured workflows for common AI assistant interactions:

### 📋 Planning Features

```bash
# Request a feature breakdown
@_rules/_prompts/breakdown.md for implementing user authentication
```

This creates a structured plan with:
- Feature overview and requirements
- Component breakdown with dependencies
- Implementation steps with ETA
- Validation criteria

**Example workflow:**
1. Ask your AI assistant to create a feature plan: "Please follow @_rules/_prompts/breakdown.md to create a plan for user authentication"
2. Review the generated plan in `_rules/_features/user-authentication/user-authentication-plan.md`
3. Implement each step, updating the plan as you go: "Let's continue implementing step 2 from @_rules/_features/user-authentication/user-authentication-plan.md"

### 🏗️ Modularizing Large Files

When files exceed 600 lines, the framework helps refactor them for better maintainability:

```bash
# Request code modularization
@_rules/_prompts/facade_modularization.md for refactoring utils.js
```

**Example workflow:**
1. Identify a large file that needs refactoring
2. Ask your AI assistant: "Please follow @_rules/_prompts/facade_modularization.md to refactor utils.js"
3. Review the proposed modularization strategy
4. Implement the changes incrementally, testing each module

### 📚 Creating Documentation

After completing a feature, preserve knowledge with structured documentation:

```bash
# Request documentation creation
@_rules/_prompts/documentation.md for the user authentication feature
```

**Example workflow:**
1. Complete feature implementation and testing
2. Request documentation: "Please follow @_rules/_prompts/documentation.md to document the user authentication feature"
3. Review documentation in `_rules/_documentation/user-authentication.md`
4. Share with team members for knowledge transfer

### 🧠 Learning Concepts

Use the framework to create structured educational content:

```bash
# Request educational content
@_rules/_prompts/teach.md about JWT authentication
```

**Example workflow:**
1. Identify a concept you want to learn
2. Request educational content: "Please follow @_rules/_prompts/teach.md to explain JWT authentication"
3. Study the generated learning materials
4. Ask follow-up questions for clarification

### 🧪 Creating Encapsulated Tests

Build isolated, self-contained tests for your features:

```bash
# Request test creation
Create an isolated test for the login component
```

**Example workflow:**
1. Identify a component that needs testing
2. Request test creation: "Create an isolated test for the login component"
3. Review and run the test in its dedicated folder
4. Once satisfied, integrate with your main test suite

### 🔄 End-to-End Project Workflow

For a complete project using this framework:

1. **Start with Exploration**: Discuss approaches with your AI assistant
2. **Create Feature Plan**: Use `@_rules/_prompts/breakdown.md` to plan implementation
3. **Implement in Steps**: Follow the plan, updating as you go
4. **Test Thoroughly**: Create isolated tests for each component
5. **Document**: Create documentation when the feature is complete
6. **Refactor When Needed**: Apply modularization as code grows
7. **Learn and Improve**: Use learning prompts to expand knowledge

## 🔧 Troubleshooting

### Common Framework Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| **AI doesn't follow rules** | Rules not properly loaded in context | Use `@_rules/.windsufrules` to restore all rules |
| **Plan not being updated** | Step completion markers missing | Mark steps with `- [x]` in BOTH component and implementation sections |
| **Tests failing to run** | Missing dependencies | Check that test directory has its own package.json with all dependencies |
| **Devlog files inconsistent** | Incorrect naming convention | Follow pattern: `XX-feature-name-devlog-title-date.md` with sequential numbering |
| **Framework doesn't appear to work** | Missing required files | Verify all core files in `_rules/_prompts/` directory exist |
| **AI confused by previous context** | Too much history in conversation | Start a new conversation and reference specific files |
| **Generated files in wrong location** | Path specification error | Use absolute paths from project root when specifying file locations |

### Debugging Process

If you encounter issues not listed above:

1. **Check File Structure**
   - Verify all required files exist in their expected locations
   - Ensure file permissions are correct

2. **Review Recent Changes**
   - Look at recent commits to identify potential regressions
   - Check for changes to core prompt files

3. **Examine Context Window**
   - Consider if AI has necessary context loaded
   - Reference specific files directly using `@` notation

4. **Create Minimal Example**
   - Create a simplified version of the issue
   - Document in a new devlog file

## 🤝 Contributing

### Contribution Process

1. **Fork the Repository**
   - Create your own fork of the project
   - Clone locally using `git clone`

2. **Set Up Development Environment**
   - Follow standard installation steps
   - Verify framework functionality

3. **Select an Issue or Feature**
   - Check existing issues or feature requests
   - Create a new issue if needed

4. **Create Implementation Plan**
   - Use `@_rules/_prompts/breakdown.md` to create a plan
   - Place plan in `_rules/_features/feature-name/`

5. **Develop and Test**
   - Follow the implementation plan
   - Create isolated tests for new functionality
   - Document progress in devlog files

6. **Submit Pull Request**
   - Create a descriptive PR title
   - Fill out the PR template
   - Reference related issues

### Coding Standards

All contributions should follow these standards:

- **Code Style**: Use consistent indentation and formatting
- **Documentation**: Include docstrings for all functions and classes
- **Testing**: Create comprehensive tests for new functionality
- **Commit Messages**: Follow the conventional commit format (e.g., `feat: add XYZ`)
- **Feature Structure**: Maintain the established folder structure

### Pull Request Guidelines

Each PR should:

- Address a single concern or feature
- Include appropriate tests
- Update documentation as needed
- Pass all CI checks
- Have a clear description of changes
- Include links to related issues

### Review Process

After submitting a PR:

1. Maintainers will review your code
2. Feedback will be provided if changes are needed
3. Once approved, your PR will be merged
4. Your contribution will be acknowledged in release notes

We welcome all contributors and appreciate your help improving this framework!

## 📂 Framework Architecture

The framework follows a structured organization to separate different types of content for optimal AI interaction:

```
project-root/
├── _rules/                 # Framework core - all AI guidance files
│   ├── _prompts/           # Reusable prompt templates 
│   ├── _features/          # Feature implementation plans and tracking
│   │   └── feature-name/   # Feature-specific folder with plan and devlogs
│   │       ├── feature-name-plan.md     # Implementation plan
│   │       └── devlog/     # Implementation journals with numbered entries
│   ├── _documentation/     # Comprehensive documentation
│   ├── _learnings/         # Educational content
│   │   ├── ai/            # Knowledge for AI assistants
│   │   └── user/          # Learning cards for humans
│   └── _requirements/      # Project requirements and specifications
├── _tests/                 # Isolated test environments
│   └── test-name/          # Self-contained test folders
├── src/                    # Source code
└── README.md               # Main documentation (this file)
```

### Key Components

#### 1. `_rules/_prompts/` - Instruction Templates

This directory contains reusable prompt templates that standardize AI interactions:

| File                     | Purpose                                           | When to Use                                |
|--------------------------|---------------------------------------------------|-------------------------------------------|
| `breakdown.md`           | Creates structured feature plans                  | At the start of new feature implementation |
| `facade_modularization.md` | Helps refactor large files                       | When files exceed 600 lines               |
| `documentation.md`       | Generates consistent documentation                | After completing a feature                |
| `teach.md`               | Creates educational content                       | When learning new concepts                |
| `add-user-learnings.md`  | Formats and saves human-readable knowledge        | After important discussions               |

#### 2. `_rules/_features/` - Implementation Tracking

Each feature gets its own subdirectory with:

- **feature-name-plan.md**: Detailed breakdown with:
  - Component implementation checklist
  - Step-by-step implementation guide
  - ETA estimates
  - Validation criteria

- **devlog/**: Implementation journals documenting:
  - Challenges encountered
  - Solution approaches
  - Deviations from plan
  - Numbered sequentially (e.g., "01-feature-name-devlog-topic-date.md")

#### 3. `_rules/_documentation/` - Comprehensive Documentation

Contains detailed documentation about completed features, including:
- Architecture decisions
- Component interactions
- API references
- Usage examples

#### 4. `_rules/_learnings/` - Knowledge Repository

Split into two key areas:
- **ai/**: Knowledge formatted for AI consumption
- **user/**: Human-readable learning cards on key topics

#### 5. `_tests/` - Isolated Testing

Contains self-contained test environments with:
- Independent package.json
- Dedicated node_modules
- Test-specific assets
- No dependencies on parent project

### Navigation Guide

#### 🧭 For New Users

1. Start with `README.md` (this file) for overview
2. Explore `_rules/_prompts/` to understand available workflows
3. Review any existing features in `_rules/_features/` for examples

#### 🧭 For Feature Development

1. Begin with `@_rules/_prompts/breakdown.md` to create plan
2. Reference plan in `_rules/_features/feature-name/feature-name-plan.md`
3. Document progress in `_rules/_features/feature-name/devlog/`
4. Create final documentation in `_rules/_documentation/`

#### 🧭 For Learning

1. Check `_rules/_learnings/user/` for educational content
2. Request new learning cards with `@_rules/_prompts/teach.md`

#### 🧭 For Testing

1. Develop tests in dedicated folders within `_tests/`
2. Run tests from their specific directories
3. Each test environment should be fully self-contained

## Best Practices

1. **Be specific in your requests to the AI assistant**
   - Specify which prompt you want to use
   - Provide all necessary context

2. **Break down large features into manageable steps**
   - Each step should be completable in 1-3 hours
   - Maintain the plan as you progress

3. **Document as you go**
   - Create devlog entries for major implementation steps
   - Note challenges and solutions

4. **Use namespaced commits**
   - Follow the commit message format: "type: description"
   - Include feature name and component in the message

5. **Maintain test isolation**
   - Each test should be self-contained
   - Don't rely on external state

6. **Prefer modification over creation**
   - Update existing files when possible
   - Avoid creating unnecessary new files

7. **Keep the AI focused on one task at a time**
   - Complete current step before starting the next
   - Provide feedback at each milestone

---
**Remember**: Always review code and suggestions carefully before implementing.

*Last updated: March 22, 2025*

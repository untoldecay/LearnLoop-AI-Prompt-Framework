# AI Prompt Framework Learning Card

## Core Concept
A structured system that helps maintain consistent code standards and optimizes AI assistance through organized rules, templates, and documentation practices.

## Key Points

### Framework Purpose
* Prevents AI from overwriting existing code or forgetting implemented features
* Reduces wasted tokens and debugging frustration
* Optimizes efficiency through focused tasks with clear documentation

### Key Components
* `_rules` directory contains all framework files and folders
* `.windsufrules` defines coding standards and practices
* `_prompts` directory contains task-specific templates
* `_features` tracks implementation progress
* `_documentation` stores completed feature documentation

### Usage Process
* Start with exploratory discussions before creating plans
* Break down complex tasks into small, manageable chunks
* Reference plans during implementation using `@_rules/_features/plan_name.md`
* Update plans with progress markers `[x]` as you implement
* Complete one feature before starting another

## Practical Application
Incorporate the framework by copying the `_rules` folder to your project root and adding `.windsufrules` content to your AI assistant's custom instructions. Use specific templates like breakdown.md for planning and documentation.md for documentation.

## Diagrams/Visuals
```
_rules/
├── .windsufrules            # Main coding standards
├── _prompts/                # Task-specific instructions
├── _features/               # Feature plans and progress
├── _documentation/          # Completed feature documentation
├── _learnings/              # Knowledge from discussions
└── requirements/            # Project requirements
```

## Common Pitfalls
* Trying to implement too many features simultaneously instead of completing one at a time
* Neglecting to update progress in feature plans
* Not breaking down complex tasks into small enough chunks
* Overlooking the need for self-contained tests

## Resources
* Project planning templates in `_rules/_prompts/breakdown.md`
* Code organization patterns in `_rules/_prompts/facade_modularization.md`
* Documentation standards in `_rules/_prompts/documentation.md`

# 🤖 Learnloop AI Prompt Framework

## Hey there! 👋
Is this worth your time?
- If you need to vibecode your way to get an idea out ASAP, it is not necessary for you
- If you need to build something relatively fast, that will also need to scale (with not much technical knowledge), it is absolutly.

### Vibecoding is fun until it's not
Did you ever found yourself caught in a meaningless loop of pushing 'next', Blindly Accepting AI Output, ending up with a jumbled mess of code? Overwhelmed, having no idea how your project works? I felt dumb.

So I had the urge to build something that helps me learn along with AI, understand, and stay in control.

## What this framework does
This framework is a collection of rules, prompts, and workflows that automates saving context (progression/insights/learnings) in a structured system helping you and your AI coding tool to flow and be more effective. (not ending up feeling dumb).

# How he does it

## The ruleset

A central part of the system is the ruleset that define how your coding assistant should behave. The concpet here is to use the ruleset like an index that will fetch different prompts on different occasions.
Extract from `_rules/.windrules`:
```
    [...]
    * IF USER ASK TO BUILD A FEATURE or a new feature:
    * Search for the feature in '_rules/_requirements/' (for context, PR are not mandatory)
    * Verify if the feature is started already inside '_rules/_features/'. If true, continue based on the ETA and plan found.
    * If false, refere to '_rules/_prompts/breakdown.md' to create a plan for this feature.
    [...]
```
**Key rules:**
* **Readability:** Debug logs & comments for easier readability
* **Rule application:** State rules applied in output
* **Documentation:** Docstrings, params, return values, comments
* **Plan and Break Down:** Plan before coding, break into manageable chunks
* **Error Handling:** Try-except blocks, meaningful messages
* **Testing:** Self-contained tests in "_tests/" folder
* **Security:** No sensitive info, env vars for secrets, validate inputs
* **Maintainability:** Focused functions, DRY principle, clean architecture
* **Code Modularization:** Facade pattern for large files
* **Version control:** Structured commit messages with prefixes

## The prompts

Prompts are the core of the framework. They are passively called by the AI assistant through the ruleset or actively by the user using `@` in chat messages. They ensure automation and consistant outputs.

### Create a Feature Plan
```
follow @breakdown.md for creating a [feature-name]]
```
**Description:** 
This prompt will create a detailed stepped plan, stored in `_rules/_features/[feature-name]/plan.md`. Before asking you to start implementing it. It will also create a `devlog` subfolder to log any insights while implementing. Pertinent insights will then be used to grow AI context in `_rules/_learnings/ai/`.

**When to use:** 
Use this when you want to start building a feature.

### Breaking Down Large Files
```
use @facade_modularization.md on @[file-or-folder-name]
```
**Description:** 
This prompt guides you through restructuring large monolithic files (>1000 lines) into logical modules using the Facade pattern. It creates a plan in `_rules/_features/` for the modularization process, and helps maintain backward compatibility while improving maintainability. The process focuses on moving existing code to appropriate module files, adding necessary imports/exports, and updating references.

**When to use:** 
Use this when your codebase has grown and files are becoming too large and difficult to maintain.

### Creating Learning Cards
```
use @add-user-learnings.md to create a learning card about what we talk about
```
**Description:** 
This prompt analyzes your conversation with the AI assistant and creates a concise learning card that captures key insights. The card is stored in `_rules/_learnings/user/` and structures knowledge with a core concept section, key points, and practical examples. It's designed to be an easily referenced educational resource that you can revisit later or share with others.

**When to use:** 
Use this when you want to capture and preserve important concepts or insights from your conversation.

### Creating Documentation
```
create @documentation.md for this test folder @[folder-name]
```
**Description:** 
This prompt generates standardized documentation for your code following a consistent naming convention (`YYYY-MM-DD_descriptive_name.md`) and storing it in `_rules/_documentation/`. The documentation includes clear title, function/class descriptions, parameters, return values, usage examples, best practices, dependencies, and suggestions for future improvements.

**When to use:** 
Use this when you've completed a feature or component and want to document it properly for future reference.

### Teaching Mode
```
enter teaching mode for learning @[technology-name]
```
**Description:** 
This prompt activates a guided learning experience where the AI becomes your development teacher. Rather than generating code for you, it analyzes what you want to build, creates a learning plan, and guides you through implementation with step-by-step instructions. It provides feedback on your code and helps you understand core concepts rather than just completing the task for you.

**When to use:** 
Use this when you want to learn a new technology with guided assistance rather than having code written for you.

### Other may be added as needed, next ones being:
- Capturing analysis
- Context extraction for the AI coding tool. 

### Folder Structure
```
_rules/                  # All the magic happens here
 ├── .windsurfrules      # The ruleset that tells AI how to behave
 ├── _prompts/           # Templates for talking to AI (user prompts)
 ├── _features/          # Your project plans (generated based on user prompts)
 ├── _documentation/     # Info about completed features (generated based on user prompts)
 └── _learnings/         # Educational materials (user insights and AI context)
 └── _tests/             # Self-contained test folders (outside _rules)
```

Each interaction becomes an opportunity to improve both your understanding and future results. 

## Benefits

### Core Benefits

| Benefit | Description |
|---------|-------------|
| **Knowledge Retention** | Each chat builds on previous interactions, preventing valuable insights from being lost |
| **Token Efficiency** | Save money with structured, focused prompts that minimize token usage |
| **Code Consistency** | Maintain working features across AI sessions, preventing regression |
| **Complexity Management** | Break complex projects into manageable, tracked steps |
| **User Learning** | Learn alongside AI instead of blindly accepting generated code |
| **Project Control** | Remain the boss of your project while leveraging AI assistance |
| **Structured Documentation** | Automatically generate and maintain documentation in a consistent format |

### Bonus Benefits

| Benefit | Description |
|---------|-------------|
| **Tool Interoperability** | Works across multiple AI coding tools (Windsurf, Cursor, Cline, etc.) |
| **Incremental Building** | Build a consistent system instead of relying on one-off commands |
| **Context Preservation** | Reference limited scope context to save time and tokens |
| **Knowledge Sharing** | Create condensed overviews of complex topics that can be shared with team members |
| **Media Transformation** | Transform markdown files into other media formats (e.g., podcasts) |
| **Guided Learning** | Use teaching mode to learn new technologies with AI guidance |
| **Architecture Improvement** | Identify and restructure monolithic files for better maintainability |

The framework bridges the gap between rapid AI code generation and sustainable development practices, ensuring you build not just working software, but understandable, maintainable systems that you fully comprehend.


## Getting Started
```bash
# Clone to your project's root
git clone https://github.com/untoldecay/LearnLoop-AI-Prompt-Framework.git my-project
cd my-project
```

For a detailed setup:
1. **Add Framework Files** - Copy the `_rules` folder to your project root
2. **Configure AI** - Copy the content of `_rules/.windsufrules` in your AI's custom instructions settings
3. **Configure Mission** - Edit `_rules/.mission` with your project's mission statement

That's it! You're ready to start using the framework.

## How It Works

Instead of open-ended questions, use `@` to call structured prompts:
**Instead of:**
> "Can you write code for a login form based on our conversation?"

**Try:**
> "Please follow `@breakdown.md` to create a plan for a login form based on our findings in `@_rules/_analysis/[topic]/`"

The AI will:
1. Use context from your previous analysis
2. Create a trackable implementation plan
3. Log implementation learnings as you go
4. Build tests inside a self-contained test folder
5. Ask for validation along the way before final review and validation


## About me
I'm product designer, illustrator, and front end developer (jquery/php coughing dust clouds), and AI enthousiast apparently.

Thanks to [Yifan](https://github.com/yifan) for having opened this window. So much useful insights on AI development.
_(my first breakdown prompt version was his, and I still have his versionning settings inside .windsurfrules I believe)_

Thanks to [Guiz](https://github.com/guillem-cotcha) for the idea of AI context enforcement by logging success and fails over feature implementation.

---

*Made with ❤️ for people who don't like to feel dumb*
By [@untoldecay](https://x.com/untoldecay)

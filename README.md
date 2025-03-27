# 🤖 Learnloop

This is a tool for AI-powered coding tools (Windsurf primarily).
It is a collection of rules, prompts, and workflows that automates saving context (progression/insights/learnings) in a structured system helping you and your AI coding tool to flow and be more effective.

**Because vibecoding is fun until it's not**

Did you ever found yourself caught in a meaningless loop of pushing 'next', blindly accepting AI output, ending up with a jumbled mess of code? Overwhelmed, having no idea how your project works? I did and felt dumb, so I had the urge to build something that helps.

**Is this framework worth your time?**

If you're looking to build something relatively quickly with AI that you'll need to understand, maintain, scale, and not miss learning opportunity, this framework is for you.

## Getting Started (2min)
```bash
git clone https://github.com/untoldecay/LearnLoop-AI-Prompt-Framework.git my-project
```
1. **Add Framework Files** - Clone or download & copy `_rules` folder to your project root
2. **Configure AI** - Copy the content of `_rules/.windsufrules` in your AI's custom instructions settings
3. **Configure Mission** - Edit `_rules/.mission` with your project's mission statement

That's it! You're ready to start using the framework.

## Demo
(Comming ASAP)

## How To Use
The framework uses a combination of passive rulesets and active prompts.
**Passive methods** when triggered will manifest and seek your validation in the chat. See [ruleset](#the-ruleset) section for more details.
**Active methods** let user call prompts whenever needed using `@` in chat messages.

### Example
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

See all featured prompt in [prompts](#the-prompts) section.

# How does it work?

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
Use this when you want to start building a feature.

**Try:**
> "follow @breakdown.md for creating a [feature-name]"

The AI will:
1. Analyze your requirements and project context
2. Create a detailed stepped plan in `_rules/_features/[feature-name]/plan.md`
3. Set up a `devlog` subfolder to log insights during implementation
4. Save pertinent insights to the AI context in `_rules/_learnings/ai/`
5. Guide you through implementation step by step

### Breaking Down Large Files
Use this when your codebase has grown and files are becoming too large and difficult to maintain.

**Try:**
> "use @facade_modularization.md on @[file-or-folder-name]"

The AI will:
1. Analyze the structure of your large file(s)
2. Create a modularization plan using the Facade pattern
3. Organize code into logical modules with clear responsibilities
4. Maintain backward compatibility throughout the process
5. Guide the implementation with focused steps for each module

### Creating Learning Cards
Use this when you want to capture and preserve important concepts or insights from your conversation.

**Try:**
> "use @add-user-learnings.md to create a learning card about what we talk about"

The AI will:
1. Analyze your conversation to identify key concepts and insights
2. Structure the knowledge with a core concept section
3. Extract key points and practical examples
4. Create a concise learning card in `_rules/_learnings/user/`
5. Provide an easily referenced educational resource for future use

### Creating Documentation
Use this when you've completed a feature or component and want to document it properly for future reference.

**Try:**
> "create @documentation.md for this test folder @[folder-name]"

The AI will:
1. Analyze the code structure and functionality
2. Generate standardized documentation with consistent naming
3. Include clear descriptions, parameters, and return values
4. Add usage examples and best practices
5. Store the documentation in `_rules/_documentation/` for easy reference

### Teaching Mode
Use this when you want to learn a new technology with guided assistance rather than having code written for you.

**Try:**
> "enter teaching mode for learning @[technology-name]"

The AI will:
1. Ask what you want to build with the technology
2. Create a learning plan tailored to your goals
3. Guide you through implementation with step-by-step instructions
4. Provide feedback on your code as you write it
5. Help you understand core concepts rather than just completing the task

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

## About me
I'm product designer, illustrator, and front end developer (jquery/php coughing dust clouds), and AI enthousiast apparently.

Thanks to [Yifan](https://github.com/yifan) for having opened this window. So much useful insights on AI development.
_(my first breakdown prompt version was his, and I still have his versionning settings inside .windsurfrules I believe)_

Thanks to [Guiz](https://github.com/guillem-cotcha) for the idea of AI context enforcement by logging success and fails over feature implementation.

---

*Made with ❤️ for people who don't like to feel dumb*
By [@untoldecay](https://x.com/untoldecay)

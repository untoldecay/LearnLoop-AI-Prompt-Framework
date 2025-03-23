# 🤖 Learnloop AI prompt Framework

A learning-focused system that helps coders stay consistent while extracting value from AI interactions.

**Solving Common AI Challenges:**

* 📚 **Knowledge Loss** → Build insights that compound with each interaction
* ⏱️ **Time & Money Waste** → Save tokens with structured, focused prompts
* 🔄 **Feature Regression** → Maintain working code across AI sessions
* 🤯 **Complexity Overload** → Break work into manageable, tracked steps

## Why Learning-Focused?

The framework creates a bidirectional learning process between you and your AI assistant, allowing to grow a shared context of the project.

* **Capture insights** from each conversation 
    **Cristalize exploration phase in** `_rules/_analysis/[topic]/` (using `add-analysis` prompt), create learning cards on-demand (using `add-user-learnings` prompt), to reference for building a plan (using `breakdown` prompt), or learning.
* **Automatically builds implementation insights repositories** 
    **For each feature, automatically logs a folder of proven approaches in** `_rules/_features/[feature-name]/devlog/`. to inspect or reuse later
* **Automatically generate documentation** with AI-generated content 
    **After feautre validation, the framework saves documentation learnings in** `_rules/_documentation/`, which could be linked from your project's main `README.md`
* **Reference past work** instead of starting from scratch **Use** `@` references to pull in previous analysis, learnings, and code patterns across sessions.

Each interaction becomes an opportunity to improve both your understanding and future results. All knowledge is stored in markdown files that could serve AI context and multiple purposes.
* Reference past work in new AI conversations
* Create condensed overviews of complex topics
* Jumpstart new explorations from previous discoveries
* Transform into other media formats like podcasts (with notebook LM ❤️)

## Getting Started
```bash
# Clone to your project's root
git clone https://github.com/untoldecay/LearnLoop-AI-Prompt-Framework.git my-project
cd my-project
```
That's it! You're ready to start using the framework.

For a detailed setup:
1. **Add Framework Files** - Copy the `_rules` folder to your project root
2. **Configure AI** - Use `_rules/.windsufrules` in your AI's custom instructions

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

## Common Workflows
#### Creating a Feature Plan
```
@_rules/_prompts/breakdown.md for creating a color picker
```
#### Breaking Down Large Files
```
@_rules/_prompts/facade_modularization.md for refactoring styles.css
```
#### Creating Learning Cards
```
@_rules/_prompts/add-user-learnings.md about CSS Grid
```
#### Creating Documentation
```
@_rules/_prompts/documentation.md about the color picker
```
Other may be added as needed.

## Folder Structure
```
_rules/                  # All the magic happens here
 ├── _prompts/           # Templates for talking to AI
 ├── _features/          # Your project plans
 ├── _documentation/     # Info about completed features
 └── _learnings/         # Educational materials
 └── _tests/             # Self-contained test folders (outside _rules)
```

## Tips for Success
1. **Starts with an exploratory chat** with your AI assistant whenever starting something new.
2. **One task at a time** - Complete each step before moving to the next
3. **Be specific** - Reference exact prompts and analysis files
4. **Keep track** - Check AI is correctly updating your plan
5. **Read generated documentation** - Your future self will thank you
6. **Capture learnings** - Use `@_rules/_prompts/add-user-learnings.md`
7. **Review before implementing** - Avoid costly generation loops

## Need Help?
If something isn't working:
* Make sure you're referencing the correct file paths
* Start a new conversation if the AI seems confused
* Check that necessary files exist in `_rules/_prompts/`
* Look at existing insights inside learning, documentation, or devlog folders

## Why I Created This
Ever found yourself in an endless loop of AI generating code, breaking things, fixing them, and breaking them again, feeling frustrated while wasting time and money?
I'm building this framework to escape that loop and understand what's happening at each step. I'm growing it for myself but wanted to share it with the world as it can help others. 
Such a tool is personal to some extent, and it will get better with time. The learning-focused approach has transformed how I work with AI, and I hope it does the same for you.

Thanks to [Yifan](https://github.com/yifan) for having opened this window. So much useful insights on AI development.
_(my first breakdown prompt version was his, and I still have his versionning settings inside .windsurfrules I believe)_

Thanks to [Guiz](https://github.com/guillem-cotcha) for the idea of AI context enforcement by logging success and fails over feature implementation.

---

*Made with ❤️ for people who don't like to feel dumb*
By [@untoldecay](https://x.com/untoldecay)
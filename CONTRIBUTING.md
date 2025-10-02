 Contributing to Focus Quest ⚔️

First off, thank you for considering contributing to Focus Quest! It's people like you that make Focus Quest such a great tool for productivity enthusiasts around the world.

## 🌟 Ways to Contribute

There are many ways you can contribute to Focus Quest:

- 🐛 **Report bugs** - Help us identify and fix issues
- 💡 **Suggest features** - Share your ideas for improvements
- 📝 **Improve documentation** - Help others understand the project better
- 🎨 **Design contributions** - UI/UX improvements and themes
- 💻 **Code contributions** - Bug fixes, features, and optimizations
- 🌍 **Translations** - Help make Focus Quest accessible to more people
- ⭐ **Spread the word** - Share Focus Quest with others

---

## 🚀 Getting Started

### Prerequisites

To contribute to Focus Quest, you'll need:

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A text editor or IDE (VS Code, Sublime Text, Atom, etc.)
- Basic knowledge of HTML, CSS, and JavaScript
- Git for version control
- A GitHub account

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/SarthakMitra323/Focus-Quest.git
   cd focus-quest
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Open the project**
   ```bash
   # Simply open index.html in your browser
   # Or use a local development server
   ```

5. **Make your changes**
   - Edit `index.html`, `style.css`, or `script.js`
   - Test your changes thoroughly
   - Ensure responsiveness on different screen sizes

6. **Test your changes**
   ```bash
   # Open index.html in multiple browsers
   # Test on different devices (desktop, tablet, mobile)
   # Check browser console for errors
   ```

---

## 📋 Contribution Guidelines

### Code Style

#### JavaScript
- Use ES6+ features (const, let, arrow functions, etc.)
- Follow consistent naming conventions:
  - `camelCase` for variables and functions
  - `PascalCase` for classes and constants
  - `UPPER_SNAKE_CASE` for global constants
- Add comments for complex logic
- Keep functions small and focused (single responsibility)
- Use meaningful variable names

```javascript
// ✅ Good
function calculateQuestProgress(questsCompleted, totalQuests) {
    const progress = (questsCompleted / totalQuests) * 100;
    return Math.min(progress, 100);
}

// ❌ Avoid
function calc(q, t) {
    return (q / t) * 100;
}
```

#### CSS
- Use CSS custom properties (variables) for colors and spacing
- Follow BEM naming convention where appropriate
- Keep selectors specific but not overly nested
- Group related properties together
- Mobile-first responsive design

```css
/* ✅ Good */
.card {
    background: var(--color-surface);
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
}

/* ❌ Avoid */
.card {
    background: rgba(255, 255, 255, 0.9);
    padding: 32px;
    border-radius: 12px;
}
```

#### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Keep markup clean and well-indented
- Use meaningful IDs and classes

```html
<!-- ✅ Good -->
<section class="card quest-form" id="questForm">
    <h2 class="card-title">📜 New Quest</h2>
    <form id="newQuestForm">
        <label for="taskTitle">Quest Title *</label>
        <input type="text" id="taskTitle" required>
    </form>
</section>

<!-- ❌ Avoid -->
<div class="box1">
    <div class="title">New Quest</div>
    <input type="text">
</div>
```

### Git Commit Messages

Write clear, descriptive commit messages:

```bash
# ✅ Good commit messages
git commit -m "Add dark mode toggle to settings panel"
git commit -m "Fix timer accuracy issue across tabs"
git commit -m "Update journey progress calculation"
git commit -m "Improve mobile responsiveness for quest form"

# ❌ Avoid vague messages
git commit -m "fix"
git commit -m "update stuff"
git commit -m "changes"
```

**Commit Message Format:**
```
<type>: <short description>

[optional longer description]

[optional footer]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, no logic change)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

---

## 🐛 Reporting Bugs

### Before Submitting a Bug Report

- Check the browser console for errors
- Test in a different browser to confirm
- Search existing issues to avoid duplicates
- Try to reproduce the bug consistently

### How to Submit a Bug Report

Create a new issue with the following information:

**Title:** Clear, descriptive title (e.g., "Timer continues running after quest completion")

**Description:**
```markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots.

## Environment
- Browser: [e.g., Chrome 118]
- OS: [e.g., Windows 11, macOS 14]
- Focus Quest Version: [e.g., 1.0.0]

## Additional Context
Any other relevant information.
```

---

## 💡 Suggesting Features

### Before Submitting a Feature Request

- Check if the feature already exists
- Search existing feature requests
- Consider if it fits the project scope
- Think about how it benefits most users

### How to Submit a Feature Request

Create a new issue with the `enhancement` label:

```markdown
## Feature Description
A clear description of the feature you'd like to see.

## Problem It Solves
Explain the problem this feature would solve.

## Proposed Solution
Describe how you envision this feature working.

## Alternatives Considered
Any alternative solutions you've thought about.

## Additional Context
Mockups, examples, or any other relevant information.
```

---

## 🔧 Pull Request Process

### Before Submitting a Pull Request

1. **Test thoroughly**
   - Test all affected functionality
   - Check in multiple browsers
   - Verify mobile responsiveness
   - Clear localStorage and test fresh state

2. **Update documentation**
   - Update README.md if needed
   - Add code comments for complex logic
   - Update CONTRIBUTING.md for workflow changes

3. **Check your code**
   - Remove console.logs (except intentional ones)
   - Remove commented-out code
   - Ensure no breaking changes
   - Verify localStorage compatibility

### Submitting a Pull Request

1. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

3. **PR Template**
   ```markdown
   ## Description
   Brief description of what this PR does.

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Code refactoring
   - [ ] Performance improvement

   ## Changes Made
   - List key changes
   - With bullet points
   - For clarity

   ## Testing Done
   - [ ] Tested in Chrome
   - [ ] Tested in Firefox
   - [ ] Tested in Safari
   - [ ] Tested on mobile
   - [ ] Verified localStorage functionality

   ## Screenshots (if applicable)
   Add screenshots of UI changes.

   ## Checklist
   - [ ] My code follows the project's style guidelines
   - [ ] I have commented complex code
   - [ ] I have updated documentation
   - [ ] My changes generate no new warnings
   - [ ] I have tested on multiple browsers
   - [ ] I have checked for responsive design
   ```

4. **Wait for review**
   - Be patient and responsive to feedback
   - Make requested changes promptly
   - Discuss any concerns openly

---

## 🎨 Adding New Journeys

Want to add a new journey theme? Here's how:

### 1. Define the Journey

Edit `script.js` and add to the `JOURNEYS` object:

```javascript
const JOURNEYS = {
    // ... existing journeys
    forest: {
        name: 'Enchanted Forest',
        emoji: '🌳',
        milestones: [
            { percent: 0, message: 'Enter the mystical forest!' },
            { percent: 25, message: 'Discovering hidden paths...' },
            { percent: 50, message: 'Halfway through the woods!' },
            { percent: 75, message: 'The ancient tree beckons!' },
            { percent: 100, message: '🌲 Forest conquered!' }
        ]
    }
};
```

### 2. Add UI Button

Edit `index.html` in the journey selection section:

```html
<div class="journey-selector">
    <!-- existing buttons -->
    <button class="journey-btn" data-journey="forest">🌳 Enchanted Forest</button>
</div>
```

### 3. Add Progress State

The state will automatically handle the new journey, but you can initialize it in `script.js`:

```javascript
let state = {
    // ...
    progress: {
        mountain: 0,
        star: 0,
        sea: 0,
        forest: 0  // Add your journey
    },
    // ...
};
```

### 4. Test
- Select the new journey
- Complete quests and verify progress
- Check milestone messages
- Verify localStorage persistence

---

## 🏆 Adding New Achievements

### 1. Define the Achievement

Add to `ACHIEVEMENT_DEFINITIONS` in `script.js`:

```javascript
{
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Complete a quest before 8 AM',
    icon: '🌅',
    check: (state) => {
        return state.quests.some(q => {
            const hour = new Date(q.completedAt).getHours();
            return hour < 8;
        });
    }
}
```

### 2. Test the Achievement

- Trigger the unlock condition
- Verify the toast notification appears
- Check that confetti launches
- Ensure it persists in localStorage
- Verify it shows in the achievements grid

---

## 🌍 Adding Translations (Future Feature)

We're planning to add internationalization support. If you'd like to help:

1. Create a translation file: `i18n/[language-code].json`
2. Follow the English structure
3. Translate all strings
4. Test with your language setting
5. Submit a PR

---

## 📊 Performance Guidelines

Keep Focus Quest fast and lightweight:

- **Minimize DOM manipulation** - Batch updates when possible
- **Avoid memory leaks** - Clear intervals and timeouts
- **Optimize animations** - Use CSS transforms and opacity
- **Keep localStorage small** - Don't store unnecessary data
- **Test on low-end devices** - Ensure smooth performance

---

## ✅ Code Review Checklist

Before requesting review, ensure:

- [ ] Code follows style guidelines
- [ ] All features work as intended
- [ ] No console errors or warnings
- [ ] Responsive on mobile, tablet, desktop
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] localStorage saves/loads correctly
- [ ] No broken animations or transitions
- [ ] Accessibility maintained (ARIA labels, keyboard navigation)
- [ ] Documentation updated if needed
- [ ] Commit messages are clear
- [ ] No commented-out code
- [ ] No hardcoded values (use CSS variables)

---

## 🤝 Community Guidelines

### Be Respectful
- Welcome newcomers
- Be patient with questions
- Provide constructive feedback
- Celebrate contributions

### Be Collaborative
- Share knowledge freely
- Help others learn
- Review code thoughtfully
- Discuss ideas openly

### Be Professional
- Keep discussions on-topic
- Avoid spam and self-promotion
- Respect different viewpoints
- Follow the code of conduct

---

## 🎯 Priority Areas

Current focus areas where contributions are especially welcome:

1. **Browser compatibility** - Testing and fixes for edge cases
2. **Accessibility** - WCAG compliance improvements
3. **Performance** - Optimization and efficiency
4. **Mobile experience** - Touch interactions and responsiveness
5. **Documentation** - Tutorials, guides, and examples
6. **Internationalization** - Translation support infrastructure

---

## 📞 Getting Help

Need help with your contribution?

- **GitHub Discussions** - Ask questions and get community help
- **GitHub Issues** - Report problems or confusion
- **Code Comments** - Check inline documentation in source files
- **README.md** - Reference the main documentation

---

## 📜 License

By contributing to Focus Quest, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Recognition

All contributors will be recognized in:
- The project README
- Release notes
- The contributors section

We appreciate every contribution, no matter how small! 🎉

---

<div align="center">

**Thank you for making Focus Quest better! ⚔️**

Every quest completed, every bug fixed, every feature added makes the journey more epic for everyone.

[⬆ Back to Top](#contributing-to-focus-quest-️)

</div>

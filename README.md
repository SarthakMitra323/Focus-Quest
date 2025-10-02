# ⚔️ Focus Quest

> Transform your daily tasks into epic adventures and conquer productivity, one quest at a time!

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

**Focus Quest** turns mundane to-do lists into an engaging RPG experience. Using the proven Pomodoro Technique, each task becomes a quest that advances you through beautiful journey maps while unlocking achievements along the way.

---

## ✨ Features

### 🎯 Core Functionality
- **Pomodoro Timer** - Focus sessions with customizable durations (15, 25, 50 min or custom)
- **Quest System** - Turn every task into an adventure with titles and descriptions
- **Three Epic Journeys** - Choose your path and watch your progress unfold:
  - 🏔️ **Knowledge Mountain** - Ascend to the peak of productivity
  - 🚀 **Star Voyage** - Journey through the cosmos of achievement
  - 🌊 **Deep Sea** - Dive into the depths of focus
- **Achievement System** - Unlock 8+ badges for completing milestones
- **Quest Log** - Complete history of all completed quests with timestamps

### 🎨 Beautiful Design
- **Glassmorphic UI** - Modern, frosted-glass aesthetic
- **Light & Dark Themes** - Easy on the eyes, day or night
- **Smooth Animations** - Micro-interactions that delight
- **Responsive Layout** - Perfect on desktop, tablet, and mobile
- **Animated SVG Maps** - Watch your journey progress in real-time

### 🔧 Advanced Features
- **LocalStorage Persistence** - All progress automatically saved
- **Export/Import Data** - Backup and restore your quest history
- **Daily Statistics** - Track quests per day and consecutive streaks
- **Timer Controls** - Pause, resume, or cancel active quests
- **Motivational Messages** - Encouraging microcopy throughout
- **Confetti Celebrations** - Visual rewards for completed quests

---

## 🚀 Quick Start

### Installation

No installation required! Just download and open:

```bash
# Clone or download this repository
git clone https://github.com/SarthakMitra323/Focus-Quest.git

# Navigate to the folder
cd focus-quest

# Open in your browser
# Double-click index.html or open it with your favorite browser
```

### Hosting Options

Deploy instantly to any static hosting service:

- **GitHub Pages** - Free hosting directly from your repo
- **Netlify** - Drag and drop the folder
- **Vercel** - Connect your Git repository
- **Any Web Server** - Upload the files to your hosting

---

## 📖 How to Use

### Starting Your First Quest

1. **Enter Quest Details**
   - Add a quest title (e.g., "Write project proposal")
   - Optionally add a description
   - Choose timer duration (default: 25 minutes)

2. **Begin the Adventure**
   - Click **"⚔️ Start Quest"**
   - Focus on your task while the timer runs
   - Use pause/resume if you need a break

3. **Complete & Celebrate**
   - When the timer ends, your quest is marked complete
   - Earn 4% progress toward your current journey
   - Unlock achievements as you reach milestones
   - View your completed quest in the Quest Log

### Choosing Your Journey

Select one of three thematic journeys:
- Each completed quest moves you 4% closer to the destination
- Switch journeys anytime to match your mood
- Complete a journey (100%) to unlock the **Journey Master** achievement

### Unlocking Achievements

Earn badges by completing challenges:
- 🌱 **First Steps** - Complete your first quest
- ⚔️ **Novice Hero** - 3 quests in a single day
- 🗓️ **Consistent Traveler** - 7 consecutive days with quests
- 🏆 **Veteran Explorer** - Complete 25 total quests
- ⚡ **Speed Demon** - Complete 5 quests under 15 minutes
- 🏃 **Marathon Runner** - Complete a 50-minute quest
- 🎯 **Journey Master** - Complete one full journey
- ✨ **Completionist** - 10 quests completed

---

## ⚙️ Configuration

### Customizing Timer Defaults

Open the **Settings** panel (⚙️ icon) to:
- Set your default timer duration
- Switch between light and dark themes
- Export your data for backup
- Import previously saved data
- Reset all progress (use with caution!)

### Tweaking Core Values (Developers)

Edit `script.js` to customize:

```javascript
// Line ~115: Journey progress per quest (default: 4%)
state.progress[state.selectedJourney] = Math.min(100, state.progress[state.selectedJourney] + 4);

// Line ~54-89: Achievement criteria
const ACHIEVEMENT_DEFINITIONS = [
    {
        id: 'novice_hero',
        title: 'Novice Hero',
        description: '3 quests in a day',
        icon: '⚔️',
        check: (state) => state.stats.questsToday >= 3  // Change this number
    },
    // ... modify any achievement
];

// Line ~28-50: Journey milestones and messages
const JOURNEYS = {
    mountain: {
        name: 'Knowledge Mountain',
        emoji: '🧗',
        milestones: [
            { percent: 25, message: 'Your custom message!' },
            // ... add more milestones
        ]
    }
};
```

---

## 🛠️ Tech Stack

**Pure Vanilla Stack** - No frameworks, no build tools, no dependencies!

- **HTML5** - Semantic structure
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Modular, clean, well-commented code

### Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

*Requires a modern browser with localStorage and ES6 support*

---

## 📁 Project Structure

```
focus-quest/
├── index.html          # Main HTML structure
├── style.css           # All styles and animations
├── script.js           # Application logic and state management
└── README.md           # You are here!
```

### File Overview

**index.html** (150 lines)
- Semantic HTML structure
- Accessible form elements
- Modal dialogs and toast container
- Canvas element for confetti

**style.css** (800+ lines)
- CSS custom properties for theming
- Responsive grid layouts
- Glassmorphic card components
- Smooth animations and transitions
- Media queries for mobile/tablet

**script.js** (600+ lines)
- State management with localStorage
- Timer logic with accuracy handling
- Journey and achievement systems
- UI updates and event handlers
- Data export/import functionality

---

## 🎮 Keyboard Shortcuts

While no native keyboard shortcuts are implemented, you can easily add them by extending the event listeners in `script.js`:

```javascript
// Example: Press 'Space' to pause/resume
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && state.timer.isRunning) {
        e.preventDefault();
        state.timer.isPaused ? resumeTimer() : pauseTimer();
    }
});
```

---

## 🎨 Customization Ideas

### Add Your Own Journey

1. Define a new journey in `script.js`:

```javascript
const JOURNEYS = {
    // ... existing journeys
    space: {
        name: 'Galaxy Explorer',
        emoji: '🌌',
        milestones: [
            { percent: 0, message: 'Launch into the unknown!' },
            { percent: 50, message: 'Halfway through the cosmos!' },
            { percent: 100, message: '🌟 Galaxy conquered!' }
        ]
    }
};
```

2. Add a button in `index.html`:

```html
<button class="journey-btn" data-journey="space">🌌 Galaxy Explorer</button>
```

### Create Custom Achievements

Add to `ACHIEVEMENT_DEFINITIONS` array:

```javascript
{
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Complete a quest after midnight',
    icon: '🦉',
    check: (state) => {
        return state.quests.some(q => new Date(q.completedAt).getHours() >= 0 && new Date(q.completedAt).getHours() < 6);
    }
}
```

---

## 🐛 Troubleshooting

### Timer not accurate across tabs?
The timer uses `Date.now()` to stay accurate even when the tab is inactive. If you notice drift, refresh the page.

### Progress not saving?
Check if localStorage is enabled in your browser. Private/Incognito mode may restrict localStorage.

### Can't import data?
Ensure the JSON file is from a Focus Quest export. The file must contain valid state structure.

### Confetti not showing?
Canvas rendering requires hardware acceleration. Check your browser settings if animations are disabled.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs** - Open an issue with details and steps to reproduce
2. **Suggest Features** - Share your ideas for improvements
3. **Submit Pull Requests** - Fork, code, and submit PRs
4. **Share Feedback** - Let us know how Focus Quest helps you!

### Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/SarthakMitra323/Focus-Quest.git

# Make changes to HTML, CSS, or JS files
# Test by opening index.html in your browser

# Commit and push your changes
git add .
git commit -m "Add awesome feature"
git push origin main

# Open a Pull Request!
```

---

## 📊 Future Enhancements

Ideas for future versions:

- [ ] Sound effects (toggle-able)
- [ ] More journey themes
- [ ] Weekly/monthly statistics dashboard
- [ ] Quest categories and tags
- [ ] Pomodoro break reminders
- [ ] Social sharing of achievements
- [ ] Custom achievement creator
- [ ] Quest templates
- [ ] Time estimation vs actual tracking
- [ ] Integration with task managers (optional)

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes!

```
Copyright (c) 2025 Focus Quest

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Pomodoro Technique** - Developed by Francesco Cirillo
- **Glassmorphism** - Design trend inspiration
- **The Developer Community** - For endless inspiration and support

---


<div align="center">

**Made with ⚔️ and ☕ by developers who believe productivity should be an adventure**

⭐ **Star this repo if Focus Quest helps you stay focused!** ⭐

[⬆ Back to Top](#️-focus-quest)

</div>


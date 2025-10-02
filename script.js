/* ==========================================
   Focus Quest - JavaScript Application
   A gamified productivity timer with journey progress
   ========================================== */

// ==========================================
// Application State
// ==========================================
const APP_VERSION = '1.0.0';

let state = {
    currentQuest: null,
    timer: {
        duration: 25 * 60, // seconds
        remaining: 25 * 60,
        isRunning: false,
        isPaused: false,
        intervalId: null,
        startTime: null
    },
    quests: [],
    selectedJourney: 'mountain',
    progress: {
        mountain: 0,
        star: 0,
        sea: 0
    },
    achievements: [],
    settings: {
        theme: 'light',
        defaultTimer: 25,
        soundEnabled: false
    },
    stats: {
        totalQuests: 0,
        questsToday: 0,
        lastQuestDate: null,
        consecutiveDays: 0
    }
};

// ==========================================
// Journey Configurations
// ==========================================
const JOURNEYS = {
    mountain: {
        name: 'Knowledge Mountain',
        emoji: '🧗',
        milestones: [
            { percent: 0, message: 'Begin your ascent to the peak of productivity!' },
            { percent: 25, message: 'Quarter way up! The view is getting better.' },
            { percent: 50, message: 'Halfway to the summit! Keep climbing!' },
            { percent: 75, message: 'Almost at the peak! The summit awaits!' },
            { percent: 100, message: '🏔️ Summit conquered! Choose a new journey!' }
        ]
    },
    star: {
        name: 'Star Voyage',
        emoji: '🚀',
        milestones: [
            { percent: 0, message: 'Launch sequence initiated! Destination: productivity!' },
            { percent: 25, message: 'Passing through the asteroid belt of tasks!' },
            { percent: 50, message: 'Halfway across the galaxy! Stars align with your goals!' },
            { percent: 75, message: 'Approaching the nebula of success!' },
            { percent: 100, message: '🌟 Journey complete! Ready for a new adventure?' }
        ]
    },
    sea: {
        name: 'Deep Sea',
        emoji: '🌊',
        milestones: [
            { percent: 0, message: 'Diving into the depths of focus!' },
            { percent: 25, message: 'Discovering coral reefs of accomplishment!' },
            { percent: 50, message: 'Swimming through the twilight zone of productivity!' },
            { percent: 75, message: 'Approaching the deepest trenches of mastery!' },
            { percent: 100, message: '🐋 Ocean floor reached! Surface for a new quest!' }
        ]
    }
};

// ==========================================
// Achievement Definitions
// ==========================================
const ACHIEVEMENT_DEFINITIONS = [
    {
        id: 'first_quest',
        title: 'First Steps',
        description: 'Complete your first quest',
        icon: '🌱',
        check: (state) => state.stats.totalQuests >= 1
    },
    {
        id: 'novice_hero',
        title: 'Novice Hero',
        description: '3 quests in a day',
        icon: '⚔️',
        check: (state) => state.stats.questsToday >= 3
    },
    {
        id: 'consistent_traveler',
        title: 'Consistent Traveler',
        description: '7 consecutive days',
        icon: '🗓️',
        check: (state) => state.stats.consecutiveDays >= 7
    },
    {
        id: 'veteran_explorer',
        title: 'Veteran Explorer',
        description: 'Complete 25 quests',
        icon: '🏆',
        check: (state) => state.stats.totalQuests >= 25
    },
    {
        id: 'speed_demon',
        title: 'Speed Demon',
        description: 'Complete 5 short quests',
        icon: '⚡',
        check: (state) => state.quests.filter(q => q.duration <= 15 * 60).length >= 5
    },
    {
        id: 'marathon_runner',
        title: 'Marathon Runner',
        description: 'Complete a 50-min quest',
        icon: '🏃',
        check: (state) => state.quests.some(q => q.duration >= 50 * 60)
    },
    {
        id: 'journey_master',
        title: 'Journey Master',
        description: 'Complete one journey',
        icon: '🎯',
        check: (state) => Object.values(state.progress).some(p => p >= 100)
    },
    {
        id: 'completionist',
        title: 'Completionist',
        description: '10 quests completed',
        icon: '✨',
        check: (state) => state.stats.totalQuests >= 10
    }
];

// ==========================================
// Motivational Messages
// ==========================================
const MOTIVATIONAL_MESSAGES = [
    'Focus on the task — the world waits! 🌟',
    'Every minute brings you closer to victory! ⚔️',
    'The quest continues... stay focused! 🎯',
    'Your determination shapes your destiny! 🛡️',
    'Productivity flows through your actions! 💫',
    'The journey of achievement begins now! 🗺️',
    'Forge ahead, brave adventurer! 🔥',
    'Time invested now, rewards later! ⏳'
];

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initializeUI();
    attachEventListeners();
    updateAllUI();
    checkAndShowOnboarding();
});

// ==========================================
// State Management
// ==========================================
function loadState() {
    try {
        const saved = localStorage.getItem('focusQuestState');
        if (saved) {
            const loaded = JSON.parse(saved);
            state = { ...state, ...loaded };
            
            // Reset timer state on load
            state.timer.isRunning = false;
            state.timer.isPaused = false;
            state.timer.intervalId = null;
            state.currentQuest = null;
        }
        
        // Apply theme
        document.body.setAttribute('data-theme', state.settings.theme);
        
        // Update daily stats
        updateDailyStats();
    } catch (error) {
        console.error('Failed to load state:', error);
        showToast('Failed to load saved progress', 'error');
    }
}

function saveState() {
    try {
        // Don't save runtime timer state
        const toSave = {
            ...state,
            currentQuest: null,
            timer: {
                duration: state.settings.defaultTimer * 60,
                remaining: state.settings.defaultTimer * 60,
                isRunning: false,
                isPaused: false,
                intervalId: null,
                startTime: null
            }
        };
        
        localStorage.setItem('focusQuestState', JSON.stringify(toSave));
    } catch (error) {
        console.error('Failed to save state:', error);
        showToast('Failed to save progress', 'error');
    }
}

function updateDailyStats() {
    const today = new Date().toDateString();
    
    if (state.stats.lastQuestDate !== today) {
        // Check if yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (state.stats.lastQuestDate === yesterday.toDateString()) {
            state.stats.consecutiveDays++;
        } else if (state.stats.lastQuestDate) {
            state.stats.consecutiveDays = 0;
        }
        
        state.stats.questsToday = 0;
    }
}

// ==========================================
// UI Initialization
// ==========================================
function initializeUI() {
    // Set default timer value
    document.getElementById('defaultTimer').value = state.settings.defaultTimer;
    
    // Set active theme button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === state.settings.theme);
    });
    
    // Set active journey button
    document.querySelectorAll('.journey-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.journey === state.selectedJourney);
    });
    
    // Populate achievements
    renderAchievements();
}

// ==========================================
// Event Listeners
// ==========================================
function attachEventListeners() {
    // New Quest Form
    document.getElementById('newQuestForm').addEventListener('submit', handleQuestSubmit);
    
    // Timer Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectTimerPreset(btn);
        });
    });
    
    // Custom Timer
    document.getElementById('customTimer').addEventListener('input', () => {
        document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    });
    
    // Timer Controls
    document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
    document.getElementById('resumeBtn').addEventListener('click', resumeTimer);
    document.getElementById('cancelBtn').addEventListener('click', cancelQuest);
    
    // Journey Selection
    document.querySelectorAll('.journey-btn').forEach(btn => {
        btn.addEventListener('click', () => selectJourney(btn.dataset.journey));
    });
    
    // Settings Modal
    document.getElementById('settingsBtn').addEventListener('click', openSettings);
    document.getElementById('closeSettings').addEventListener('click', closeSettings);
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') closeSettings();
    });
    
    // Theme Toggle
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => setTheme(btn.dataset.theme));
    });
    
    // Settings
    document.getElementById('defaultTimer').addEventListener('change', (e) => {
        state.settings.defaultTimer = parseInt(e.target.value);
        saveState();
    });
    
    // Data Management
    document.getElementById('exportData').addEventListener('click', exportData);
    document.getElementById('importData').addEventListener('click', () => {
        document.getElementById('importFile').click();
    });
    document.getElementById('importFile').addEventListener('change', importData);
    document.getElementById('resetProgress').addEventListener('click', resetProgress);
}

// ==========================================
// Quest Management
// ==========================================
function handleQuestSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDesc').value.trim();
    
    // Get timer duration
    let duration;
    const customTimer = document.getElementById('customTimer').value;
    if (customTimer) {
        duration = parseInt(customTimer) * 60;
    } else {
        const activePreset = document.querySelector('.preset-btn.active');
        duration = parseInt(activePreset.dataset.minutes) * 60;
    }
    
    if (!title) {
        showToast('Please enter a quest title', 'error');
        return;
    }
    
    startQuest({ title, description, duration });
}

function startQuest(questData) {
    state.currentQuest = {
        ...questData,
        id: Date.now(),
        startTime: new Date()
    };
    
    state.timer = {
        duration: questData.duration,
        remaining: questData.duration,
        isRunning: true,
        isPaused: false,
        intervalId: null,
        startTime: Date.now()
    };
    
    // Update UI
    document.getElementById('questForm').classList.add('hidden');
    document.getElementById('activeTimer').classList.remove('hidden');
    document.getElementById('activeQuestTitle').textContent = questData.title;
    document.getElementById('activeQuestDesc').textContent = questData.description || '';
    
    // Show motivational message
    const randomMessage = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
    document.getElementById('motivationalText').textContent = randomMessage;
    
    // Start timer
    runTimer();
    
    showToast(`⚔️ Quest Accepted: ${questData.title}`, 'success');
}

function pauseTimer() {
    if (state.timer.isRunning && !state.timer.isPaused) {
        state.timer.isPaused = true;
        clearInterval(state.timer.intervalId);
        
        document.getElementById('pauseBtn').classList.add('hidden');
        document.getElementById('resumeBtn').classList.remove('hidden');
        
        showToast('⏸️ Quest paused — breathe and resume when ready', 'info');
    }
}

function resumeTimer() {
    if (state.timer.isPaused) {
        state.timer.isPaused = false;
        state.timer.startTime = Date.now() - ((state.timer.duration - state.timer.remaining) * 1000);
        
        document.getElementById('pauseBtn').classList.remove('hidden');
        document.getElementById('resumeBtn').classList.add('hidden');
        
        runTimer();
        showToast('▶️ Quest resumed — back to the adventure!', 'info');
    }
}

function cancelQuest() {
    if (confirm('Are you sure you want to abandon this quest?')) {
        clearInterval(state.timer.intervalId);
        resetQuestForm();
        showToast('Quest cancelled. Ready for a new challenge?', 'info');
    }
}

function completeQuest() {
    clearInterval(state.timer.intervalId);
    
    const completedQuest = {
        ...state.currentQuest,
        completedAt: new Date(),
        duration: state.timer.duration
    };
    
    // Add to history
    state.quests.unshift(completedQuest);
    
    // Update stats
    state.stats.totalQuests++;
    state.stats.questsToday++;
    state.stats.lastQuestDate = new Date().toDateString();
    
    // Update journey progress (each quest = 4% progress)
    state.progress[state.selectedJourney] = Math.min(100, state.progress[state.selectedJourney] + 4);
    
    // Save state
    saveState();
    
    // Update UI
    resetQuestForm();
    updateAllUI();
    
    // Check achievements
    checkAchievements();
    
    // Celebration
    showToast('🎉 Victory Achieved! Quest completed!', 'success');
    launchConfetti();
}

function resetQuestForm() {
    state.currentQuest = null;
    state.timer.isRunning = false;
    state.timer.isPaused = false;
    
    document.getElementById('questForm').classList.remove('hidden');
    document.getElementById('activeTimer').classList.add('hidden');
    document.getElementById('newQuestForm').reset();
    
    // Reset preset selection
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.minutes === '25');
    });
}

// ==========================================
// Timer Functions
// ==========================================
function runTimer() {
    updateTimerDisplay();
    
    state.timer.intervalId = setInterval(() => {
        if (!state.timer.isPaused) {
            const elapsed = Math.floor((Date.now() - state.timer.startTime) / 1000);
            state.timer.remaining = Math.max(0, state.timer.duration - elapsed);
            
            updateTimerDisplay();
            
            if (state.timer.remaining <= 0) {
                completeQuest();
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timer.remaining / 60);
    const seconds = state.timer.remaining % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('timerText').textContent = timeString;
    
    // Update circular progress
    const progress = 1 - (state.timer.remaining / state.timer.duration);
    const circumference = 2 * Math.PI * 90; // radius = 90
    const offset = circumference * (1 - progress);
    
    document.getElementById('timerProgress').style.strokeDashoffset = offset;
}

function selectTimerPreset(btn) {
    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('customTimer').value = '';
}

// ==========================================
// Journey Management
// ==========================================
function selectJourney(journeyId) {
    state.selectedJourney = journeyId;
    
    document.querySelectorAll('.journey-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.journey === journeyId);
    });
    
    updateJourneyUI();
    saveState();
}

function updateJourneyUI() {
    const journey = JOURNEYS[state.selectedJourney];
    const progress = state.progress[state.selectedJourney];
    
    // Update journey name and progress
    document.getElementById('journeyName').textContent = journey.name;
    document.getElementById('journeyPercent').textContent = `${Math.floor(progress)}%`;
    
    // Update progress bar
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressTraveler').style.left = `${progress}%`;
    document.getElementById('progressTraveler').textContent = journey.emoji;
    
    // Update status message
    const milestone = journey.milestones.reduce((prev, curr) => {
        return curr.percent <= progress ? curr : prev;
    });
    document.getElementById('journeyStatus').textContent = milestone.message;
    
    // Update SVG path progress
    updateJourneyPath(progress);
}

function updateJourneyPath(progress) {
    const path = document.getElementById('journeyPathProgress');
    const pathLength = path.getTotalLength();
    const offset = pathLength - (pathLength * progress / 100);
    
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = offset;
    
    // Update marker position
    const point = path.getPointAtLength(pathLength * progress / 100);
    document.getElementById('journeyMarker').setAttribute('cx', point.x);
    document.getElementById('journeyMarker').setAttribute('cy', point.y);
}

// ==========================================
// Achievements
// ==========================================
function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';
    
    ACHIEVEMENT_DEFINITIONS.forEach(achievement => {
        const unlocked = state.achievements.includes(achievement.id);
        
        const div = document.createElement('div');
        div.className = `achievement ${unlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-desc">${achievement.description}</div>
        `;
        
        grid.appendChild(div);
    });
}

function checkAchievements() {
    let newAchievements = [];
    
    ACHIEVEMENT_DEFINITIONS.forEach(achievement => {
        if (!state.achievements.includes(achievement.id) && achievement.check(state)) {
            state.achievements.push(achievement.id);
            newAchievements.push(achievement);
        }
    });
    
    if (newAchievements.length > 0) {
        saveState();
        renderAchievements();
        
        newAchievements.forEach(achievement => {
            setTimeout(() => {
                showToast(`🏆 Achievement Unlocked: ${achievement.title}!`, 'success');
                launchConfetti();
            }, 500);
        });
    }
}

// ==========================================
// Quest History
// ==========================================
function updateHistoryUI() {
    const historyList = document.getElementById('historyList');
    
    if (state.quests.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <p>🌟 No quests completed yet</p>
                <p class="empty-hint">Start your first quest and begin your journey!</p>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = state.quests.map(quest => {
        const date = new Date(quest.completedAt);
        const duration = Math.floor(quest.duration / 60);
        
        return `
            <div class="history-item">
                <div class="history-header">
                    <div class="history-title">${quest.title}</div>
                    <div class="history-duration">${duration} min</div>
                </div>
                <div class="history-meta">
                    ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================
// Settings
// ==========================================
function openSettings() {
    document.getElementById('settingsModal').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.add('hidden');
}

function setTheme(theme) {
    state.settings.theme = theme;
    document.body.setAttribute('data-theme', theme);
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    
    saveState();
    showToast(`Theme changed to ${theme} mode`, 'info');
}

// ==========================================
// Data Management
// ==========================================
function exportData() {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `focus-quest-backup-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showToast('📤 Data exported successfully!', 'success');
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            
            if (confirm('This will replace all current data. Continue?')) {
                state = { ...state, ...imported };
                saveState();
                updateAllUI();
                showToast('📥 Data imported successfully!', 'success');
                closeSettings();
            }
        } catch (error) {
            showToast('Failed to import data. Invalid file.', 'error');
        }
    };
    
    reader.readAsText(file);
    e.target.value = ''; // Reset file input
}

function resetProgress() {
    if (confirm('⚠️ This will delete ALL progress, quests, and achievements. This cannot be undone!')) {
        if (confirm('Are you absolutely sure? This is your last chance!')) {
            localStorage.removeItem('focusQuestState');
            location.reload();
        }
    }
}

// ==========================================
// UI Updates
// ==========================================
function updateAllUI() {
    updateJourneyUI();
    updateHistoryUI();
    renderAchievements();
}

// ==========================================
// Notifications
// ==========================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// Confetti Animation
// ==========================================
function launchConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#ec4899'];
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20,
            size: Math.random() * 8 + 4,
            speed: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let hasParticles = false;
        
        particles.forEach(particle => {
            if (particle.y < canvas.height + 20) {
                hasParticles = true;
                
                particle.y += particle.speed;
                particle.rotation += particle.rotationSpeed;
                
                ctx.save();
                ctx.translate(particle.x, particle.y);
                ctx.rotate(particle.rotation * Math.PI / 180);
                ctx.fillStyle = particle.color;
                ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                ctx.restore();
            }
        });
        
        if (hasParticles) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

// ==========================================
// Onboarding
// ==========================================
function checkAndShowOnboarding() {
    if (state.stats.totalQuests === 0 && !localStorage.getItem('focusQuestOnboarded')) {
        setTimeout(() => {
            showToast('🌟 Welcome to Focus Quest! Start your first quest to begin your journey.', 'info');
            localStorage.setItem('focusQuestOnboarded', 'true');
        }, 1000);
    }
}

// ==========================================
// Window Events
// ==========================================
window.addEventListener('beforeunload', () => {
    if (state.timer.isRunning && !state.timer.isPaused) {
        return 'You have an active quest. Are you sure you want to leave?';
    }
});

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && state.timer.isRunning && !state.timer.isPaused) {
        // Recalculate remaining time when tab becomes visible
        const elapsed = Math.floor((Date.now() - state.timer.startTime) / 1000);
        state.timer.remaining = Math.max(0, state.timer.duration - elapsed);
        updateTimerDisplay();
    }
});

// ==========================================
// Console Easter Egg
// ==========================================
console.log('%c⚔️ Focus Quest', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cWelcome, brave adventurer! 🗺️', 'font-size: 14px; color: #8b5cf6;');
console.log('%cVersion: ' + APP_VERSION, 'font-size: 12px; color: #64748b;');

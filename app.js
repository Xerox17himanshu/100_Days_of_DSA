// Configuration - Modify start date here!
const CONFIG = {
    startDate: '2025-01-07', // Start date (YYYY-MM-DD) - Change this to when you want to start
    unlockTime: '07:00',      // 7:00 AM
    timezone: 'Asia/Kolkata'  // IST timezone
};

// Global variables
let challengeData = [];
let currentFilter = 'all';
let completedDays = [];
let unlockedDays = 0;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Calculate which day is currently unlocked
function getUnlockedDay() {
    const now = new Date();
    const start = new Date(CONFIG.startDate + 'T' + CONFIG.unlockTime + ':00+05:30'); // IST offset
    
    // If we haven't reached start date yet
    if (now < start) {
        return 0;
    }
    
    // Calculate days elapsed since start
    const diffTime = now - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Check if we've passed today's unlock time
    const todayUnlock = new Date();
    const [hours, minutes] = CONFIG.unlockTime.split(':');
    todayUnlock.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    if (now >= todayUnlock) {
        return Math.min(diffDays + 1, 100);
    }
    
    return Math.min(Math.max(0, diffDays), 100);
}

// Update countdown timer to next unlock
function updateTimer() {
    const now = new Date();
    const [hours, minutes] = CONFIG.unlockTime.split(':');
    
    // Calculate next 7 AM
    const nextUnlock = new Date();
    nextUnlock.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // If we've passed today's 7 AM, set to tomorrow's 7 AM
    if (now >= nextUnlock) {
        nextUnlock.setDate(nextUnlock.getDate() + 1);
    }
    
    const diff = nextUnlock - now;
    
    if (diff > 0) {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('timerDisplay').textContent = 
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    } else {
        document.getElementById('timerDisplay').textContent = '00:00:00';
    }
}

// Calculate current streak
function calculateStreak() {
    if (completedDays.length === 0) return 0;
    
    const sorted = [...completedDays].sort((a, b) => b - a);
    let streak = 0;
    const maxUnlocked = getUnlockedDay();
    
    // Count consecutive completed days from most recent
    for (let i = maxUnlocked; i >= 1; i--) {
        if (sorted.includes(i)) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

// ============================================================================
// PROGRESS MANAGEMENT
// ============================================================================

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('dsa-100-days-progress');
    if (saved) {
        try {
            completedDays = JSON.parse(saved);
        } catch (e) {
            completedDays = [];
        }
    }
    updateProgress();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('dsa-100-days-progress', JSON.stringify(completedDays));
    updateProgress();
}

// Update all progress displays
function updateProgress() {
    unlockedDays = getUnlockedDay();
    const percent = (completedDays.length / 100) * 100;
    const streak = calculateStreak();
    
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('progressCount').textContent = completedDays.length;
    document.getElementById('unlockedCount').textContent = unlockedDays;
    document.getElementById('completedCount').textContent = completedDays.length;
    document.getElementById('streakCount').textContent = streak;
}

// Toggle day completion
function toggleComplete(day) {
    const index = completedDays.indexOf(day);
    if (index > -1) {
        completedDays.splice(index, 1);
    } else {
        completedDays.push(day);
    }
    saveProgress();
    renderDays();
}

// ============================================================================
// MODAL FUNCTIONS
// ============================================================================

// Show problem description in modal
function showDescription(dayNum, questionNum) {
    const day = challengeData.find(d => d.day === dayNum);
    if (!day) return;
    
    const question = day.question1;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Day ${dayNum} - Question 1</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <h3>${question.title}</h3>
                <pre class="problem-description">${question.description}</pre>
            </div>
            <div class="modal-footer">
                <button class="modal-btn" onclick="closeModal()">Close</button>
                <button class="modal-btn primary" onclick="copyDescription(${dayNum})">Copy to Clipboard</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Copy description to clipboard
function copyDescription(dayNum) {
    const day = challengeData.find(d => d.day === dayNum);
    if (!day) return;
    
    const text = `${day.question1.title}\n\n${day.question1.description}`;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('Problem description copied to clipboard!');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Problem description copied to clipboard!');
    });
}

// ============================================================================
// FILTER & SEARCH
// ============================================================================

// Filter by unit
function filterByUnit(unit) {
    currentFilter = unit;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    renderDays();
}

// ============================================================================
// RENDERING
// ============================================================================

// Render all days
function renderDays() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const grid = document.getElementById('daysGrid');
    const maxUnlocked = getUnlockedDay();
    
    // Filter days
    const filtered = challengeData.filter(day => {
        const matchesFilter = currentFilter === 'all' || day.unit === currentFilter;
        const matchesSearch = searchTerm === '' ||
            day.day.toString().includes(searchTerm) ||
            day.question1.title.toLowerCase().includes(searchTerm) ||
            day.question2.name.toLowerCase().includes(searchTerm) ||
            day.topics.some(t => t.toLowerCase().includes(searchTerm));
        return matchesFilter && matchesSearch;
    });

    // Render day cards
    grid.innerHTML = filtered.map(day => {
        const isCompleted = completedDays.includes(day.day);
        const isLocked = day.day > maxUnlocked;
        const isToday = day.day === maxUnlocked && maxUnlocked > 0;
        
        let statusBadge = '';
        if (isToday && !isLocked) {
            statusBadge = '<span class="unlock-badge">🔥 Today\'s Challenge</span>';
        } else if (!isLocked && day.day < maxUnlocked) {
            statusBadge = '<span class="unlock-badge">✓ Unlocked</span>';
        }
        
        return `
            <div class="day-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''} ${isToday ? 'today' : ''}">
                ${statusBadge}
                <div class="day-header">
                    <div class="day-number">Day ${day.day}</div>
                    <div class="unit-badge">${day.unit.replace('Unit ', '')}</div>
                </div>
                
                <div class="topics">
                    ${day.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}
                </div>
                
                <div class="question">
                    <div class="question-header">
                        <span class="question-num">Question 1 - Practice and push to github</span>
                        <span class="difficulty easy">Practice</span>
                    </div>
                    <div class="question-name">${day.question1.title}</div>
                    ${!isLocked ? `<button class="solve-btn" onclick="showDescription(${day.day}, 1)">View Problem →</button>` : ''}
                </div>
                
                <div class="question">
                    <div class="question-header">
                        <span class="question-num">Question 2 - ${day.question2.link.includes('leetcode') ? 'LeetCode' : 'GeeksforGeeks'}</span>
                        <span class="difficulty ${day.question2.difficulty.toLowerCase()}">${day.question2.difficulty}</span>
                    </div>
                    <div class="question-name">${day.question2.name}</div>
                    ${!isLocked ? `<a href="${day.question2.link}" target="_blank" rel="noopener noreferrer" class="solve-btn">Solve Problem →</a>` : ''}
                </div>
                
                ${!isLocked ? `
                <div class="complete-btn ${isCompleted ? 'completed' : ''}" onclick="toggleComplete(${day.day})">
                    ${isCompleted ? '✓ Completed' : 'Mark as Complete'}
                </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize application
async function init() {
    console.log('🚀 Initializing 100 Days of DSA Challenge...');
    
    // Load challenge data
    try {
        const response = await fetch('challenge_syllabus_aligned.json');
        if (!response.ok) {
            throw new Error('Failed to load challenge data');
        }
        challengeData = await response.json();
        console.log(`✅ Loaded ${challengeData.length} days of challenges`);
    } catch (error) {
        console.error('❌ Error loading challenge data:', error);
        document.getElementById('daysGrid').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #ec4899;">
                <h3>⚠️ Error Loading Challenge Data</h3>
                <p>Please make sure challenge_syllabus_aligned.json is in the same directory.</p>
            </div>
        `;
        return;
    }
    
    // Load user progress
    loadProgress();
    
    // Initial render
    renderDays();
    updateTimer();
    
    // Setup search
    document.getElementById('searchBox').addEventListener('input', renderDays);
    
    // Update timer every second
    setInterval(updateTimer, 1000);
    
    // Check for new unlocked day every minute
    setInterval(() => {
        const newUnlocked = getUnlockedDay();
        if (newUnlocked !== unlockedDays) {
            console.log(`🔓 New day unlocked: Day ${newUnlocked}`);
            renderDays();
        }
    }, 60000);
    
    console.log('✨ Challenge initialized successfully!');
    console.log(`📅 Start Date: ${CONFIG.startDate}`);
    console.log(`🕐 Daily Unlock Time: ${CONFIG.unlockTime} ${CONFIG.timezone}`);
    console.log(`🔓 Currently Unlocked: Day ${getUnlockedDay()}`);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

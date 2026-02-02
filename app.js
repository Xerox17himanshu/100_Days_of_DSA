// Configuration - Modify start date here!
const CONFIG = {
    startDate: '2026-02-01', // Start date (YYYY-MM-DD) - Change this to when you want to start
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
    
    // Calculate days elapsed since start (including partial days)
    const diffTime = now - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate the unlock time for the current day being checked
    const nextDayUnlock = new Date(start);
    nextDayUnlock.setDate(nextDayUnlock.getDate() + diffDays);
    nextDayUnlock.setHours(parseInt(CONFIG.unlockTime.split(':')[0]), parseInt(CONFIG.unlockTime.split(':')[1]), 0, 0);
    
    // If current time has passed the unlock time for this day, we're on the next day
    if (now >= nextDayUnlock) {
        return Math.min(diffDays + 1, 100);
    }
    
    return Math.min(diffDays, 100);
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
        
        const timeString = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        document.getElementById('timerDisplay').textContent = timeString;
        
        // Also update the countdown in unlock message card if it exists
        const countdownEl = document.getElementById('nextUnlockCountdown');
        if (countdownEl) {
            countdownEl.textContent = timeString;
        }
    } else {
        document.getElementById('timerDisplay').textContent = '00:00:00';
        const countdownEl = document.getElementById('nextUnlockCountdown');
        if (countdownEl) {
            countdownEl.textContent = '00:00:00';
        }
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
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('dsa-100-days-progress', JSON.stringify(completedDays));
}

// Toggle complete status
function toggleComplete(day) {
    if (completedDays.includes(day)) {
        completedDays = completedDays.filter(d => d !== day);
    } else {
        completedDays.push(day);
    }
    saveProgress();
    updateStats();
    renderDays();
}

// ============================================================================
// STATS & DISPLAY
// ============================================================================

// Update statistics display
function updateStats() {
    const maxUnlocked = getUnlockedDay();
    const completed = completedDays.length;
    const streak = calculateStreak();
    
    document.getElementById('totalDays').textContent = maxUnlocked;
    document.getElementById('completedDays').textContent = completed;
    document.getElementById('streakDays').textContent = streak;
    
    // Update progress box
    document.getElementById('progressCompletedDays').textContent = completed;
    document.getElementById('progressTotalDays').textContent = maxUnlocked;
    
    // Update progress bar
    const progressPercent = maxUnlocked > 0 ? (completed / maxUnlocked) * 100 : 0;
    document.getElementById('progressFill').style.width = progressPercent + '%';
}

// ============================================================================
// FILTERING & SEARCH
// ============================================================================

// Set current filter
function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="setFilter('${filter}')"]`).classList.add('active');
    renderDays();
}

// Search functionality
function searchDays() {
    renderDays();
}

// ============================================================================
// MODAL HANDLING
// ============================================================================

// Show problem description in modal
function showDescription(day, questionNum) {
    const dayData = challengeData.find(d => d.day === day);
    if (!dayData) return;
    
    const modal = document.getElementById('problemModal');
    const title = document.getElementById('modalTitle');
    const description = document.getElementById('modalDescription');
    
    title.textContent = `Day ${day} - Question ${questionNum}: ${dayData.question1.title}`;
    description.innerHTML = `<pre>${dayData.question1.description}</pre>`;
    
    modal.style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('problemModal').style.display = 'none';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('problemModal');
    if (event.target === modal) {
        closeModal();
    }
}

// ============================================================================
// SOLUTIONS HANDLING
// ============================================================================

// Toggle solutions dropdown
function toggleSolutions(dayNum) {
    const content = document.getElementById(`solutions-content-${dayNum}`);
    const chevron = document.getElementById(`chevron-${dayNum}`);
    
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('open');
        chevron.style.transform = 'rotate(180deg)';
    }
}

// Toggle tutorial sections
function toggleTutorial(dayNum, questionNum) {
    const content = document.getElementById(`tutorial-${dayNum}-q${questionNum}`);
    const chevron = document.getElementById(`tutorial-chevron-${dayNum}-q${questionNum}`);
    
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('open');
        chevron.style.transform = 'rotate(180deg)';
    }
}

// Render tutorial section
function renderTutorial(dayNum, questionNum, tutorial) {
    if (!tutorial) return '';
    
    return `
        <div class="tutorial-section">
            <button class="tutorial-toggle" onclick="toggleTutorial(${dayNum}, ${questionNum})">
                <div class="tutorial-toggle-content">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                    <span>📚 View Complete Tutorial</span>
                </div>
                <svg id="tutorial-chevron-${dayNum}-q${questionNum}" class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div id="tutorial-${dayNum}-q${questionNum}" class="tutorial-content">
                <div class="tutorial-inner">
                    ${tutorial.explanation ? `
                        <div class="tutorial-block">
                            <h4>💡 Logic Explanation</h4>
                            <div class="tutorial-text">${tutorial.explanation.replace(/\n/g, '<br>')}</div>
                        </div>
                    ` : ''}
                    
                    ${tutorial.code ? `
                        <div class="tutorial-block">
                            <h4>💻 Code Solution</h4>
                            <pre class="code-block"><code>${tutorial.code}</code></pre>
                        </div>
                    ` : ''}
                    
                    ${tutorial.timeComplexity ? `
                        <div class="tutorial-block">
                            <h4>⏱️ Complexity Analysis</h4>
                            <div class="complexity-info">
                                <div class="complexity-item">
                                    <strong>Time Complexity:</strong> <code>${tutorial.timeComplexity}</code>
                                </div>
                                ${tutorial.spaceComplexity ? `
                                    <div class="complexity-item">
                                        <strong>Space Complexity:</strong> <code>${tutorial.spaceComplexity}</code>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Render solutions section
function renderSolutions(dayNum, maxUnlocked) {
    const day = challengeData.find(d => d.day === dayNum);
    if (!day || !day.solutions) return '';
    
    // Solutions unlock when the NEXT day unlocks
    const solutionsUnlocked = dayNum < maxUnlocked;
    
    if (solutionsUnlocked) {
        const q1Solutions = day.solutions.question1 || [];
        const q1Tutorial = q1Solutions.find(sol => sol.type === 'tutorial');
        const q1VideoSolutions = q1Solutions.filter(sol => sol.type === 'video');
        
        const q2Solutions = day.solutions.question2 || [];
        const q2Tutorial = q2Solutions.find(sol => sol.type === 'tutorial');
        const q2VideoSolutions = q2Solutions.filter(sol => sol.type === 'video');
        
        const hasAnySolutions = q1Solutions.length > 0 || q2Solutions.length > 0;
        
        return `
            <div class="solutions-dropdown">
                <button class="solutions-toggle" onclick="toggleSolutions(${dayNum})">
                    <div class="solutions-toggle-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>✓ Solutions Available</span>
                    </div>
                    <svg id="chevron-${dayNum}" class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <div id="solutions-content-${dayNum}" class="solutions-content">
                    <div class="solutions-inner">
                        ${q1Solutions.length > 0 ? `
                            <div class="solution-group">
                                <div class="solution-label">📘 Question 1 Solutions</div>
                                
                                ${q1Tutorial ? renderTutorial(dayNum, 1, q1Tutorial) : ''}
                                
                                ${q1VideoSolutions.length > 0 ? `
                                    <div class="solution-links">
                                        ${q1VideoSolutions.map(sol => `
                                            <a href="${sol.link}" target="_blank" rel="noopener noreferrer" class="solution-link">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                                </svg>
                                                ${sol.label}
                                            </a>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}

                        ${q2Solutions.length > 0 ? `
                            <div class="solution-group">
                                <div class="solution-label">🎯 Question 2 Solutions</div>
                                
                                ${q2VideoSolutions.length > 0 ? `
                                    <div class="solution-links">
                                        ${q2VideoSolutions.map(sol => `
                                            <a href="${sol.link}" target="_blank" rel="noopener noreferrer" class="solution-link">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                                </svg>
                                                ${sol.label}
                                            </a>
                                        `).join('')}
                                    </div>
                                ` : ''}
                                
                                ${q2Tutorial ? renderTutorial(dayNum, 2, q2Tutorial) : ''}
                            </div>
                        ` : ''}

                        ${!hasAnySolutions ? `
                            <div class="empty-message">Solutions will be added soon...</div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    } else {
        // Get the next unlock date for Day N+1
        const nextDay = dayNum + 1;
        const nextUnlockDate = new Date(CONFIG.startDate);
        nextUnlockDate.setDate(nextUnlockDate.getDate() + nextDay - 1);
        const [hours, minutes] = CONFIG.unlockTime.split(':');
        nextUnlockDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        const dateStr = nextUnlockDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        return `
            <div class="solutions-dropdown">
                <button class="solutions-toggle locked" disabled>
                    <div class="solutions-toggle-content">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span>🔒 Solutions unlock when Day ${nextDay} opens (${dateStr} at ${CONFIG.unlockTime})</span>
                    </div>
                </button>
            </div>
        `;
    }
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

    // Render day cards (hide locked ones)
    let cardsHTML = filtered.map(day => {
        const isCompleted = completedDays.includes(day.day);
        const isLocked = day.day > maxUnlocked;
        const isToday = day.day === maxUnlocked && maxUnlocked > 0;
        
        // Hide locked cards completely
        if (isLocked) {
            return '';
        }
        
        let statusBadge = '';
        if (isToday && !isLocked) {
            statusBadge = '<span class="unlock-badge">🔥 Today\'s Challenge</span>';
        } else if (!isLocked && day.day < maxUnlocked) {
            statusBadge = '<span class="unlock-badge">✓ Unlocked</span>';
        }
        
        return `
            <div class="day-card ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}">
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
                        <span class="question-num">Question 1 - C Programming</span>
                        <span class="difficulty easy">Practice</span>
                    </div>
                    <div class="question-name">${day.question1.title}</div>
                    <button class="solve-btn" onclick="showDescription(${day.day}, 1)">View Problem →</button>
                </div>
                
                <div class="question">
                    <div class="question-header">
                        <span class="question-num">Question 2 - ${day.question2.link.includes('leetcode') ? 'LeetCode' : 'GeeksforGeeks'}</span>
                        <span class="difficulty ${day.question2.difficulty.toLowerCase()}">${day.question2.difficulty}</span>
                    </div>
                    <div class="question-name">${day.question2.name}</div>
                    <a href="${day.question2.link}" target="_blank" rel="noopener noreferrer" class="solve-btn">Solve Problem →</a>
                </div>
                
                <div class="complete-btn ${isCompleted ? 'completed' : ''}" onclick="toggleComplete(${day.day})">
                    ${isCompleted ? `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>Completed</span>
                    ` : `
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        <span>Mark as Complete</span>
                    `}
                </div>
                
                <!-- Solutions Dropdown -->
                ${renderSolutions(day.day, maxUnlocked)}
            </div>
        `;
    }).join('');
    
    // Add next unlock message card if not all days are unlocked
    if (maxUnlocked < 100) {
        const nextDay = maxUnlocked + 1;
        const nextUnlockDate = new Date(CONFIG.startDate);
        nextUnlockDate.setDate(nextUnlockDate.getDate() + nextDay - 1);
        const [hours, minutes] = CONFIG.unlockTime.split(':');
        nextUnlockDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        const dateStr = nextUnlockDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
        });
        
        cardsHTML += `
            <div class="unlock-message-card">
                <div class="unlock-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
                <div class="unlock-message-title">🔒 Day ${nextDay} Locked</div>
                <div class="unlock-message-text">
                    Next challenge unlocks on<br>
                    <strong>${dateStr}</strong><br>
                    at <strong>${CONFIG.unlockTime} ${CONFIG.timezone}</strong>
                </div>
                <div class="unlock-countdown" id="nextUnlockCountdown">
                    Loading...
                </div>
            </div>
        `;
    }
    
    grid.innerHTML = cardsHTML;
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize the app
async function init() {
    try {
        // Load challenge data
        const response = await fetch('challenge_syllabus_aligned.json');
        challengeData = await response.json();
        
        // Load saved progress
        loadProgress();
        
        // Update display
        unlockedDays = getUnlockedDay();
        updateStats();
        renderDays();
        
        // Start timer
        updateTimer();
        setInterval(updateTimer, 1000);
        
        // Check for new unlocks every minute
        setInterval(() => {
            const newUnlocked = getUnlockedDay();
            if (newUnlocked !== unlockedDays) {
                unlockedDays = newUnlocked;
                updateStats();
                renderDays();
            }
        }, 60000);
        
    } catch (error) {
        console.error('Error loading challenge data:', error);
        document.getElementById('daysGrid').innerHTML = 
            '<div style="text-align: center; padding: 40px; color: #ef4444;">Error loading challenge data. Please refresh the page.</div>';
    }
}

// Start the app when page loads
window.addEventListener('DOMContentLoaded', init);

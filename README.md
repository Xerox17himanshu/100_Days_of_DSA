# 100 Days of DSA Challenge 🚀

A daily coding challenge platform that unlocks 2 new DSA questions every day at 7:00 AM IST. Built for consistency and progressive learning!

## ✨ Features

- 📅 **Daily Unlock System** - New questions unlock automatically at 7 AM IST
- 🎯 **Dual Question Format**:
  - **Question 1**: Custom C Programming problems with detailed descriptions
  - **Question 2**: LeetCode/GeeksforGeeks problems with direct links
- 📚 **Syllabus-Aligned** - Follows complete DSA curriculum
- 🔥 **Streak Tracking** - Monitor your consistency
- ✅ **Progress Tracking** - Mark completed challenges
- 💡 **Problem Viewer** - View C programming problems in elegant modal
- 🎨 **Beautiful UI** - Clean, modern interface
- 📱 **Responsive** - Works on all devices

## 🎓 Question Format

Each day contains **2 carefully selected questions**:

### Question 1: C Programming Practice
- **Custom problems** designed for your syllabus
- **Detailed problem statements** with:
  - Input/Output format
  - Constraints
  - Examples
  - Implementation hints
- **View in modal** - Click "View Problem" to see full description
- **Copy to clipboard** - Easily copy problem to your IDE

### Question 2: Online Judge
- **Direct links** to LeetCode or GeeksforGeeks
- **Difficulty labeled** (Easy/Medium/Hard)
- **Instant access** - Click "Solve Problem" to open in new tab

## 🚀 Quick Start (GitHub Pages)

### Step 1: Fork or Create Repository

1. **Create a new repository** on GitHub
   - Name it: `dsa-100-days-challenge` (or any name you like)
   - Make it **Public**
   - Don't initialize with README (we have one!)

### Step 2: Upload Files

Upload these 3 files to your repository:
```
index.html
app.js
challenge_syllabus_aligned.json
```

**Using Git:**
```bash
git clone https://github.com/YOUR-USERNAME/dsa-100-days-challenge.git
cd dsa-100-days-challenge

# Copy the 3 files here

git add .
git commit -m "Initial commit: 100 Days DSA Challenge"
git push origin main
```

**Or use GitHub's web interface:**
1. Go to your repository
2. Click "Add file" → "Upload files"
3. Drag and drop all 3 files
4. Click "Commit changes"

### Step 3: Enable GitHub Pages

1. Go to your repository
2. Click "Settings"
3. Scroll to "Pages" in left sidebar
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"

### Step 4: Access Your Challenge

After 2-3 minutes, your challenge will be live at:
```
https://YOUR-USERNAME.github.io/dsa-100-days-challenge/
```

**🎉 That's it! Your challenge is now live!**

## ⚙️ Configuration

### Change Start Date

Edit `app.js` and modify the CONFIG object:

```javascript
const CONFIG = {
    startDate: '2026-01-14',  // Change to your start date (YYYY-MM-DD)
    unlockTime: '07:00',       // 7:00 AM
    timezone: 'Asia/Kolkata'   // IST
};
```

**Important:** The start date should be the date when you want Day 1 to unlock.

### Change Unlock Time

To change from 7 AM to another time:

```javascript
unlockTime: '09:00',  // 9 AM
unlockTime: '06:30',  // 6:30 AM
unlockTime: '21:00',  // 9 PM
```

## 📚 Challenge Structure

### Unit I: Introduction (Days 1-20)
- Arrays, Memory Representation
- Recursion & Analysis
- Structures & ADTs

### Unit II: Linked Lists (Days 21-30)
- Singly, Doubly, Circular Lists
- Operations & Applications

### Unit III: Stacks & Queues (Days 31-42)
- Implementation & Operations
- Expression Evaluation
- Priority Queues

### Unit IV: Trees (Days 43-64)
- Binary Trees & BST
- AVL Trees
- Heaps & Applications

### Unit V: Hash Tables & Graphs (Days 65-80)
- Hashing & Collision Resolution
- Graph Traversals
- MST & Shortest Path

### Unit VI: Sorting & Searching (Days 81-100)
- Sorting Algorithms
- Binary Search
- Complexity Analysis

## 🎯 How to Use

1. **Visit daily at 7 AM IST** - New questions unlock automatically
2. **Question 1 - C Programming**:
   - Click "View Problem" to see the full problem description
   - Copy the problem to your clipboard
   - Solve in your preferred C IDE (VS Code, Code::Blocks, etc.)
3. **Question 2 - Online Judge**:
   - Click "Solve Problem" to open LeetCode/GeeksforGeeks
   - Solve directly on the platform
4. **Mark as Complete** - Track your progress
5. **Maintain streak** - Stay consistent!

## 📊 JSON Format

The challenge uses a specific JSON format for questions:

```json
{
  "day": 1,
  "unit": "Unit I: Introduction",
  "question1": {
    "title": "Insert an Element in an Array",
    "description": "Problem: Write a C program to insert an element..."
  },
  "question2": {
    "name": "Two Sum",
    "link": "https://leetcode.com/problems/two-sum/",
    "difficulty": "Easy"
  },
  "topics": ["Array Basics", "Hash Tables"]
}
```

**Note**: The JSON file should be named `challenge_syllabus_aligned.json` and placed in the same directory as `index.html`.

## 📊 Features Explained

### Daily Unlock System
- Questions unlock at 7:00 AM IST every day
- Locked questions show countdown timer
- Today's challenge is highlighted

### Progress Tracking
- **Unlocked**: Total days unlocked so far
- **Completed**: Days you've finished
- **Streak**: Consecutive days completed

### Filtering & Search
- Filter by unit (Arrays, Trees, etc.)
- Search by question name or topic
- Find specific days quickly

## 🛠️ Customization

### Change Colors

Edit the CSS in `index.html`:

```css
:root {
    --bg-primary: #0a0e27;      /* Main background */
    --accent-blue: #00d4ff;     /* Primary accent */
    --accent-purple: #7c3aed;   /* Secondary accent */
}
```

### Add Custom Domain

In your GitHub repository settings:
1. Go to Pages
2. Under "Custom domain", enter your domain
3. Follow DNS configuration instructions

## 📱 Mobile Support

The challenge is fully responsive and works great on:
- 📱 Phones
- 📲 Tablets  
- 💻 Desktops

## 🐛 Troubleshooting

### Questions not showing?
- Make sure all 3 files are in the repository root
- Check browser console for errors (F12)
- Verify `challenge_syllabus_aligned.json` is uploaded

### Wrong timezone?
- Modify `timezone` in `app.js` CONFIG
- Common values:
  - `'Asia/Kolkata'` - IST
  - `'America/New_York'` - EST
  - `'Europe/London'` - GMT

### Progress not saving?
- Make sure cookies/local storage is enabled
- Don't use Incognito/Private mode
- Progress saves per browser

### All days showing as locked?
- Check your `startDate` in `app.js`
- Make sure it's not a future date
- Format must be `YYYY-MM-DD`

## 💡 Tips for Success

1. **Start on the right day** - Set `startDate` to tomorrow
2. **Be consistent** - Do it daily, build a streak
3. **Don't skip** - Locked days prevent rushing ahead
4. **Review concepts** - Read the topics before solving
5. **Take notes** - Document your learning
6. **Join community** - Share your GitHub link with friends

## 🔗 Sharing

Share your challenge with others:

```
Check out my 100 Days of DSA Challenge!
https://YOUR-USERNAME.github.io/dsa-100-days-challenge/
```

## 📄 License

Free to use and modify for personal learning!

## 🤝 Contributing

Found a bug or want to suggest a feature?
- Open an issue on GitHub
- Submit a pull request
- Share your feedback!

## 🎓 Resources

- [LeetCode](https://leetcode.com)
- [GeeksforGeeks](https://geeksforgeeks.org)
- [NeetCode](https://neetcode.io)

## 📞 Support

If you need help:
1. Check the Troubleshooting section above
2. Review the GitHub Pages documentation
3. Ask in coding communities (Reddit, Discord)

---

**Good luck with your 100-day journey! 💪🚀**

Start date: Modify in `app.js`
Questions unlock: 7:00 AM IST daily
Total questions: 200 (2 per day × 100 days)

*Built with ❤️ for consistent learning*

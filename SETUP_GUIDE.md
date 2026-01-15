# 🚀 QUICK SETUP GUIDE - GitHub Pages

## 5-Minute Setup!

### Step 1: Create GitHub Repository

1. Go to **github.com** and sign in
2. Click **"+" icon** (top right) → **"New repository"**
3. Repository name: `dsa-100-days-challenge`
4. Make it **Public**
5. Click **"Create repository"**

### Step 2: Upload Files

1. On the repository page, click **"uploading an existing file"**
2. **Drag and drop all 4 files:**
   - ✅ `index.html`
   - ✅ `app.js`
   - ✅ `challenge_syllabus_aligned.json`
   - ✅ `README.md`
3. Click **"Commit changes"**

### Step 3: Enable GitHub Pages

1. Click **"Settings"** (tab at top)
2. Scroll down, click **"Pages"** (left sidebar)
3. Under **"Source"**:
   - Branch: Select **main**
   - Folder: Select **/ (root)**
4. Click **"Save"**

### Step 4: Get Your URL

After 2-3 minutes, your site will be live at:

```
https://YOUR-USERNAME.github.io/dsa-100-days-challenge/
```

**🎉 That's it! You're done!**

---

## ⚙️ IMPORTANT: Set Your Start Date

**Before starting, configure when Day 1 should unlock:**

1. In your GitHub repository, click on `app.js`
2. Click the **pencil icon** (Edit)
3. Find line 2-6:

```javascript
const CONFIG = {
    startDate: '2026-01-14',  // ← Change this!
    unlockTime: '07:00',
    timezone: 'Asia/Kolkata'
};
```

4. Change `startDate` to your desired start date:
   - Format: `YYYY-MM-DD`
   - Example: `'2026-01-20'` for January 20, 2026
   
5. Click **"Commit changes"**

**Date Examples:**
- Starting tomorrow: Set to tomorrow's date
- Starting next Monday: Set to next Monday's date  
- Starting in a week: Set to date 7 days from now

---

## 📅 How It Works

- **Day 1** unlocks on your start date at **7:00 AM IST**
- **Day 2** unlocks next day at **7:00 AM IST**
- **Continues for 100 days**

Each day shows:
- ⏰ Countdown to next unlock
- 🔒 Locked future days (blurred)
- 🔥 Today's challenge (highlighted)
- ✅ Completed days (green border)

---

## 🎯 Daily Usage

1. **Visit your URL** every morning at 7 AM IST
2. **New questions unlock** automatically
3. **Click "Solve Problem"** to open LeetCode/GFG
4. **Mark as Complete** when done
5. **Track your streak!**

---

## 📊 Features

✅ **Auto-unlock** - New day at 7 AM  
✅ **Progress tracking** - Saved in browser  
✅ **Streak counter** - Stay consistent  
✅ **Search & Filter** - Find topics easily  
✅ **Mobile friendly** - Works everywhere  

---

## 🎨 Customization (Optional)

### Change Unlock Time

Edit `app.js`:
```javascript
unlockTime: '06:00',  // 6 AM
unlockTime: '09:30',  // 9:30 AM  
unlockTime: '21:00',  // 9 PM
```

### Change Timezone

```javascript
timezone: 'America/New_York',  // EST
timezone: 'Europe/London',     // GMT
timezone: 'Asia/Tokyo',        // JST
```

---

## 📱 Share Your Challenge

```
🚀 Join my 100 Days of DSA Challenge!
📅 New questions daily at 7 AM IST
🔗 https://YOUR-USERNAME.github.io/dsa-100-days-challenge/
```

---

## ❓ Common Questions

**Q: Can I see future days?**  
A: No, they unlock one per day. This builds consistency!

**Q: What if I miss a day?**  
A: The day stays unlocked. Complete it anytime!

**Q: Does progress save?**  
A: Yes, in your browser's local storage.

**Q: Can I use on mobile?**  
A: Yes! Fully responsive design.

---

## 🆘 Troubleshooting

**Site not loading?**
- Wait 3-5 minutes after enabling Pages
- Check repository is **Public**
- Try incognito/private mode

**All days locked?**
- Edit `app.js` and check `startDate`
- Make sure date format is `YYYY-MM-DD`
- Ensure date is today or in the past

**Questions not showing?**
- Verify all 4 files are uploaded
- Check `challenge_syllabus_aligned.json` exists
- Open browser console (F12) for errors

---

## ✅ Pre-Start Checklist

- [ ] All 4 files uploaded to GitHub
- [ ] GitHub Pages enabled
- [ ] Start date configured in `app.js`
- [ ] Tested URL works
- [ ] Bookmarked challenge URL
- [ ] Ready to begin!

---

**Need more help?** Read the full `README.md`

**Let's code! 💪🚀**

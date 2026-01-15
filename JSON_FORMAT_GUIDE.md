# 📝 How to Use Your Custom JSON File

## Important: Replace the JSON File

The code is now updated to work with your new JSON format! Here's how to use it:

## Step 1: Prepare Your JSON File

Your JSON file should have this exact structure for each day:

```json
{
  "day": 1,
  "unit": "Unit I: Introduction",
  "question1": {
    "title": "Your C Programming Question Title",
    "description": "Full problem description with input/output format, examples, etc."
  },
  "question2": {
    "name": "LeetCode Question Name",
    "link": "https://leetcode.com/problems/question-link/",
    "difficulty": "Easy"
  },
  "topics": ["Topic 1", "Topic 2"]
}
```

### Question 1 Format (C Programming):
- **title**: Short title of the problem
- **description**: Full problem statement including:
  - Problem description
  - Input format
  - Output format
  - Constraints
  - Examples with input/output

### Question 2 Format (Online Judge):
- **name**: Name of the LeetCode/GFG problem
- **link**: Direct URL to the problem
- **difficulty**: "Easy", "Medium", or "Hard"

## Step 2: Name Your File

Save your complete JSON file as:
```
challenge_syllabus_aligned.json
```

## Step 3: Upload to GitHub

When uploading to GitHub, make sure you upload:
1. ✅ `index.html`
2. ✅ `app.js`  
3. ✅ `challenge_syllabus_aligned.json` ← **Your custom file**
4. ✅ `README.md`

**All 4 files must be in the root directory of your repository.**

## Step 4: Verify It Works

After uploading to GitHub Pages:

1. Open your GitHub Pages URL
2. You should see:
   - **Question 1** labeled as "C Programming" with "View Problem" button
   - **Question 2** labeled as "LeetCode" or "GeeksforGeeks" with "Solve Problem" link
3. Click "View Problem" on Question 1 - A modal should popup with your problem description
4. Click "Solve Problem" on Question 2 - Should open LeetCode/GFG in new tab

## Features You Now Have:

### For Question 1 (C Programming):
✅ Click "View Problem" → Modal popup with full description  
✅ "Copy to Clipboard" button to copy the problem  
✅ Formatted problem statement in code-style font  
✅ Easy to read input/output format  

### For Question 2 (Online Judge):
✅ Direct link to LeetCode/GeeksforGeeks  
✅ Difficulty badge (Easy/Medium/Hard)  
✅ Opens in new tab  

### General Features:
✅ Both questions unlock at 7 AM IST daily  
✅ Progress tracking for completed days  
✅ Streak counter  
✅ Search works for both question titles  
✅ Filter by unit  

## Example: Complete Day Entry

Here's a complete example of what one day looks like in your JSON:

```json
{
  "day": 1,
  "unit": "Unit I: Introduction",
  "question1": {
    "title": "Insert an Element in an Array",
    "description": "Problem: Write a C program to insert an element x at a given 1-based position pos in an array of n integers. Shift existing elements to the right to make space.\n\nInput:\n- First line: integer n (1 <= n <= 100)\n- Second line: n space-separated integers (the array)\n- Third line: integer pos (1 <= pos <= n+1)\n- Fourth line: integer x (element to insert)\n\nOutput:\n- Print the updated array (n+1 integers) in a single line, space-separated.\n\nExample:\nInput:\n5\n1 2 4 5 6\n3\n3\nOutput:\n1 2 3 4 5 6"
  },
  "question2": {
    "name": "Two Sum",
    "link": "https://leetcode.com/problems/two-sum/",
    "difficulty": "Easy"
  },
  "topics": [
    "Array Basics",
    "Hash Tables"
  ]
}
```

## Troubleshooting:

### Modal not opening for Question 1?
- Check browser console (F12) for errors
- Verify JSON is valid (use jsonlint.com)
- Make sure `question1` has both `title` and `description`

### Question 2 link not working?
- Verify the `link` field contains a valid URL
- Check that URL starts with `https://`

### Questions not showing?
- Confirm file is named exactly `challenge_syllabus_aligned.json`
- Check that it's in the root directory (same folder as index.html)
- View browser console for error messages

### Search not finding questions?
- Search works on:
  - Day number
  - Question 1 title
  - Question 2 name
  - Topics
  - Unit names

## Tips:

1. **Keep descriptions clear**: Use proper formatting in the description field
2. **Use \n for new lines**: JSON requires `\n` for line breaks in strings
3. **Escape quotes**: Use `\"` for quotes inside the description
4. **Test locally first**: Open index.html locally to test before pushing to GitHub
5. **Validate JSON**: Use a JSON validator before uploading

## Need Help?

1. Check the browser console (F12)
2. Verify JSON format is correct
3. Make sure all 4 files are uploaded
4. Confirm GitHub Pages is enabled

---

**You're all set!** Your 100 Days of DSA Challenge now has:
- Custom C programming problems
- Direct LeetCode/GFG links  
- Beautiful modal for problem viewing
- Daily unlock at 7 AM IST
- Full progress tracking

Happy Coding! 🚀💻

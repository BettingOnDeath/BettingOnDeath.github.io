# Workflow: Adding a New Blog Post

## Quick Reference

When you add a new blog post to the `blogs/` directory, follow these steps:

### 1. Create Your Blog Post
- Create a new markdown file in `blogs/` directory
- Use date-based naming: `YYMMDD.md` (e.g., `260215.md`)
- **Important:** Avoid Chinese characters or spaces in filename
- Write your content using markdown syntax

### 2. Add Images (Optional)
If your post includes images:
- Place images in `blogs/assets/` directory (any subdirectory structure is fine)
- Use Obsidian syntax in your markdown: `![[image_name.jpg]]`
- **Important:** Image filenames should use only ASCII characters (no Chinese)
  - If you have Chinese filenames, run `python rename_images.py` first

### 3. Process and Deploy
Run these commands in order:

```bash
# Step 1: Convert markdown and copy to docs folder
python build.py

# Step 2: Update blog metadata in JavaScript
# Edit docs/js/blog.js and add your post to postsMetadata array
```

### 4. Update Blog Metadata
Edit `docs/js/blog.js` and add your new post to the `postsMetadata` array:

```javascript
postsMetadata: [
  { id: 'YYMMDD', date: 'YYYY-MM-DD', title: 'Your Post Title' },
  // ... existing posts
]
```

**Example:**
```javascript
postsMetadata: [
  { id: '260215', date: '2026-02-15', title: '新的想法' },
  { id: '260214', date: '2026-02-14', title: '世界是多余的' },
  // ... other posts
]
```

### 5. Test Locally (Optional)
```bash
cd docs
python -m http.server 8000
# Open http://localhost:8000 in browser
```

### 6. Deploy to GitHub
```bash
git add .
git commit -m "Add new blog post: YYMMDD"
git push
```

GitHub Pages will automatically deploy your changes.

---

## Detailed Workflow

### File Naming Conventions

**Blog Posts:**
- Format: `YYMMDD.md` or `YYMMDD_description.md`
- ✅ Good: `260215.md`, `260215_thoughts.md`
- ❌ Bad: `260215 想法.md` (contains space and Chinese)

**Images:**
- Use only ASCII characters: letters, numbers, underscores, hyphens
- ✅ Good: `img_20260215_001.jpg`, `photo-001.png`
- ❌ Bad: `微信图片_001.jpg` (contains Chinese)

### What Each Script Does

**`build.py`** - Main preprocessing script
- Converts Obsidian image syntax `![[image.jpg]]` to standard markdown `![](assets/image.jpg)`
- Copies markdown files from `blogs/` to `docs/blogs/`
- Copies and flattens images from `blogs/assets/` to `docs/blogs/assets/`

**`rename_images.py`** - Image filename sanitizer
- Renames image files to remove Chinese characters
- Updates markdown files with new image names
- Run this BEFORE `build.py` if you have Chinese filenames

### Troubleshooting

**Images not showing?**
1. Check image filenames contain only ASCII characters
2. Verify images are in `blogs/assets/` directory
3. Run `python build.py` to copy images to docs folder
4. Check browser console for 404 errors

**Blog post not appearing?**
1. Verify you added the post to `postsMetadata` in `docs/js/blog.js`
2. Check the `id` matches your filename (without .md extension)
3. Clear browser cache and reload

**404 errors?**
1. Ensure filenames have no spaces or Chinese characters
2. Check that `build.py` successfully copied files to `docs/blogs/`
3. Verify the file exists in `docs/blogs/` directory

---

## Complete Example

Let's say you want to add a blog post dated February 15, 2026:

### Step 1: Create the markdown file
```bash
# Create blogs/260215.md
```

Content:
```markdown
今天的想法

这是我的新博客文章。

![[my_photo.jpg]]
```

### Step 2: Add image
```bash
# Place image in blogs/assets/
cp ~/Pictures/photo.jpg blogs/assets/my_photo.jpg
```

### Step 3: Process files
```bash
python build.py
```

### Step 4: Update metadata
Edit `docs/js/blog.js`:
```javascript
postsMetadata: [
  { id: '260215', date: '2026-02-15', title: '今天的想法' },
  { id: '260214', date: '2026-02-14', title: '世界是多余的' },
  // ... rest
]
```

### Step 5: Deploy
```bash
git add .
git commit -m "Add blog post: 今天的想法"
git push
```

Done! Your blog post will be live on GitHub Pages in a few minutes.

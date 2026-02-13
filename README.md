# Blog Static Website

A personal blog with strict Swiss/Neo-Brutalist design aesthetic. Pure black and white, no decorative elements, extreme typographic contrast.

## Features

- Static HTML/CSS/JavaScript site
- Client-side markdown rendering
- Swiss/Neo-Brutalist design system
- Responsive layout
- GitHub Pages ready

## Project Structure

```
Blog/
├── blogs/                  # Source markdown files (Obsidian vault)
│   ├── *.md               # Blog posts
│   └── assets/            # Images and media
├── docs/                  # Deployment folder (GitHub Pages)
│   ├── index.html         # Home page
│   ├── post.html          # Blog post template
│   ├── archive.html       # Archive page
│   ├── about.html         # About page
│   ├── css/
│   │   └── style.css      # Swiss/Neo-Brutalist styles
│   ├── js/
│   │   └── blog.js        # Markdown rendering logic
│   └── blogs/             # Converted markdown files
│       ├── *.md           # Processed blog posts
│       └── assets/        # Copied media files
└── build.py               # Preprocessing script
```

## Setup and Deployment

### 1. Add New Blog Posts

Add markdown files to the `blogs/` folder using Obsidian or any text editor.

### 2. Run Preprocessing

Convert Obsidian syntax and copy files to docs folder:

```bash
python build.py
```

This script:
- Converts `![[image.jpg]]` to `![](assets/image.jpg)`
- Copies markdown files to `docs/blogs/`
- Copies assets folder to `docs/blogs/assets/`

### 3. Update Blog Metadata

Edit `docs/js/blog.js` and add your new post to the `postsMetadata` array:

```javascript
postsMetadata: [
  { id: 'YYMMDD', date: 'YYYY-MM-DD', title: 'Your Post Title' },
  // ... other posts
]
```

### 4. Deploy to GitHub Pages

1. Push your repository to GitHub
2. Go to repository Settings → Pages
3. Set source to "Deploy from a branch"
4. Select branch: `main` and folder: `/docs`
5. Save and wait for deployment

Your site will be available at: `https://[username].github.io/[repository-name]/`

## Local Development

To test locally, you need a local web server (due to CORS restrictions with file:// protocol):

### Option 1: Python
```bash
cd docs
python -m http.server 8000
```

### Option 2: Node.js
```bash
cd docs
npx serve
```

Then open `http://localhost:8000` in your browser.

## Design System

The site follows strict Swiss/Neo-Brutalist principles:

- **Colors:** Pure black (#000000) and pure white (#FFFFFF) only
- **Typography:** Neo-Grotesque Sans-Serif (Helvetica Neue, Arial, Inter)
- **Type Scale:** Extreme contrast (12-20rem display to 0.875rem body)
- **Layout:** Rigid grid system with 1px solid black separators
- **No decorative elements:** No shadows, gradients, or rounded corners
- **Functional whitespace:** Generous padding for data grouping

## Customization

### Update Site Content

- **Brand initials:** Edit the `brand-initial` divs in HTML files
- **Navigation:** Modify the `nav` section in each HTML file
- **About page:** Edit `docs/about.html` with your information
- **Footer text:** Update `footer-text` divs in HTML files

### Modify Design

All design specifications are in `docs/css/style.css`. The design system uses CSS custom properties (variables) for easy customization:

```css
:root {
  --color-bg: #FFFFFF;
  --color-fg: #000000;
  --text-super-display: clamp(8rem, 15vw, 20rem);
  /* ... more variables */
}
```

## Adding New Posts Workflow

1. Write your post in `blogs/YYMMDD.md`
2. Add images to `blogs/assets/` using Obsidian syntax: `![[image.jpg]]`
3. Run `python build.py` to process files
4. Update `docs/js/blog.js` with post metadata
5. Commit and push to GitHub
6. GitHub Pages will automatically deploy

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled for markdown rendering
- Responsive design for mobile, tablet, and desktop

## License

Personal project. Design specifications documented in project root.

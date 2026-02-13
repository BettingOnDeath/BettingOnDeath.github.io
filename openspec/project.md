# Project Context

## Purpose
Personal blog platform focused on philosophical and creative content with a strict Swiss/Neo-Brutalist design aesthetic. The blog emphasizes raw information structure over decoration, using extreme typographic contrast and monochromatic color schemes.

## Tech Stack
- **Content Management:** Obsidian (markdown-based)
- **Content Format:** Markdown files with embedded images
- **Languages:** Bilingual (Chinese/English)
- **Frontend:** HTML/CSS (static site generation implied)
- **Typography:** Neo-Grotesque Sans-Serif (Helvetica Neue, Arial, Inter)
- **Design System:** Custom Swiss/Neo-Brutalist specifications

## Project Conventions

### Code Style
- **HTML/CSS:** Semantic markup with strict adherence to design specifications
- **Naming:** Descriptive, lowercase with hyphens for CSS classes
- **File Organization:**
  - `/blogs` - Blog content in markdown (date-based naming: YYMMDD.md)
  - `/blogs/assets` - Media files
  - `/openspec` - Project documentation and specifications
  - Root level - Design specification documents

### Architecture Patterns
- **Content-First:** Markdown files as single source of truth
- **Design-Driven:** All UI decisions follow documented design specifications
- **Static Generation:** Content compiled from markdown to HTML
- **Component-Based:** Reusable UI components following strict specifications
- **Grid System:** Rigid horizontal/vertical rhythm with full-width section separators

### Testing Strategy
- Visual regression testing for design compliance
- Cross-browser compatibility testing
- Responsive design validation (desktop, tablet, mobile)
- Typography scale verification across viewport sizes

### Git Workflow
- Feature-based development
- Design specifications maintained in root-level markdown files
- OpenSpec system for change proposals and architectural decisions

## Domain Context

### Design Philosophy
The project follows **Strict Swiss/Neo-Brutalist** principles:
- **Objectivity:** No emotional design elements (no shadows, gradients, rounded corners)
- **Structure:** Content organized by visible grids and rigid lines
- **Contrast:** Extreme scale difference between display text (12-20rem) and body text (0.875-1rem)
- **Monochromatic:** Pure white background (#FFFFFF) with pure black foreground (#000000)
- **Typography:** Exaggerated type scale with tight line-height for headers, open for body text

### Content Structure
- Blog posts use date-based naming (YYMMDD.md)
- Bilingual content (primarily Chinese with English elements)
- Philosophical and creative writing focus
- Image embedding using Obsidian syntax: `![[filename.jpg]]`

## Important Constraints

### Design Constraints (STRICT)
1. **Color:** Only pure black (#000000) and pure white (#FFFFFF) - no grays, no opacity changes
2. **Typography:** No decorative fonts, only Neo-Grotesque Sans-Serif
3. **Borders:** Only 1px solid black lines, full-width horizontal separators
4. **Spacing:** Functional whitespace only - no decorative padding
5. **Alignment:** Strictly left-aligned text (no justified text to avoid rivers)
6. **Hover States:** No movement animations, only underline or color inversion
7. **Images:** No borders, natural aspect ratios, float in white space
8. **Responsive:** Super Display typography must scale with viewport units (vw)

### Technical Constraints
- Content must remain in markdown format for Obsidian compatibility
- All design specifications must be preserved during implementation
- No JavaScript frameworks that conflict with brutalist aesthetic
- Performance: Minimal dependencies, fast load times

## External Dependencies
- **Obsidian:** Content management and editing
- **Image Assets:** Stored in `/blogs/assets` directory
- **Fonts:** System fonts or web fonts (Helvetica Neue, Arial, Inter)
- **OpenSpec:** Change proposal and specification management system

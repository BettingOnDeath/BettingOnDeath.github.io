# Layout & Grid System Specifications

## 1. The Container

- **Width:** 100% Fluid. The design embraces the edges of the viewport.
    
- **Margins:** Minimal horizontal margins (e.g., `1rem` or `20px`) on mobile, slightly larger on desktop, but elements often touch the exact edge of the browser window.
    

## 2. The Grid Structure

The layout is defined by a rigid horizontal and vertical rhythm.

### Horizontal Division (The "Floor" Concept)

The page is sliced into horizontal distinct sections separated by full-width **1px solid black** border-lines.

- **Top Bar:** Navigation and Branding.
    
- **Hero/Title:** Section identification.
    
- **Content Blocks:** Information density.
    
- **Footer:** Closing bookends.
    

### Vertical Columns

Content within horizontal slices is organized into a flexible column system:

- **2-Column:** Asymmetrical split (e.g., 1/3 Left Context, 2/3 Right Details).
    
- **4-Column:** Even split for data-heavy sections (e.g., Distribution lists).
    
- **Alignment:** Text is strictly **Left-Aligned**. Justified text is forbidden to avoid "rivers" of white space.
    

## 3. Spacing Rules (Whitespace)

Whitespace is functional, not decorative. It is used to group data.

- **Vertical Padding:** Generous padding _inside_ the horizontal lines (e.g., `py-12` or `3rem`).
    
- **Gap:** Gaps between columns should be significant (approx `2rem` to `4rem`) to clearly separate data sets without vertical dividers (vertical lines are rare, horizontal lines are dominant).
    

## 4. Responsive Behavior

- **Desktop:** Multi-column (2, 3, or 4).
    
- **Tablet:** Collapse 4 columns to 2 grid.
    
- **Mobile:** Collapse all to single column (Stack vertical).
    
- **Scaling:** The "Super Display" typography must scale using viewport units (`vw`) so it never breaks layout but remains massive.
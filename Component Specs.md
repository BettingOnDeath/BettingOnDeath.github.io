# Component Specifications

## 1. Navigation & Header

- **Layout:** Flexbox, Space-Between.
    
- **Elements:**
    
    - Left Anchor: Massive Brand Initial (e.g., "S").
        
    - Center/Left: Small, comma-separated list of links (News, About, Catalog).
        
    - Right Anchor: Massive Brand Suffix or Page Indicator (e.g., "P").
        
- **Behavior:** Sticky top is optional, but strict separation from content via a bottom border is mandatory.
    

## 2. Section Separators

- **Visual:** Full width `1px` solid black line (`border-t` or `border-b`).
    
- **Typography:** Section titles (e.g., "DISTRIBUTION") often hang immediately below the border line, strictly left-aligned.
    

## 3. Data Lists & Links

- **Style:** Unordered lists with no bullets.
    
- **Hierarchy:**
    
    1. **Title:** Uppercase, smaller font (e.g., "SECRETLY DISTRIBUTION").
        
    2. **Subtitle:** Italicized or lighter weight (e.g., _RECORDS / WORLDWIDE_).
        
    3. **Content:** Block of address or details.
        
    4. **Action:** Links at the bottom.
        
- **Link Indicators:** Use raw glyphs for interactivity prompts.
    
    - Arrow: `→ Link`
        
    - Pipe: `link | email`
        
- **Hover States:** No movement. Text-decoration (underline) appears, or background/text color swap (invert).
    

## 4. Imagery (If applicable)

- **Aspect Ratio:** Natural/Original.
    
- **Borders:** Images usually do not have borders; they float in the white space.
    
- **Captions:** Tiny text placed immediately below or to the side, strictly aligned with the image edge.
    

## 5. Footer

- Similar to the Header.
    
- Uses large typography as structural "bookends" (e.g., "SHELTER" on far left, "PRESS" on far right).
    
- Full-width top border.
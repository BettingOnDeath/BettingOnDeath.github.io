#!/usr/bin/env python3
"""
Rename image files to avoid Chinese characters and update markdown references
"""

import os
import re
from pathlib import Path

# Directories
BLOGS_DIR = Path('blogs')
ASSETS_DIR = BLOGS_DIR / 'assets'

def sanitize_filename(filename):
    """Convert Chinese filename to ASCII-safe name"""
    # Extract date/time components if present
    # Pattern: 微信图片_2026-02-14_005225_933.jpg -> img_20260214_005225_933.jpg
    match = re.search(r'(\d{4})-(\d{2})-(\d{2})_(\d{6})_(\d{3})', filename)
    if match:
        year, month, day, time, num = match.groups()
        ext = Path(filename).suffix
        return f"img_{year}{month}{day}_{time}_{num}{ext}"

    # Fallback: use hash or simple numbering
    ext = Path(filename).suffix
    # Remove Chinese characters and special chars, keep only alphanumeric
    safe_name = re.sub(r'[^\w\-_\.]', '_', filename)
    return safe_name

def rename_images():
    """Rename all image files in assets folder"""
    rename_map = {}

    for root, dirs, files in os.walk(ASSETS_DIR):
        for filename in files:
            if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                old_path = Path(root) / filename
                new_filename = sanitize_filename(filename)
                new_path = Path(root) / new_filename

                if old_path != new_path:
                    print(f"Renaming: {filename}")
                    print(f"      to: {new_filename}")

                    # Rename the file
                    old_path.rename(new_path)

                    # Store mapping for markdown updates
                    rename_map[filename] = new_filename

    return rename_map

def update_markdown_files(rename_map):
    """Update markdown files with new image names"""
    for md_file in BLOGS_DIR.glob('*.md'):
        print(f"\nUpdating {md_file.name}...")

        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # Update image references
        for old_name, new_name in rename_map.items():
            # Match both Obsidian syntax and standard markdown
            content = content.replace(f'![[{old_name}]]', f'![[{new_name}]]')
            content = content.replace(f'![](assets/{old_name})', f'![](assets/{new_name})')

        # Write back if changed
        if content != original_content:
            with open(md_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  [OK] Updated references in {md_file.name}")
        else:
            print(f"  [-] No changes needed in {md_file.name}")

def main():
    print("=" * 60)
    print("Renaming image files to avoid Chinese characters")
    print("=" * 60)

    # Rename images
    rename_map = rename_images()

    print("\n" + "=" * 60)
    print(f"Renamed {len(rename_map)} files")
    print("=" * 60)

    # Update markdown files
    if rename_map:
        print("\nUpdating markdown files...")
        update_markdown_files(rename_map)

    print("\n" + "=" * 60)
    print("Done! Run 'python build.py' to update docs folder")
    print("=" * 60)

if __name__ == '__main__':
    main()

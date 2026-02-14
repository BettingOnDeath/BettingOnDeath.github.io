// Convert Obsidian image syntax to standard markdown
function convertObsidianImages(markdown) {
  // Convert ![[image.jpg]] to ![](assets/image.jpg)
  return markdown.replace(/!\[\[([^\]]+)\]\]/g, '![](assets/$1)');
}

// Fetch and render markdown content
async function fetchMarkdown(filename) {
  try {
    const response = await fetch(`${BLOG_CONFIG.blogFolder}${filename}.md`);
    if (!response.ok) throw new Error('Failed to fetch markdown');
    let markdown = await response.text();

    // Convert Obsidian syntax
    markdown = convertObsidianImages(markdown);

    return markdown;
  } catch (error) {
    console.error('Error fetching markdown:', error);
    return null;
  }
}

// Render markdown to HTML using marked.js
function renderMarkdown(markdown) {
  if (typeof marked === 'undefined') {
    console.error('marked.js library not loaded');
    return markdown;
  }
  return marked.parse(markdown);
}

// Load blog post list on home page
async function loadBlogList() {
  const container = document.getElementById('blog-list');
  if (!container) return;

  for (const post of BLOG_CONFIG.postsMetadata) {
    const markdown = await fetchMarkdown(post.id);
    if (!markdown) continue;

    // Get first 300 characters as raw excerpt (embrace the raw aesthetic)
    const rawExcerpt = markdown.substring(0, 300).trim();

    const postElement = document.createElement('article');
    postElement.className = 'post-item';
    postElement.innerHTML = `
      <div class="post-meta">${post.date.replace(/-/g, '.')} // #ARCHIVE</div>
      <h2 class="post-title">
        <a href="post.html?id=${post.id}">${post.title || post.id}</a>
      </h2>
      <div class="post-excerpt-raw">${rawExcerpt}${rawExcerpt.length >= 300 ? '...' : ''}</div>
      <a href="post.html?id=${post.id}" class="link-arrow mt-sm">READ_MORE</a>
    `;
    container.appendChild(postElement);
  }
}

// Load single blog post
async function loadBlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    document.getElementById('post-content').innerHTML = '<p>Post not found</p>';
    return;
  }

  // Find post metadata
  const postMeta = BLOG_CONFIG.postsMetadata.find(p => p.id === postId);
  if (!postMeta) {
    document.getElementById('post-content').innerHTML = '<p>Post metadata not found</p>';
    return;
  }

  // Update post metadata
  document.getElementById('post-date').textContent = postMeta.date.replace(/-/g, '.') + ' // #ARCHIVE';
  document.getElementById('post-title').textContent = postMeta.title || postId;

  // Load and render markdown content
  const markdown = await fetchMarkdown(postId);
  if (!markdown) {
    document.getElementById('post-content').innerHTML = '<p>Failed to load post</p>';
    return;
  }

  // Render markdown (without images, they'll be shown separately)
  const html = renderMarkdown(markdown);
  document.getElementById('post-content').innerHTML = html;

  // Load images in right column
  loadPostImages(postId, postMeta.images);
}

// Load post images in right column
function loadPostImages(postId, images) {
  const container = document.getElementById('post-images');
  if (!container || !images || images.length === 0) {
    if (container) {
      container.innerHTML = '<div class="post-image-caption">NO_IMAGES / ARCHIVE</div>';
    }
    return;
  }

  container.innerHTML = '';

  images.forEach((image, index) => {
    const imageItem = document.createElement('div');
    imageItem.className = 'post-image-item';
    imageItem.innerHTML = `
      <img src="blogs/assets/${postId}/${image}" alt="Image ${index + 1}">
      <div class="post-image-caption">
        IMG_REF: ${postId.toUpperCase()}_${String(index + 1).padStart(2, '0')}<br>
        FILE: ${image}<br>
        INDEX: ${index + 1}/${images.length}
      </div>
    `;
    container.appendChild(imageItem);
  });
}

// Load archive page
async function loadArchive() {
  const container = document.getElementById('archive-list');
  if (!container) return;

  const listElement = document.createElement('ul');
  listElement.className = 'data-list';

  for (const post of BLOG_CONFIG.postsMetadata) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="data-list-title">
        <a href="post.html?id=${post.id}">${post.title || post.id}</a>
      </div>
      <div class="data-list-subtitle">${post.date}</div>
    `;
    listElement.appendChild(listItem);
  }

  container.appendChild(listElement);
}

// Cycle through hero images on home page
function initImageCycling() {
  const heroImage = document.getElementById('hero-image');
  const imageMetadata = document.getElementById('image-metadata');

  if (!heroImage) return;

  // Load images from hero config
  const images = HERO_CONFIG.heroImages;

  if (!images || images.length === 0) return;

  let currentIndex = 0;

  function cycleImage() {
    currentIndex = (currentIndex + 1) % images.length;
    heroImage.src = images[currentIndex].src;
    if (imageMetadata) {
      imageMetadata.innerHTML = images[currentIndex].meta;
    }
  }

  // Cycle every 15 seconds
  setInterval(cycleImage, 15000);
}

// Initialize based on page
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  switch(page) {
    case 'home':
      loadBlogList();
      initImageCycling();
      break;
    case 'post':
      loadBlogPost();
      break;
    case 'archive':
      loadArchive();
      break;
  }
});

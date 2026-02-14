// Blog configuration
const BLOG_CONFIG = {
  blogFolder: 'blogs/',
  postsMetadata: [
    { id: '260214', date: '2026-02-14', title: '世界是多余的', images: ["img_20260214_005118_212.jpg", "img_20260214_005124_010.jpg", "img_20260214_005235_109.jpg"] },
    { id: '260213', date: '2026-02-13', title: '审美不是什么 part 1', images: [] },
    { id: '260126', date: '2026-01-26', title: '听我说，创造本身是一种高可维护性与复用性的避免布满褶皱缺乏解耦的哺乳动物脑激素电信号泄露污染的个体自', images: ["img_20260214_005225_933.jpg"] },
    { id: '220912', date: '2022-09-12', title: '计算机书法的走向问题', images: ["clipboard_2026-02-14_02-22.png"] },
    { id: '220520', date: '2022-05-20', title: '一些书法谵语', images: ["IMG_20251231_101436.jpg", "IMG_20251231_101806.jpg", "IMG_20251231_101746.jpg", "IMG_20251231_101719.jpg", "IMG_20251231_101703.jpg", "IMG_20251231_101648.jpg", "IMG_20251231_101631.jpg", "IMG_20251231_101617.jpg", "IMG_20251231_101537.jpg", "IMG_20251231_101521.jpg"] },
    { id: '211120', date: '2021-11-20', title: '《麦克白2021》', images: [] },
    { id: '170806_essays', date: '2017-08-06', title: '金华卷                  一片泪水', images: [] },
  ] },
    { id: '260213', date: '2026-02-13', title: '审美不是什么 part 1', images: [] },
    { id: '260126', date: '2026-01-26', title: '听我说，创造本身是一种高可维护性与复用性的避免布满褶皱缺乏解耦的哺乳动物脑激素电信号泄露污染的个体自', images: ["img_20260214_005225_933.jpg"] },
    { id: '220912', date: '2022-09-12', title: '计算机书法的走向问题', images: ["clipboard_2026-02-14_02-22.png"] },
    { id: '170806_essays', date: '2017-08-06', title: '金华卷                  一片泪水', images: [] },
  ]
};

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

  // List of images in assets/hero
  const images = [
    { src: 'assets/hero/IMG_20260213_152045.png', meta: 'IMG_REF: LAKE_VIEW / SUBJECT_01<br>AR: 4:5 / RAW CAPTURE<br>FILE: IMG_20260213_152045.PNG' },
  ];

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

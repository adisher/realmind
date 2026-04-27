// Fetch posts data
async function getPosts() {
  const response = await fetch('/data/posts.json');
  const data = await response.json();
  return data.posts;
}

// Get slug from URL
function getSlug() {
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  return parts[parts.length - 1];
}

async function renderBlogIndex() {
  const container = document.getElementById('blog-grid');
  const loading = document.getElementById('blog-loading');
  if (!container) return;

  try {
    const posts = await getPosts();
    if (loading) loading.style.display = 'none';

    if (!posts.length) {
      container.innerHTML = '<div class="blog-empty">No posts found.</div>';
      return;
    }

    container.innerHTML = posts.map((post, index) => `
      <article class="blog-card" data-animate data-delay="${index * 100}">
        <a href="/blog/${post.slug}" class="blog-card-link">
          <div class="blog-card-image">
            <img src="${post.image}" alt="${post.imageAlt}" loading="lazy">
          </div>
          <div class="blog-card-content">
            <div class="blog-card-meta">
              <span class="blog-card-category">${post.category}</span>
              <span class="blog-card-meta-dot"></span>
              <span class="blog-card-date">${post.date}</span>
            </div>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <span class="blog-card-read-more">Read More →</span>
          </div>
        </a>
      </article>
    `).join('');

  } catch (err) {
    if (loading) loading.textContent = 'Unable to load posts.';
    console.error('Blog index error:', err);
  }
}

async function renderPost() {
  const container = document.getElementById('post-container');
  const loading = document.getElementById('post-loading');
  if (!container) return;

  try {
    const slug = getSlug();
    const posts = await getPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      if (loading) loading.textContent = 'Post not found.';
      return;
    }

    // Update page meta
    document.title = `${post.title} — Real Mind Psychotherapy`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', post.excerpt);

    // Populate hero
    document.getElementById('post-category').textContent = post.category;
    document.getElementById('post-date').textContent = post.date;
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-author').textContent = `By ${post.author}`;

    // Featured image
    const imgEl = document.getElementById('post-image');
    if (imgEl) {
      imgEl.src = post.image;
      imgEl.alt = post.imageAlt;
    }

    // Content blocks
    const contentEl = document.getElementById('post-content');
    if (contentEl) {
      contentEl.innerHTML = post.content.map(block => {
        switch (block.type) {
          case 'paragraph':
            return `<p class="post-body">${block.text}</p>`;
          case 'h2':
            return `<h2 class="post-h2">${block.text}</h2>`;
          case 'h3':
            return `<h3 class="post-h3">${block.text}</h3>`;
          case 'blockquote':
            return `<blockquote class="post-quote"><p>${block.text}</p></blockquote>`;
          case 'list':
            return `<ul class="post-list">${(block.items || []).map(i => `<li>${i}</li>`).join('')}</ul>`;
          default:
            return '';
        }
      }).join('');
    }

    // Tags
    const tagsEl = document.getElementById('post-tags');
    if (tagsEl && post.tags) {
      tagsEl.innerHTML = post.tags.map(tag =>
        `<span class="post-tag">${tag}</span>`
      ).join('');
    }

    // Related posts
    const relatedContainer = document.getElementById('related-posts');
    if (relatedContainer) {
      const related = posts.filter(p => p.slug !== slug).slice(0, 3);
      relatedContainer.innerHTML = related.map(p => `
        <a href="/blog/${p.slug}" class="related-card">
          <div class="related-card-image">
            <img src="${p.image}" alt="${p.imageAlt}" loading="lazy">
          </div>
          <div class="related-card-content">
            <span class="related-card-category">${p.category}</span>
            <h4 class="related-card-title">${p.title}</h4>
          </div>
        </a>
      `).join('');
    }

    // Show post
    if (loading) loading.style.display = 'none';
    container.style.display = 'block';

  } catch (err) {
    if (loading) loading.textContent = 'Unable to load post.';
    console.error('Post render error:', err);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function () {
  renderBlogIndex();
  renderPost();
});
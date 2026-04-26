/* ===========================
   BLOG.JS
   Handles blog index rendering and single post rendering.
   All content is driven by /data/posts.json.
   =========================== */

const POSTS_URL = '/data/posts.json';

/* ===========================
   FETCH POSTS
   =========================== */
async function fetchPosts() {
  const res = await fetch(POSTS_URL);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

/* ===========================
   BLOG INDEX — renders into #blog-grid
   =========================== */
async function renderBlogIndex() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  try {
    const posts = await fetchPosts();

    if (!posts.length) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--rm-text-muted)">No posts yet. Check back soon.</p>';
      return;
    }

    grid.innerHTML = posts.map((post, i) => `
      <article class="blog-card" data-animate data-delay="${i * 100}">
        <a href="/blog/post?slug=${post.slug}" class="blog-card__img-wrap">
          <img src="${post.image}" alt="${post.imageAlt || post.title}" loading="lazy">
          <span class="blog-card__category">${post.category}</span>
        </a>
        <div class="blog-card__body">
          <time class="blog-card__date" datetime="${post.dateISO}">${post.date}</time>
          <h3 class="blog-card__title">
            <a href="/blog/post?slug=${post.slug}">${post.title}</a>
          </h3>
          <p class="blog-card__excerpt">${post.excerpt}</p>
          <a href="/blog/post?slug=${post.slug}" class="blog-card__read-more">
            Read More <span aria-hidden="true">→</span>
          </a>
        </div>
      </article>
    `).join('');

    /* re-observe newly inserted elements */
    document.querySelectorAll('[data-animate]:not(.animated)').forEach(el => {
      if (window.__animObserver) window.__animObserver.observe(el);
    });

  } catch (err) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--rm-text-muted)">Unable to load posts right now.</p>';
    console.error(err);
  }
}

/* ===========================
   SINGLE POST — renders into post.html IDs
   =========================== */
async function renderSinglePost() {
  const postTitle = document.getElementById('post-title');
  if (!postTitle) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    document.querySelector('main')?.insertAdjacentHTML('afterbegin', '<p style="text-align:center;padding:4rem 0">Post not found.</p>');
    return;
  }

  try {
    const posts = await fetchPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      document.querySelector('main')?.insertAdjacentHTML('afterbegin', '<p style="text-align:center;padding:4rem 0">Post not found.</p>');
      return;
    }

    /* Update page title */
    document.title = `${post.title} — Real Mind Psychotherapy`;

    /* Populate fields */
    const setHTML = (id, html) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    };
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setText('post-category', post.category);
    setText('post-date', post.date);
    setText('post-title', post.title);
    setText('post-author', `By ${post.author}`);

    const imgEl = document.getElementById('post-image');
    if (imgEl) {
      imgEl.src = post.image;
      imgEl.alt = post.imageAlt || post.title;
    }

    /* Render content blocks */
    const contentEl = document.getElementById('post-content');
    if (contentEl && Array.isArray(post.content)) {
      contentEl.innerHTML = post.content.map(block => {
        switch (block.type) {
          case 'h2':
            return `<h2>${block.text}</h2>`;
          case 'h3':
            return `<h3>${block.text}</h3>`;
          case 'paragraph':
            return `<p>${block.text}</p>`;
          case 'blockquote':
            return `<blockquote>${block.text}</blockquote>`;
          case 'list':
            return `<ul>${block.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
          default:
            return '';
        }
      }).join('');
    }

    /* Render related posts (up to 3, excluding current) */
    const relatedEl = document.getElementById('related-posts');
    if (relatedEl) {
      const related = posts.filter(p => p.slug !== slug).slice(0, 3);
      relatedEl.innerHTML = related.map(p => `
        <article class="blog-card">
          <a href="/blog/post?slug=${p.slug}" class="blog-card__img-wrap">
            <img src="${p.image}" alt="${p.imageAlt || p.title}" loading="lazy">
            <span class="blog-card__category">${p.category}</span>
          </a>
          <div class="blog-card__body">
            <time class="blog-card__date" datetime="${p.dateISO}">${p.date}</time>
            <h3 class="blog-card__title">
              <a href="/blog/post?slug=${p.slug}">${p.title}</a>
            </h3>
            <p class="blog-card__excerpt">${p.excerpt}</p>
            <a href="/blog/post?slug=${p.slug}" class="blog-card__read-more">Read More →</a>
          </div>
        </article>
      `).join('');
    }

  } catch (err) {
    console.error(err);
  }
}

/* ===========================
   INIT
   =========================== */
renderBlogIndex();
renderSinglePost();

# Real Mind Psychotherapy — Build Instructions for Claude Code

## Project Overview
Static HTML/CSS/JS website for Real Mind Psychotherapy.
Deployed on Vercel. Forms handled via Resend serverless functions.
Blog content managed via /data/posts.json — no CMS needed.

## Tech Stack
- Pure HTML, CSS, JavaScript (no framework)
- Vercel for hosting + serverless API routes
- Resend for email (contact form + join form)
- JSON-driven blog

## File Structure
realmind/
├── data/posts.json          ← Blog content — update this to add posts
├── css/
│   ├── global.css           ← CSS variables, reset, typography, buttons
│   ├── header.css           ← Header + dropdown + mobile menu
│   ├── footer.css           ← Footer styles
│   └── animations.css       ← Scroll animation classes
├── js/
│   ├── main.js              ← Header scroll, dropdown, mobile menu, animations, header/footer injection
│   └── blog.js              ← Blog index rendering + single post rendering from JSON
├── api/
│   ├── contact.js           ← Vercel serverless — contact form → Resend
│   └── join.js              ← Vercel serverless — join form → Resend
├── images/                  ← All images go here
├── blog/
│   └── post.html            ← Single blog post template (rendered by blog.js)
├── index.html               ← Home
├── about.html
├── individual-therapy.html
├── couples-therapy.html
├── family-therapy.html
├── meet-the-team.html
├── fees.html
├── contact.html
├── join-our-team.html
├── blog.html
├── privacy-policy.html
├── terms.html
├── vercel.json
├── package.json
├── .env.local               ← Never commit
└── .gitignore

## Every HTML Page Must Follow This Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE TITLE — Real Mind Psychotherapy</title>
  <meta name="description" content="PAGE DESCRIPTION">
  <link rel="icon" href="/images/favicon.png">
  <link rel="stylesheet" href="/css/global.css">
  <link rel="stylesheet" href="/css/header.css">
  <link rel="stylesheet" href="/css/animations.css">
  <link rel="stylesheet" href="/css/footer.css">
</head>
<body>
  <div id="header-mount"></div>
  <main>
    <!-- PAGE CONTENT -->
  </main>
  <div id="footer-mount"></div>
  <script src="/js/main.js" type="module"></script>
</body>
</html>
```

## Color Palette (CSS Variables — already in global.css)
- --rm-bg: #F7F4EE (warm off-white, page background)
- --rm-bg-card: #E8E0D0 (card backgrounds)
- --rm-accent: #C4B49A (sand/gold, accent color)
- --rm-green: #3D5A47 (forest green, primary)
- --rm-text: #1E1E1E (near-black)
- --rm-text-muted: #5C6B5E (muted body text)

## Typography
- Headings: Georgia, serif
- Body: Arial, sans-serif
- All font sizes use clamp() for responsiveness

## Images Available in /images/
- logo.png — main logo (dark, for light backgrounds)
- logo-white.png — white version for footer
- favicon.png — browser icon
- hero-bg.jpg — hero section background (therapy session, warm room)
- approach-img.jpg — woman in armchair contemplating
- why-choose-img.jpg — therapist and client session
- founder.jpg — Glad Uko-Ima headshot
- dr-uko-ima.jpg — Dr. Uko-Ima headshot
- blog-1.jpg through blog-4.jpg — blog post featured images

## Page-by-Page Content Instructions

### index.html (Home)
Sections in order:
1. Hero — full bleed image (hero-bg.jpg), headline "Renew Your Mind. Restore Your Life. Transform Your Relationships.", subtext, two buttons (Schedule Consultation → /contact, Our Approach → /about), trust strip
2. Mission — centered text, label "Evidence-Based · Faith-Integrated · Results-Driven", heading about guiding individuals couples families, body paragraph
3. Services — dark green bg, 3 cards (Individual, Couples, Family) with numbered list items and learn more links
4. REAL MIND Approach — two column: approach-img.jpg left with caption overlay, text right with label/heading/body/three pillars (Body Mind Spirit), below: transformation grid 4 items
5. Who We Help — dark green bg, two column: conditions list left, specialty cards right
6. Why Choose Us — off-white bg, 5 cards, below: two column split with why-choose-img.jpg left and dark green panel right with quote + credentials + CTA button
7. CTA Banner — dark green bg, centered, heading "You don't have to stay stuck in the same patterns.", body, two buttons, reassurance strip

### about.html
Sections:
1. Page hero — dark green, "About Real Mind Psychotherapy" label, heading about high-level clinical care
2. Philosophy — two column sticky layout: left has label/heading/body/three pillars (Body Mind Spirit), right has 4 numbered blocks (Psychological Awareness, Relational Insight, Spiritual Alignment, Neurocognitive Regulation)
3. Founder bio — dark green bg, two column: photo left with credentials below, right has full bio in blocks with section headings and quote
4. CTA strip — off-white bg, centered, heading about gaining clarity, two buttons

### individual-therapy.html / couples-therapy.html / family-therapy.html
Each has:
1. Service hero — dark green, two column: left has label/heading/body/CTA button, right has 6 bullet cards listing what they help with
2. Detail section — off-white bg: left column has approach with numbered steps, right column dark green panel with outcomes list, below: two column split with faith integration left and pricing CTA right

### meet-the-team.html
Sections:
1. Hero — dark green, centered
2. Profiles — two full-width profiles stacked:
   - Glad: photo left (founder.jpg), bio right, sticky photo column
   - Dr. Uko-Ima: bio left, photo right (dr-uko-ima.jpg), sticky photo column, includes section headings and closing quote
3. Clinical Standards — dark green panel, 4 value cards

### fees.html
All in one section:
1. Hero — dark green centered
2. Two pricing cards — Individual ($175) and Couples/Family ($225, featured/dark green)
3. Insurance section — two column: insurance info left, private pay benefits right
4. CTA — dark green, two buttons

### contact.html
Sections:
1. Hero — dark green centered
2. Two column: contact info left (location, email, phone, response time, availability table), form right (Name, Email, Phone, Type of Therapy dropdown, Preferred Time dropdown, Message textarea, Submit button)

Form submission: POST to /api/contact
Success: show success message inline, hide form
Error: show error message inline

### join-our-team.html
Sections:
1. Hero — dark green
2. Standards & Values — two column: who we looking for left (4 value cards), requirements right (dark green panel with 4 bullet points)
3. Why Join — off-white card section with 3 columns (Licensed, Limited Permit, Students) each with bullet lists, below: dark green culture statement
4. Apply header — centered, 4 process cards in a row
5. Application form — centered, max-width 720px
   Fields: Name, Email, Phone, License Type (dropdown), Years of Experience (dropdown), Specialties (text), Therapy Type (dropdown), Weekly Availability (dropdown), Faith Integration (dropdown), Clinical Approach (textarea), LinkedIn (text), Submit
   POST to /api/join

### blog.html
Sections:
1. Hero — dark green, "Real Mind Journal" label, heading, body
2. Blog grid — id="blog-grid", rendered by blog.js from posts.json
   3 column grid on desktop, 1 column mobile
   Each card: image, category tag, date, title, excerpt, read more link

### blog/post.html
Structure:
- Post header: category, date (id="post-category", id="post-date")
- Post title: id="post-title"
- Author: id="post-author"
- Featured image: id="post-image"
- Content: id="post-content" (rendered by blog.js)
- Related posts: id="related-posts" (3 cards, rendered by blog.js)
- CTA strip at bottom linking to /contact

### privacy-policy.html / terms.html
- Dark green hero with title and last updated date
- Content sections with heading and body paragraphs
- Green contact box at bottom

## Form Handling Pattern
All forms use this JavaScript pattern:

```javascript
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      form.style.display = 'none';
      successMsg.style.display = 'block';
    } else {
      throw new Error('Failed');
    }
  } catch {
    errorMsg.style.display = 'block';
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  }
});
```

## Animation Pattern
Add data-animate attributes to elements that should animate on scroll:
- data-animate (no value) — fade up
- data-animate="fade" — fade only, no movement
- data-animate="left" — slide from left
- data-animate="right" — slide from right
- data-animate="scale" — scale up
- data-delay="200" — delay in ms before animating

Hero elements use class-based animation (hero-visible) added by main.js automatically.

## Blog — How to Add a New Post
Only edit /data/posts.json. Add a new object to the posts array:
```json
{
  "slug": "url-friendly-post-name",
  "title": "Full Post Title",
  "excerpt": "One sentence summary shown on blog index card",
  "category": "Category Name",
  "tags": ["tag1", "tag2"],
  "author": "Glad Uko-Ima",
  "date": "April 26, 2026",
  "dateISO": "2026-04-26",
  "image": "/images/blog-5.jpg",
  "imageAlt": "Description of image",
  "content": [
    { "type": "paragraph", "text": "Paragraph text here" },
    { "type": "h2", "text": "Section heading" },
    { "type": "blockquote", "text": "Quote text here" },
    { "type": "list", "items": ["item 1", "item 2"] }
  ]
}
```

## Deployment Instructions
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard:
   - RESEND_API_KEY
   - CLIENT_EMAIL
4. Vercel auto-deploys on every push to main

## DNS — Connecting Squarespace Domain to Vercel
1. In Vercel: Project → Settings → Domains → Add realmindpsychotherapy.com
2. Vercel provides A record and CNAME values
3. In Squarespace: Settings → Domains → DNS Settings
4. Update A record to Vercel's IP
5. Add CNAME for www pointing to cname.vercel-dns.com
6. DO NOT touch MX records (preserves email)
7. Wait 24-48 hours for propagation

## Environment Variables Required
- RESEND_API_KEY — get from resend.com dashboard
- CLIENT_EMAIL — the email address form submissions go to

## Notes for Claude Code
- Every page shares the same header and footer via JS injection (header-mount / footer-mount divs)
- All CSS variables are defined in global.css :root — always use var() not hardcoded hex
- Never use inline styles except for dynamic values
- All section classes follow rm- prefix convention (rm-hero, rm-mission, rm-services etc)
- Images are referenced from /images/ — use relative paths
- The blog is entirely driven by /data/posts.json — no server-side rendering needed
- Vercel cleanUrls:true in vercel.json means /about.html is accessible at /about
- Test forms locally with vercel dev command
- Mobile breakpoints: 768px (tablet), 480px (mobile)

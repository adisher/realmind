/* ===========================
   HEADER TEMPLATE
   =========================== */
const HEADER_HTML = `
<header class="rm-header" id="rm-header">
  <div class="rm-header__inner">
    <a href="/" class="rm-header__logo">
      <img src="/images/logo.png" alt="Real Mind Psychotherapy">
    </a>
    <nav class="rm-nav" id="rm-nav">
      <div class="rm-nav__item">
        <a href="/about" class="rm-nav__link">About</a>
      </div>
      <div class="rm-nav__item rm-nav__item--dropdown">
        <a href="#" class="rm-nav__link">Services</a>
        <div class="rm-dropdown">
          <a href="/individual-therapy" class="rm-dropdown__link">Individual Therapy</a>
          <a href="/couples-therapy" class="rm-dropdown__link">Couples Therapy</a>
          <a href="/family-therapy" class="rm-dropdown__link">Family Therapy</a>
        </div>
      </div>
      <div class="rm-nav__item">
        <a href="/meet-the-team" class="rm-nav__link">Our Team</a>
      </div>
      <div class="rm-nav__item">
        <a href="/fees" class="rm-nav__link">Fees</a>
      </div>
      <div class="rm-nav__item">
        <a href="/blog" class="rm-nav__link">Blog</a>
      </div>
      <div class="rm-nav__item">
        <a href="/join-our-team" class="rm-nav__link">Join Us</a>
      </div>
    </nav>
    <a href="/contact" class="rm-btn rm-btn-primary rm-header__cta">Schedule Consultation</a>
    <button class="rm-hamburger" id="rm-hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<div class="rm-mobile-menu" id="rm-mobile-menu">
  <a href="/" class="rm-mobile-menu__link">Home</a>
  <a href="/about" class="rm-mobile-menu__link">About</a>
  <div class="rm-mobile-menu__group">
    <span class="rm-mobile-menu__group-title">Services</span>
    <a href="/individual-therapy" class="rm-mobile-menu__sub-link">Individual Therapy</a>
    <a href="/couples-therapy" class="rm-mobile-menu__sub-link">Couples Therapy</a>
    <a href="/family-therapy" class="rm-mobile-menu__sub-link">Family Therapy</a>
  </div>
  <a href="/meet-the-team" class="rm-mobile-menu__link">Our Team</a>
  <a href="/fees" class="rm-mobile-menu__link">Fees</a>
  <a href="/blog" class="rm-mobile-menu__link">Blog</a>
  <a href="/join-our-team" class="rm-mobile-menu__link">Join Our Team</a>
  <a href="/contact" class="rm-btn rm-btn-primary rm-mobile-menu__cta">Schedule Consultation</a>
</div>
`;

/* ===========================
   FOOTER TEMPLATE
   =========================== */
const FOOTER_HTML = `
<footer class="rm-footer">
  <div class="container">
    <div class="rm-footer__grid">
      <div>
        <img src="/images/logo-white.png" alt="Real Mind Psychotherapy" class="rm-footer__logo">
        <p class="rm-footer__tagline">Evidence-based, faith-integrated psychotherapy for individuals, couples, and families in Ontario, Canada.</p>
        <div class="rm-footer__social">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="LinkedIn">LI</a>
        </div>
      </div>
      <div>
        <h4 class="rm-footer__col-title">Services</h4>
        <div class="rm-footer__links">
          <a href="/individual-therapy">Individual Therapy</a>
          <a href="/couples-therapy">Couples Therapy</a>
          <a href="/family-therapy">Family Therapy</a>
          <a href="/fees">Fees &amp; Insurance</a>
        </div>
      </div>
      <div>
        <h4 class="rm-footer__col-title">Company</h4>
        <div class="rm-footer__links">
          <a href="/about">About Us</a>
          <a href="/meet-the-team">Meet the Team</a>
          <a href="/blog">Blog</a>
          <a href="/join-our-team">Join Our Team</a>
        </div>
      </div>
      <div>
        <h4 class="rm-footer__col-title">Contact</h4>
        <div class="rm-footer__contact-item">
          <strong>Email</strong>
          <span>hello@realmindpsychotherapy.com</span>
        </div>
        <div class="rm-footer__contact-item">
          <strong>Location</strong>
          <span>Ontario, Canada — virtual &amp; in-person</span>
        </div>
        <div class="rm-footer__contact-item">
          <strong>Hours</strong>
          <span>Mon–Fri: 9am–7pm · Sat: 10am–4pm</span>
        </div>
      </div>
    </div>
    <div class="rm-footer__bottom">
      <p class="rm-footer__copy">&copy; ${new Date().getFullYear()} Real Mind Psychotherapy. All rights reserved.</p>
      <div class="rm-footer__legal">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
`;

/* ===========================
   INJECT HEADER & FOOTER
   =========================== */
const headerMount = document.getElementById('header-mount');
const footerMount = document.getElementById('footer-mount');

if (headerMount) headerMount.innerHTML = HEADER_HTML;
if (footerMount) footerMount.innerHTML = FOOTER_HTML;

/* ===========================
   ACTIVE NAV LINK
   =========================== */
const currentPath = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';

document.querySelectorAll('.rm-nav__link, .rm-dropdown__link, .rm-mobile-menu__link, .rm-mobile-menu__sub-link').forEach(link => {
  try {
    const linkPath = new URL(link.href, window.location.origin).pathname
      .replace(/\.html$/, '')
      .replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  } catch { /* skip invalid hrefs */ }
});

/* ===========================
   HEADER SCROLL STATE
   =========================== */
const header = document.getElementById('rm-header');

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
}, { passive: true });

/* ===========================
   MOBILE MENU TOGGLE
   =========================== */
const hamburger = document.getElementById('rm-hamburger');
const mobileMenu = document.getElementById('rm-mobile-menu');

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu?.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger?.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ===========================
   SCROLL ANIMATIONS
   =========================== */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => el.classList.add('animated'), delay);
      animObserver.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

/* ===========================
   HERO ANIMATION
   =========================== */
document.querySelectorAll('.rm-hero').forEach(hero => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero.classList.add('hero-visible'));
  });
});

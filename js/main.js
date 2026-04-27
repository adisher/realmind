// =====================
// HEADER HTML
// =====================
const HEADER_HTML = `
<header id="header">
  <div class="header-inner">
    <a href="/" class="header-logo">
      <img src="/images/logo.png" alt="Real Mind Psychotherapy">
    </a>
    <nav>
      <ul class="header-nav">
        <li><a href="/">Home</a></li>
        <li class="header-nav-folder">
          <button class="services-btn">Services</button>
          <div class="rm-custom-dropdown">
            <a href="/individual-therapy" class="rm-dropdown-item">
              <span class="rm-dropdown-item-label">01</span>
              <span class="rm-dropdown-item-title">Individual Therapy</span>
              <span class="rm-dropdown-item-desc">Clarity, emotional regulation, and lasting personal change</span>
            </a>
            <div class="rm-dropdown-divider"></div>
            <a href="/couples-therapy" class="rm-dropdown-item">
              <span class="rm-dropdown-item-label">02</span>
              <span class="rm-dropdown-item-title">Couples Therapy</span>
              <span class="rm-dropdown-item-desc">Rebuild trust, improve communication, restore connection</span>
            </a>
            <div class="rm-dropdown-divider"></div>
            <a href="/family-therapy" class="rm-dropdown-item">
              <span class="rm-dropdown-item-label">03</span>
              <span class="rm-dropdown-item-title">Family Therapy</span>
              <span class="rm-dropdown-item-desc">Stronger families start with better understanding</span>
            </a>
            <div class="rm-dropdown-divider"></div>
            <div class="rm-dropdown-footer">
              <span class="rm-dropdown-footer-text">Faith-Integrated · Evidence-Based</span>
              <a href="/about" class="rm-dropdown-footer-link">Our approach →</a>
            </div>
          </div>
        </li>
        <li><a href="/about">About</a></li>
        <li><a href="/meet-the-team">Meet the Team</a></li>
        <li><a href="/fees">Fees</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    <button class="header-burger" aria-label="Open menu">
      <span class="burger-bar"></span>
      <span class="burger-bar"></span>
      <span class="burger-bar"></span>
    </button>
  </div>
</header>

<div class="mobile-menu">
  <button class="mobile-menu-close" aria-label="Close menu">×</button>
  <nav>
    <div class="mobile-nav-item"><a href="/">Home</a></div>
    <div class="mobile-nav-item">
      <button class="mobile-services-btn">Services</button>
      <div class="mobile-nav-sub mobile-services-sub">
        <a href="/individual-therapy">Individual Therapy</a>
        <a href="/couples-therapy">Couples Therapy</a>
        <a href="/family-therapy">Family Therapy</a>
      </div>
    </div>
    <div class="mobile-nav-item"><a href="/about">About</a></div>
    <div class="mobile-nav-item"><a href="/meet-the-team">Meet the Team</a></div>
    <div class="mobile-nav-item"><a href="/fees">Fees</a></div>
    <div class="mobile-nav-item"><a href="/blog">Blog</a></div>
    <div class="mobile-nav-item"><a href="/contact">Contact</a></div>
  </nav>
</div>
`;


// =====================
// FOOTER HTML
// =====================
const FOOTER_HTML = `
<footer id="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-logo-img">
          <img src="/images/logo.png" alt="Real Mind Psychotherapy">
        </div>
        <p class="footer-tagline">"Real change starts with a clear mind."</p>
        <div class="footer-badges">
          <div class="footer-badge"><span class="footer-badge-dot"></span>NY State Licensed Mental Health Counselor</div>
          <div class="footer-badge"><span class="footer-badge-dot"></span>Faith-Integrated Clinical Care</div>
          <div class="footer-badge"><span class="footer-badge-dot"></span>Telehealth across New York</div>
        </div>
      </div>
      <div>
        <div class="footer-col-heading">Services</div>
        <div class="footer-divider"></div>
        <ul class="footer-links">
          <li><a href="/individual-therapy">Individual Therapy</a></li>
          <li><a href="/couples-therapy">Couples Therapy</a></li>
          <li><a href="/family-therapy">Family Therapy</a></li>
          <li><a href="/fees">Fees & Insurance</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-heading">Company</div>
        <div class="footer-divider"></div>
        <ul class="footer-links">
          <li><a href="/about">About Us</a></li>
          <li><a href="/meet-the-team">Meet the Team</a></li>
          <li><a href="/join-our-team">Join Our Team</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-heading">Contact</div>
        <div class="footer-divider"></div>
        <div class="footer-contact-item">
          <div class="footer-contact-label">Location</div>
          <div class="footer-contact-value">New York<br>Telehealth Available</div>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-label">Email</div>
          <div class="footer-contact-value"><a href="mailto:info@realmindpsychotherapy.com">info@realmindpsychotherapy.com</a></div>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-label">Schedule</div>
          <div class="footer-contact-value"><a href="/contact">Book a Consultation →</a></div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copyright">
        © 2026 Real Mind Psychotherapy. All rights reserved.<br>
        Licensed Mental Health Counselor · New York State
      </div>
      <div class="footer-bottom-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  </div>
</footer>
`;

// Inject header and footer
document.addEventListener('DOMContentLoaded', function () {
  const headerMount = document.getElementById('header-mount');
  const footerMount = document.getElementById('footer-mount');
  if (headerMount) headerMount.innerHTML = HEADER_HTML;
  if (footerMount) footerMount.innerHTML = FOOTER_HTML;
});

document.addEventListener('DOMContentLoaded', function () {

  // =====================
  // HEADER SCROLL
  // =====================
  var header = document.getElementById('header');

  function updateHeader() {
    if (!header) {
      return;
    }
    if (window.scrollY <= 10) {
      header.classList.remove('scrolled');
      header.classList.add('at-top');
    } else {
      header.classList.remove('at-top');
      header.classList.add('scrolled');
    }
  }
  if (header) {
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  // =====================
  // ACTIVE NAV LINK
  // =====================
  var currentPath = window.location.pathname;
  document.querySelectorAll('.header-nav a').forEach(function (link) {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // =====================
  // CUSTOM DROPDOWN
  // =====================
  var servicesBtn = document.querySelector('.services-btn');
  var dropdown = document.querySelector('.rm-custom-dropdown');
  var servicesFolder = document.querySelector('.header-nav-folder');
  var closeTimer;

  if (servicesFolder && dropdown) {
    servicesFolder.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
      dropdown.classList.add('is-open');
    });

    servicesFolder.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        dropdown.classList.remove('is-open');
      }, 150);
    });

    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
    });

    dropdown.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(function () {
        dropdown.classList.remove('is-open');
      }, 150);
    });

    if (servicesBtn) {
      servicesBtn.addEventListener('click', function (e) {
        e.preventDefault();
        dropdown.classList.toggle('is-open');
      });
    }

    document.addEventListener('click', function (e) {
      if (!servicesFolder.contains(e.target)) {
        dropdown.classList.remove('is-open');
      }
    });
  }

  // =====================
  // MOBILE MENU
  // =====================
  var burger = document.querySelector('.header-burger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileClose = document.querySelector('.mobile-menu-close');
  var mobileServicesBtn = document.querySelector('.mobile-services-btn');
  var mobileServicesSub = document.querySelector('.mobile-services-sub');

  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', function () {
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }

  if (mobileServicesBtn && mobileServicesSub) {
    mobileServicesBtn.addEventListener('click', function () {
      mobileServicesSub.classList.toggle('is-open');
    });
  }

  // =====================
  // SCROLL ANIMATIONS
  // =====================
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay')) || 0;
        setTimeout(function () {
          el.classList.add('is-visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-animate]').forEach(function (el) {
    observer.observe(el);
  });

  // Hero animations
  var heroElements = [
    { selector: '.rm-hero-tag', delay: 200 },
    { selector: '.rm-hero-heading', delay: 400 },
    { selector: '.rm-hero-body', delay: 600 },
    { selector: '.rm-hero-buttons', delay: 750 },
    { selector: '.rm-hero-trust', delay: 900 }
  ];

  heroElements.forEach(function (item) {
    var el = document.querySelector(item.selector);
    if (el) {
      setTimeout(function () {
        el.classList.add('hero-visible');
      }, item.delay);
    }
  });

});
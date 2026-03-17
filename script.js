/* ============================================================
   PANDIYARAJ A — PORTFOLIO JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. NAV SCROLL SHRINK ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── 2. HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  /* ── 3. ACTIVE NAV LINK ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  /* ── 4. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ── 5. SKILL BARS ANIMATE ON SCROLL ── */
  const bars = document.querySelectorAll('.sb-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => barObserver.observe(b));

  /* ── 6. COUNTER ANIMATION ── */
  const counters = document.querySelectorAll('[data-target]');
  const suffixMap = ['+', '%', '+'];
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const sfx = suffixMap[Array.from(counters).indexOf(el)] || '+';
        let current = 0;
        const step = Math.max(1, target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current) + sfx;
          if (current >= target) clearInterval(timer);
        }, 24);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  /* ── 7. HERO NAME LETTER ANIMATION ── */
  const nameFirst = document.querySelector('.hero-name-first');
  const nameLast  = document.querySelector('.hero-name-last');
  if (nameFirst && nameLast) {
    [nameFirst, nameLast].forEach((el, i) => {
      const text = el.textContent;
      el.innerHTML = text.split('').map((ch, j) =>
        `<span style="display:inline-block;animation:letterDrop 0.5s ${(i * text.length + j) * 0.04 + 0.4}s both">${ch}</span>`
      ).join('');
    });
  }

  /* ── 8. ROLE TAG CYCLE ── */
  const roleTags = document.querySelectorAll('.role-tag');
  let activeRole = 0;
  function cycleRole() {
    roleTags[activeRole].classList.remove('active');
    activeRole = (activeRole + 1) % roleTags.length;
    roleTags[activeRole].classList.add('active');
  }
  if (roleTags.length) setInterval(cycleRole, 1800);

  /* ── 9. SEND MAIL ── */
  window.sendMail = function () {
    const name    = document.getElementById('senderName').value.trim();
    const email   = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('mailSubject').value.trim();
    const body    = document.getElementById('mailBody').value.trim();
    if (!name || !email || !subject || !body) {
      alert('Please fill in all fields before sending.');
      return;
    }
    const mailto = `mailto:pandiyaraja409@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + body)}`;
    window.location.href = mailto;
    const success = document.getElementById('formSuccess');
    success.style.display = 'block';
    setTimeout(() => success.style.display = 'none', 5000);
  };

  /* ── 10. SCROLL-TO-TOP BUTTON ── */
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 500);
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 11. TYPING EFFECT on hero-tag ── */
  const heroTag = document.querySelector('.hero-tag-text');
  if (heroTag) {
    const fullText = heroTag.dataset.text || heroTag.textContent;
    heroTag.textContent = '';
    let ti = 0;
    const typeInterval = setInterval(() => {
      heroTag.textContent += fullText[ti++];
      if (ti >= fullText.length) clearInterval(typeInterval);
    }, 55);
  }

  /* ── 12. CURSOR GLOW TRAIL (desktop only) ── */
  if (window.innerWidth > 900) {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position:fixed; width:280px; height:280px; border-radius:50%;
      background:radial-gradient(circle, rgba(56,189,248,0.045) 0%, transparent 65%);
      pointer-events:none; z-index:0; transition:left 0.18s ease,top 0.18s ease;
      transform:translate(-50%,-50%);
    `;
    document.body.appendChild(trail);
    document.addEventListener('mousemove', e => {
      trail.style.left = e.clientX + 'px';
      trail.style.top  = e.clientY + 'px';
    });
  }

});

/* ── LETTER DROP KEYFRAME (injected via JS) ── */
(function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes letterDrop {
      from { opacity: 0; transform: translateY(-20px) scale(0.8); }
      to   { opacity: 1; transform: translateY(0)    scale(1); }
    }
  `;
  document.head.appendChild(style);
})();

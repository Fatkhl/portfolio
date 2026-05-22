/* ═══════════════════════════════════════════
   FATKHL PORTFOLIO — Main JavaScript v4
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ═══ BOOT SEQUENCE ═══
  const bootLines = [
    'BIOS v4.0 — Fatkhl Systems',
    'POST check... OK',
    'Initializing memory... 128MB allocated',
    'Loading kernel modules... OK',
    'Detecting hardware...',
    '  GPU: RTX Web3 Engine',
    '  CPU: AI-9 NeuralCore',
    '  RAM: 13 repos loaded',
    'Mounting /dev/talent... OK',
    'Starting AER daemon... OK',
    'Loading portfolio ████████████████ 100%',
    '',
    '> Welcome, visitor.',
  ];

  function initBoot() {
    const bootEl = document.getElementById('boot-text');
    const barFill = document.getElementById('boot-bar-fill');
    const bootScreen = document.getElementById('boot');
    let idx = 0;

    function typeLine() {
      if (idx < bootLines.length) {
        bootEl.textContent += bootLines[idx] + '\n';
        barFill.style.width = ((idx + 1) / bootLines.length * 100) + '%';
        idx++;
        setTimeout(typeLine, 180);
      } else {
        setTimeout(endBoot, 500);
      }
    }

    function endBoot() {
      bootScreen.classList.add('hide');
      setTimeout(() => {
        bootScreen.style.display = 'none';
        initAnimations();
      }, 600);
    }

    document.getElementById('boot-skip').addEventListener('click', endBoot);
    typeLine();
  }

  // ═══ MATRIX RAIN ═══
  function initMatrix() {
    const canvas = document.getElementById('matrix');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = 'アイウエオカキクケコサシスセソ0123456789ABCDEF';
    const fontSize = 14;
    let columns, drops;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(10,10,10,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = fontSize + 'px JetBrains Mono, monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    resize();
    window.addEventListener('resize', resize);
    setInterval(draw, 50);
  }

  // ═══ NAV SCROLL ═══
  function initNav() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
      });

      // Close on link click
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('open');
        });
      });
    }
  }

  // ═══ THEME SWITCHER ═══
  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme') || 'hacker';
    if (saved === 'cream') document.body.classList.add('cream');

    if (toggle) {
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('cream');
        const theme = document.body.classList.contains('cream') ? 'cream' : 'hacker';
        localStorage.setItem('theme', theme);
        toggle.textContent = theme === 'cream' ? '🌙' : '☀️';
      });
      toggle.textContent = document.body.classList.contains('cream') ? '🌙' : '☀️';
    }
  }

  // ═══ ANIMATED COUNTERS ═══
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const duration = 1500;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  // ═══ TYPING EFFECT ═══
  function initTyping() {
    const nameEl = document.querySelector('.hero-name');
    if (!nameEl) return;
    const original = nameEl.innerHTML;
    nameEl.innerHTML = '';
    nameEl.style.visibility = 'visible';

    let i = 0;
    const text = '0x';
    const rest = 'fatkhul';

    function typeGold() {
      if (i < text.length) {
        nameEl.innerHTML += '<span class="gold">' + text[i] + '</span>';
        i++;
        setTimeout(typeGold, 100);
      } else {
        i = 0;
        typeMain();
      }
    }

    function typeMain() {
      if (i < rest.length) {
        nameEl.innerHTML += rest[i];
        i++;
        setTimeout(typeMain, 80);
      }
    }

    typeGold();
  }

  // ═══ SCROLL REVEAL ═══
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // ═══ 3D TILT ═══
  function initTilt() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          'translateY(-6px) perspective(1000px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ═══ PROJECT FILTER ═══
  function initFilter() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.proj-card[data-cat]');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;

        cards.forEach(card => {
          if (cat === 'all' || card.dataset.cat === cat) {
            card.style.display = '';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  // ═══ SMOOTH ANCHOR ═══
  function initSmooth() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ═══ INIT ALL ═══
  function initAnimations() {
    initTyping();
    initCounters();
    initReveal();
    initTilt();
    initFilter();
  }

  // Start
  document.addEventListener('DOMContentLoaded', () => {
    initBoot();
    initMatrix();
    initNav();
    initTheme();
    initSmooth();
  });

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
})();

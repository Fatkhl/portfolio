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





  // ═══ BINARY RAIN ═══
  function initBinaryRain() {
    const container = document.getElementById('binary-rain');
    if (!container) return;

    function createCol() {
      const col = document.createElement('div');
      col.className = 'binary-col';
      let bits = '';
      for (let i = 0; i < 80; i++) {
        bits += Math.random() > 0.5 ? '1' : '0';
        if (i % 8 === 7) bits += ' ';
      }
      col.textContent = bits;
      col.style.left = Math.random() * 200 + 'px';
      col.style.animationDuration = (8 + Math.random() * 12) + 's';
      col.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(col);
      col.addEventListener('animationend', () => col.remove());
    }

    // Initial burst
    for (let i = 0; i < 8; i++) setTimeout(createCol, i * 300);
    setInterval(createCol, 1500);
  }

  // ═══ HEX STREAM ═══
  function initHexStream() {
    const container = document.getElementById('hex-stream');
    if (!container) return;

    function createHexCol() {
      const col = document.createElement('div');
      col.className = 'hex-col';
      let hexes = '';
      for (let i = 0; i < 40; i++) {
        hexes += '0x' + Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
        if (i % 4 === 3) hexes += '\n';
      }
      col.textContent = hexes;
      col.style.right = Math.random() * 220 + 'px';
      col.style.animationDuration = (10 + Math.random() * 15) + 's';
      col.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(col);
      col.addEventListener('animationend', () => col.remove());
    }

    for (let i = 0; i < 6; i++) setTimeout(createHexCol, i * 400);
    setInterval(createHexCol, 2000);
  }

  // ═══ FLOATING DATA PARTICLES ═══
  function initDataParticles() {
    const dataTypes = [
      () => '0x' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'),
      () => Math.floor(Math.random() * 256) + '.' + Math.floor(Math.random() * 256) + '.' + Math.floor(Math.random() * 256) + '.' + Math.floor(Math.random() * 256),
      () => (Math.random() * 100).toFixed(2) + '%',
      () => '$' + (Math.random() * 50000).toFixed(2),
      () => 'B:' + Math.floor(Math.random() * 999999),
      () => 'TX:' + Math.floor(Math.random() * 99999).toString(16).toUpperCase(),
      () => 'GAS:' + Math.floor(Math.random() * 300),
      () => 'ETH:' + (Math.random() * 10).toFixed(4),
      () => Math.random().toString(2).substr(2, 8),
      () => 'BLOCK:' + (19000000 + Math.floor(Math.random() * 500000)),
    ];

    function createParticle() {
      const p = document.createElement('div');
      p.className = 'data-particle';
      p.textContent = dataTypes[Math.floor(Math.random() * dataTypes.length)]();
      p.style.left = (10 + Math.random() * 80) + 'vw';
      p.style.fontSize = (8 + Math.random() * 4) + 'px';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = Math.random() * 3 + 's';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove());
    }

    // Initial burst
    for (let i = 0; i < 15; i++) setTimeout(createParticle, i * 200);
    setInterval(createParticle, 800);
  }

  // ═══ CORNER DATA READOUTS ═══
  function initCornerData() {
    const tl = document.getElementById('cornerTL');
    const br = document.getElementById('cornerBR');
    if (!tl || !br) return;

    function randomHex(len) {
      let h = '';
      for (let i = 0; i < len; i++) h += Math.floor(Math.random() * 16).toString(16);
      return h;
    }

    function updateTL() {
      const now = new Date();
      const time = now.toTimeString().split(' ')[0];
      const uptime = Math.floor((Date.now() % 86400000) / 1000);
      const h = Math.floor(uptime / 3600);
      const m = Math.floor((uptime % 3600) / 60);
      const s = uptime % 60;
      tl.innerHTML =
        'SYS ' + time + ' <span class="blink">_</span><br>' +
        'UPTIME ' + String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0') + '<br>' +
        'NODE 0x' + randomHex(8) + '<br>' +
        'HASH 0x' + randomHex(16).substr(0,12) + '...<br>' +
        'NET <span style="color:var(--green)">CONNECTED</span>';
    }

    function updateBR() {
      const blocks = 19000000 + Math.floor(Math.random() * 500000);
      const gas = Math.floor(15 + Math.random() * 50);
      const peers = Math.floor(20 + Math.random() * 80);
      const mem = (40 + Math.random() * 40).toFixed(1);
      const cpu = (10 + Math.random() * 60).toFixed(0);
      br.innerHTML =
        'BLOCK ' + blocks.toLocaleString() + '<br>' +
        'GAS ' + gas + ' gwei<br>' +
        'PEERS ' + peers + '<br>' +
        'MEM ' + mem + '% <span class="data-bar"><span class="data-bar-fill" style="width:' + mem + '%"></span></span><br>' +
        'CPU ' + cpu + '% <span class="data-bar"><span class="data-bar-fill" style="width:' + cpu + '%"></span></span>';
    }

    updateTL();
    updateBR();
    setInterval(updateTL, 1000);
    setInterval(updateBR, 3000);
  }

  // ═══ CURSOR TRAIL ═══
  function initCursorTrail() {
    const dots = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.width = (6 - i * 0.5) + 'px';
      dot.style.height = (6 - i * 0.5) + 'px';
      dot.style.opacity = (1 - i * 0.12);
      dot.style.transition = 'transform ' + (0.1 + i * 0.03) + 's ease';
      document.body.appendChild(dot);
      dots.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      let x = mouseX, y = mouseY;
      dots.forEach((dot, i) => {
        const next = dots[i + 1] || dots[dots.length - 1];
        dot.x += (x - dot.x) * 0.35;
        dot.y += (y - dot.y) * 0.35;
        dot.el.style.left = dot.x + 'px';
        dot.el.style.top = dot.y + 'px';
        x = dot.x;
        y = dot.y;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ═══ RUNNING TERMINAL ═══
  function initRunningTerminal() {
    const rterm = document.getElementById('rterm');
    if (!rterm) return;
    const cmds = [
      '$ ssh root@production',
      '> connecting to 192.168.1.1...',
      '> auth: OK',
      '$ deploy --all --force',
      '> building smart-contracts.sol...',
      '> compiling... done',
      '> deploying to mainnet... tx:0x4f2a...',
      '$ npm run build',
      '> vite v5.0 building for production...',
      '> 1247 modules transformed.',
      '$ git push origin main',
      '> Enumerating objects: 42, done.',
      '> Writing objects: 100% (42/42), 8.7 KiB',
      '$ python3 train_model.py --epochs 100',
      '> Epoch 1/100: loss=0.342 acc=0.89',
      '> Epoch 50/100: loss=0.021 acc=0.99',
      '$ docker compose up -d',
      '> Container agent-01  Started',
      '> Container db-redis  Started',
      '> Container api-gateway  Started',
      '$ curl -X POST /api/v1/deploy',
      '> { "status": "deployed", "version": "4.2.0" }',
      '$ hermes agent --mode=autonomous',
      '> AER daemon started on port 8080',
      '> watching /dev/blockchain...',
      '$ hardhat verify --network mainnet',
      '> Contract verified on Etherscan ✓',
      '$ cargo build --release',
      '> Compiling defi-core v0.3.1',
      '> Finished release [optimized] in 42s',
    ];

    function addLine() {
      const line = document.createElement('div');
      line.className = 'rterm-line';
      line.textContent = cmds[Math.floor(Math.random() * cmds.length)];
      line.style.animationDuration = (25 + Math.random() * 15) + 's';
      rterm.appendChild(line);
      if (rterm.children.length > 30) rterm.removeChild(rterm.firstChild);
    }

    // Initial lines
    for (let i = 0; i < 15; i++) {
      setTimeout(addLine, i * 200);
    }
    setInterval(addLine, 3000);
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
    initBinaryRain();
    initHexStream();
    initDataParticles();
    initCornerData();
    initCursorTrail();
    initRunningTerminal();
  });

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }
})();

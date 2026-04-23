/* ════════════════════════════════════════════════════
   ZNEWT DEV — script.js
════════════════════════════════════════════════════ */

/* ── Data ── */
const courses = [
  {
    emoji: '🌐', tag: 'Fundamentos', title: 'HTML',
    desc: 'Construa a base sólida do desenvolvimento web com linguagem de marcação HTML',
    level: 1
  },
  {
    emoji: '🎨', tag: 'Estilização', title: 'CSS',
    desc: 'Flexbox, Grid, variáveis CSS, pseudo-elementos e animações de alto impacto visual.',
    level: 1
  },
  {
    emoji: '⚡', tag: 'Linguagem de programação', title: 'JavaScript',
    desc: 'Fundamentos da linguagem, incluindo variáveis, funções, condicionais, loops e manipulação básica do DOM.',
    level: 1
  },
  {
    emoji: '⚛️',
    tag: 'Frameworks',
    title: 'React',
    desc: 'Criação de interfaces modernas com componentes, hooks, gerenciamento de estado e integração com APIs.',
    level: 2
  },
  {
    emoji: '🔗', tag: 'DevOps', title: 'Git / GitHub',
    desc: 'Controle de versão profissional, pull requests e publicação em produção real.',
    level: 2
  },
  {
    emoji: '📱', tag: 'App', title: 'Mobile',
    desc: 'Aplicativos mobile com JavaScript. Uma base de código, dois sistemas operacionais.',
    level: 2
  },
];

const features = [
  { icon: '🎬', name: 'Vídeo Aulas HD',          desc: 'Conteúdo gravado com qualidade profissional. Assista no seu ritmo, quantas vezes quiser.' },
  { icon: '📖', name: 'Material Complementar',     desc: 'Slides, resumos e exercícios cuidadosamente elaborados para fixar o conteúdo.' },
  { icon: '💬', name: 'Comunidade Ativa',          desc: 'Tire dúvidas, compartilhe projetos e conecte-se com outros devs em crescimento.' },
  { icon: '🔄', name: 'Conteúdo Atualizado',       desc: 'Cursos revisados constantemente para acompanhar o ritmo acelerado do mercado.' },
];

const team = [
  {
    initials: 'FS', name: 'Fábio Silva',
    role: 'Co-fundador & Instrutor',
    bio: 'Desenvolvedor full stack experiente em projetos sociais. Graduação em Análise de Sistemas no SENAI em curso.'
  },
  {
    initials: 'MS', name: 'Miguel Santana',
    role: 'Co-fundador & Instrutor',
    bio: 'Desenvolvedor web experiente com formação técnica em Análise de Sistemas e graduação em andamento no SENAI.'
  },
];

const techs = [
  'HTML5','CSS3','JavaScript','TypeScript','React','Vue.js',
  'Node.js','Python','Git','Docker','SQL','MongoDB','REST APIs',
  'GraphQL','Next.js','Tailwind CSS',
];

/* ════════════════════════════════════════════════════
   RENDER — Courses
════════════════════════════════════════════════════ */
(function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;

  courses.forEach((c, i) => {
    const dots = [1, 2, 3]
      .map(d => `<span class="level-dot${d <= c.level ? ' active' : ''}"></span>`)
      .join('');
    const levelLabel = ['', 'Iniciante', 'Intermediário', 'Avançado'][c.level];
    const delayClass = `reveal-delay-${(i % 4) + 1}`;

    const el = document.createElement('div');
    el.className = `course-card reveal ${delayClass}`;
    el.innerHTML = `
      <div class="card-thumb">
        <span class="card-thumb-emoji">${c.emoji}</span>
      </div>
      <div class="card-body">
        <span class="card-tag">${c.tag}</span>
        <h3 class="card-title">${c.title}</h3>
        <p class="card-desc">${c.desc}</p>
        <div class="card-meta">
          <div class="card-level">
            <div class="level-dots">${dots}</div>
            <span>${levelLabel}</span>
          </div>
          <div class="card-coming">
            <span class="coming-pulse"></span> Em breve
          </div>
        </div>
      </div>`;
    grid.appendChild(el);
  });
})();

/* ════════════════════════════════════════════════════
   RENDER — Features
════════════════════════════════════════════════════ */
(function renderFeatures() {
  const fg = document.getElementById('featuresGrid');
  if (!fg) return;

  features.forEach((f, i) => {
    const delayClass = `reveal-delay-${(i % 4) + 1}`;
    const el = document.createElement('div');
    el.className = `feature-card reveal ${delayClass}`;
    el.innerHTML = `
      <div class="feature-icon">${f.icon}</div>
      <div class="feature-name">${f.name}</div>
      <p class="feature-desc">${f.desc}</p>`;
    fg.appendChild(el);
  });
})();

/* ════════════════════════════════════════════════════
   RENDER — Team
════════════════════════════════════════════════════ */
(function renderTeam() {
  const tg = document.getElementById('teamGrid');
  if (!tg) return;

  team.forEach((t, i) => {
    const el = document.createElement('div');
    el.className = `team-card reveal reveal-delay-${i + 1}`;
    el.innerHTML = `
      <div class="team-avatar">${t.initials}</div>
      <div class="team-name">${t.name}</div>
      <div class="team-role">${t.role}</div>
      <p class="team-bio">${t.bio}</p>`;
    tg.appendChild(el);
  });
})();

/* ════════════════════════════════════════════════════
   RENDER — Marquee
════════════════════════════════════════════════════ */
(function renderMarquee() {
  const track = document.getElementById('marqueeTrack');
  if (!track) return;

  // Duplicate for seamless loop
  const items = [...techs, ...techs]
    .map(t => `<span class="marquee-item"><span class="dot">◆</span>${t}</span>`)
    .join('');
  track.innerHTML = items;
})();

/* ════════════════════════════════════════════════════
   PARTICLE CANVAS
════════════════════════════════════════════════════ */
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }

    reset(randomY = false) {
      this.x     = Math.random() * W;
      this.y     = randomY ? Math.random() * H : (Math.random() < 0.5 ? -5 : H + 5);
      this.r     = Math.random() * 1.6 + 0.3;
      this.vx    = (Math.random() - 0.5) * 0.28;
      this.vy    = (Math.random() - 0.5) * 0.28;
      this.alpha = Math.random() * 0.35 + 0.05;
      this.color = Math.random() > 0.5 ? '0,212,255' : '11,42,255';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 130; i++) particles.push(new Particle());

  function drawConnections() {
    const len = particles.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,212,255,${0.07 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ════════════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════════════ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  // Ring follows with lag
  (function animateRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover grow effect via body class
  const hoverTargets = 'a, button, .course-card, .feature-card, .team-card, .nav-cta';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });
})();

/* ════════════════════════════════════════════════════
   CLICK RIPPLE
════════════════════════════════════════════════════ */
document.addEventListener('click', e => {
  const r = document.createElement('div');
  r.className = 'ripple';
  r.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:60px;height:60px;`;
  document.body.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
});

/* ════════════════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════════════════ */
(function initReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ════════════════════════════════════════════════════
   NAVBAR SCROLL SHRINK
════════════════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ════════════════════════════════════════════════════
   COUNTER ANIMATION
════════════════════════════════════════════════════ */
(function initCounters() {
  function animateCounter(el, target) {
    let current    = 0;
    const step     = target / 48;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current) + (target > 10 ? '+' : '');
      if (current >= target) clearInterval(interval);
    }, 35);
  }

  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('[data-target]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.target, 10));
        });
        counterObs.disconnect();
      }
    });
  }, { threshold: 0.6 });

  counterObs.observe(statsSection);
})();

/* ════════════════════════════════════════════════════
   NOTIFY FORM
════════════════════════════════════════════════════ */
(function initNotifyForm() {
  const btn   = document.getElementById('notifyBtn');
  const input = document.getElementById('emailInput');
  const msg   = document.getElementById('notifyMsg');
  if (!btn || !input || !msg) return;

  btn.addEventListener('click', () => {
    const email = input.value.trim();
    msg.style.display = 'block';

    if (!email || !email.includes('@') || !email.includes('.')) {
      msg.className = 'error';
      msg.textContent = 'Por favor, insira um e-mail válido.';
      return;
    }

    msg.className = 'success';
    msg.textContent = '🎉 Perfeito! Avisaremos assim que os cursos estiverem prontos!';
    input.value = '';
  });

  // Allow Enter key
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
  });
})();

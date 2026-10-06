(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initLoader() {
    const hide = () => $('#loader').classList.add('done');
    addEventListener('load', () => setTimeout(hide, reduced ? 0 : 500));
    setTimeout(hide, 2500); // safety fallback
  }

  function initMenu() {
    const burger = $('#burger'), menu = $('#menu');
    const set = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); };
    burger.addEventListener('click', () => set(!menu.classList.contains('open')));
    $$('a', menu).forEach(a => a.addEventListener('click', () => set(false)));
    addEventListener('keydown', e => e.key === 'Escape' && set(false));
  }

  function initScrollUI() {
    const nav = $('#nav'), top = $('#top');
    const onScroll = () => {
      nav.classList.toggle('scrolled', scrollY > 20);
      top.classList.toggle('show', scrollY > 600);
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    top.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  }

  function initReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: .15 });
    els.forEach(e => io.observe(e));
  }

  function initActiveNav() {
    const links = $$('.menu a');
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => io.observe(s));
  }

  function initCounters() {
    const run = el => {
      const end = +el.dataset.count, suffix = el.dataset.suffix || '';
      if (reduced) return (el.textContent = end + suffix);
      const t0 = performance.now(), dur = 1000;
      const step = t => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: .6 });
    $$('[data-count]').forEach(el => io.observe(el));
  }

  function initTyping() {
    const el = $('#typed'), text = 'BCA Student | Aspiring Web Developer';
    if (reduced) return (el.textContent = text);
    let i = 0;
    const tick = () => { el.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(tick, 55); };
    setTimeout(tick, 900);
  }

  $('#year').textContent = new Date().getFullYear();
  [initLoader, initMenu, initScrollUI, initReveal, initActiveNav, initCounters, initTyping].forEach(f => f());
})();

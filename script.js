/* Darlan Tecno Split. Sem dependencias e sem listener de scroll:
   tudo que depende da rolagem usa IntersectionObserver. */
(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  if (!('IntersectionObserver' in window)) {
    $$('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    root.classList.add('is-past-hero');
  } else {
    // Header ganha fundo assim que a pagina sai do topo
    const header = $('.header');
    new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting))
      .observe($('.top-sentinel'));

    // Barra do celular e botao flutuante: aparecem depois dos botoes do hero
    new IntersectionObserver(([e]) => {
      root.classList.toggle('is-past-hero', !e.isIntersecting && e.boundingClientRect.top < 0);
    }).observe($('.hero__actions'));

    // ...e somem quando o CTA final ou o rodape estao na tela, para nao repetir o botao
    const atCta = new Set();
    const ctaObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? atCta.add(e.target) : atCta.delete(e.target)));
      root.classList.toggle('is-at-cta', atCta.size > 0);
    });
    ctaObs.observe($('.cta'));
    ctaObs.observe($('.footer'));

    // Revelacao ao rolar, uma vez por elemento
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        reveal.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    $$('[data-reveal]').forEach((el) => reveal.observe(el));
  }

  // ---------- Menu do celular ----------
  const header = $('.header');
  const menuBtn = $('.menu-btn');
  const menu = $('#menu');

  const setMenu = (open) => {
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    $('use', menuBtn).setAttribute('href', open ? '#i-x' : '#i-list');
    header.classList.toggle('is-open', open);
    root.classList.toggle('menu-open', open);
  };

  menuBtn.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuBtn.focus(); }
  });
  matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  // ---------- Galeria ampliada ----------
  const box = $('.lightbox');
  const items = $$('.g__btn');
  if (!box || !items.length || typeof box.showModal !== 'function') return;

  const img = $('.lightbox__img', box);
  const cap = $('.lightbox__cap', box);
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const item = items[index];
    img.src = item.dataset.full;
    img.alt = $('img', item).alt;
    cap.textContent = `${item.dataset.caption}  ·  ${index + 1} de ${items.length}`;
  };

  items.forEach((item, i) => item.addEventListener('click', () => { show(i); box.showModal(); }));
  $('.lightbox__close', box).addEventListener('click', () => box.close());
  $('.lightbox__prev', box).addEventListener('click', () => show(index - 1));
  $('.lightbox__next', box).addEventListener('click', () => show(index + 1));
  // Clique fora da foto fecha
  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Deslizar para os lados troca a foto no celular
  let startX = null;
  box.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  box.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 48) show(index + (dx < 0 ? 1 : -1));
  });
})();

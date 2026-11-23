(function () {
  // 1. Mobile Navigation Drawer
  const toggleBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Ecuador Regional Coverage Tabs
  const regionTabs = document.querySelectorAll('.region-tab');
  const regionPanels = document.querySelectorAll('.region-panel');
  regionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-region');
      regionTabs.forEach((t) => t.classList.remove('active'));
      regionPanels.forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('region-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      faqItems.forEach((other) => {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.faq-question');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 4. Copy SHA-256 Checksum
  const copyShaBtn = document.getElementById('btn-copy-sha');
  const shaCode = document.getElementById('apk-sha256');
  if (copyShaBtn && shaCode) {
    copyShaBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(shaCode.textContent.trim());
        const prev = copyShaBtn.textContent;
        copyShaBtn.textContent = 'SHA-256 copiado';
        setTimeout(() => {
          copyShaBtn.textContent = prev;
        }, 2200);
      } catch (_) {
        const range = document.createRange();
        range.selectNodeContents(shaCode);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    });
  }

  // 5. Showcase Lightbox Modal
  const lightbox = document.getElementById('showcase-lightbox');
  const openBtn = document.getElementById('btn-zoom-showcase');
  const imgTrigger = document.getElementById('showcase-img-trigger');
  const closeBtn = document.getElementById('lightbox-close');

  function openLightbox() {
    if (lightbox) lightbox.classList.remove('hidden');
  }
  function closeLightbox() {
    if (lightbox) lightbox.classList.add('hidden');
  }

  if (openBtn) openBtn.addEventListener('click', openLightbox);
  if (imgTrigger) imgTrigger.addEventListener('click', openLightbox);
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // 6. Scroll Reveal Animation
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealEls.forEach((el) => obs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }
})();

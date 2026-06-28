// ═══════════════════════════════════════════════════════
//  APP.JS — Portfolio Engine + Admin System
// ═══════════════════════════════════════════════════════

let adminUnlocked = false;
let currentTab = 'content';
let localData = JSON.parse(JSON.stringify(SITE_DATA));

document.addEventListener('DOMContentLoaded', () => {
  applyData(localData);
  renderPortfolio(localData.portfolio);
  renderTestimonials(localData.testimonials);
  renderProcess(localData.process);
  animateCounters();
  setupAdminTrigger();
  checkURLAdmin();
  setupScrollReveal();
});

function applyData(data) {
  document.querySelector('.hero-eyebrow .mono').textContent = data.availability_text;
  setInner('.hero-headline', data.hero_headline.replace(/\\n/g, '<br/>'));
  setInner('.hero-sub', data.hero_sub.replace(/\\n/g, '<br/>'));

  document.querySelector('[data-target="47000000"]').dataset.target = data.stats.views.value;
  document.querySelector('[data-target="300"]').dataset.target = data.stats.videos.value;
  document.querySelector('[data-target="12"]').dataset.target = data.stats.brands.value;
  document.querySelector('[data-target="48"]').dataset.target = data.stats.turnaround.value;

  const logos = document.getElementById('trust-logos');
  logos.innerHTML = data.brands.map(b => `<span class="trust-name">${b}</span>`).join('');

  setInner('h2[data-field="about_title"]', data.about_title.replace(/\\n/g, '<br/>'));
  setText('[data-field="about_p1"]', data.about_p1);
  setText('[data-field="about_p2"]', data.about_p2);
  setInner('.pull-quote', data.about_quote.replace(/\\n/g, '<br/>'));
  
  const tagsEl = document.getElementById('about-tags');
  tagsEl.innerHTML = data.skills.map(s => `<span class="tag">${s}</span>`).join('');

  if (data.about_photo) {
    const ph = document.getElementById('about-photo');
    ph.style.backgroundImage = `url(${data.about_photo})`;
    ph.style.backgroundSize = 'cover';
    ph.style.backgroundPosition = 'center';
    ph.innerHTML = '';
  }

  setInner('[data-field="results_title"]', data.results_title.replace(/\\n/g, '<br/>'));
  const rsEl = document.querySelector('.results-stats');
  if (rsEl && data.result_stats) {
    rsEl.innerHTML = data.result_stats.map(r => `
      <div class="result-stat">
        <span class="result-num">${r.num}</span>
        <span class="result-label">${r.label}</span>
      </div>
    `).join('');
  }

  setText('[data-field="booking_eyebrow"]', data.booking_eyebrow);
  setInner('[data-field="booking_headline"]', data.booking_headline.replace(/\\n/g, '<br/>'));
  setInner('[data-field="booking_sub"]', data.booking_sub);
  setText('[data-field="form_note"]', data.form_note);
  
  const emailEl = document.getElementById('link-email');
  if (emailEl) { emailEl.textContent = data.contact_email; emailEl.href = `mailto:${data.contact_email}`; }
  const igEl = document.getElementById('link-instagram');
  if (igEl) { igEl.textContent = data.contact_ig; }

  setText('[data-field="footer_copy"]', data.footer_copy);
}

function setInner(sel, html) {
  const el = document.querySelector(sel);
  if (el) el.innerHTML = html;
}
function setText(sel, text) {
  const el = document.querySelector(sel);
  if (el) el.textContent = text;
}

function renderPortfolio(items) {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  grid.innerHTML = items.map(item => `
    <div class="portfolio-card reveal" onclick="openVideo('${item.video_url}')">
      <div class="portfolio-thumb" style="${item.thumbnail ? `background-image:url(${item.thumbnail});background-size:cover;background-position:center;` : ''}">
        ${!item.thumbnail ? `<span class="thumb-placeholder mono">${item.category.toUpperCase()}</span>` : ''}
        <div class="thumb-overlay">
          ${item.video_url ? '<div class="play-btn">▶</div>' : ''}
          <span class="result-badge">${item.result}</span>
        </div>
      </div>
      <div class="portfolio-info">
        <span class="port-category mono">${item.category}</span>
        <h3 class="port-title">${item.title}</h3>
        <p class="port-desc">${item.description}</p>
        <div class="port-tags">
          ${item.tags.map(t => `<span class="tag tag-sm">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderTestimonials(items) {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  grid.innerHTML = items.map(t => `
    <div class="testimonial-card reveal">
      <div class="testi-quote-mark">"</div>
      <p class="testi-text">${t.quote}</p>
      <div class="testi-footer">
        <div class="testi-avatar" style="${t.photo ? `background-image:url(${t.photo});background-size:cover;` : ''}">
          ${!t.photo ? t.name.charAt(0) : ''}
        </div>
        <div class="testi-meta">
          <strong>${t.name}</strong>
          <span class="mono">${t.title}</span>
        </div>
        <span class="testi-result">${t.result}</span>
      </div>
    </div>
  `).join('');
}

function renderProcess(steps) {
  const container = document.getElementById('process-steps');
  if (!container) return;
  container.innerHTML = steps.map(s => `
    <div class="process-step reveal">
      <span class="process-num mono">${s.step}</span>
      <div class="process-content">
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    </div>
  `).join('');
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = formatNum(current, target);
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function formatNum(n, target) {
  if (target >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (target >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toString();
}

function setupScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function openVideo(url) {
  if (!url) return;
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" onclick="this.closest('.lightbox').remove()">✕</button>
      <iframe src="${url}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
    </div>`;
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  document.body.appendChild(overlay);
}

async function handleBooking() {
  const name = document.getElementById('name-input').value.trim();
  const email = document.getElementById('email-input').value.trim();
  const brand = document.getElementById('brand-input').value.trim();
  const budget = document.getElementById('budget-select').value;

  if (!name || !email || !brand) {
    shakeForm();
    return;
  }

  const btn = document.querySelector('#booking-form .btn-primary');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    if (localData.form_endpoint && !localData.form_endpoint.includes('YOUR_FORM_ID')) {
      await fetch(localData.form_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, brand, budget }),
      });
    }
    document.getElementById('booking-form').classList.add('hidden');
    document.getElementById('booking-success').classList.remove('hidden');
  } catch {
    btn.textContent = 'Claim Your Free Strategy Call →';
    btn.disabled = false;
  }
}

function shakeForm() {
  const form = document.getElementById('booking-form');
  form.classList.add('shake');
  setTimeout(() => form.classList.remove('shake'), 600);
}

function checkURLAdmin() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('admin')) {
    openAdminOverlay();
  }
}

let holdTimer = null;
function setupAdminTrigger() {
  const trigger = document.getElementById('admin-trigger');
  trigger.addEventListener('mousedown', () => {
    holdTimer = setTimeout(() => openAdminOverlay(), 3000);
  });
  trigger.addEventListener('mouseup', () => clearTimeout(holdTimer));
  trigger.addEventListener('touchstart', () => {
    holdTimer = setTimeout(() => openAdminOverlay(), 3000);
  });
  trigger.addEventListener('touchend', () => clearTimeout(holdTimer));
}

function openAdminOverlay() {
  document.getElementById('admin-overlay').classList.remove('hidden');
  if (adminUnlocked) {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    renderAdminTab(currentTab);
  }
}

function closeAdmin() {
  document.getElementById('admin-overlay').classList.add('hidden');
  const url = new URL(window.location);
  url.searchParams.delete('admin');
  window.history.replaceState({}, '', url);
}

function checkAdminPassword() {
  const input = document.getElementById('admin-password').value;
  if (input === ADMIN_PASSWORD) {
    adminUnlocked = true;
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    renderAdminTab('content');
  } else {
    document.getElementById('admin-password').classList.add('shake');
    setTimeout(() => document.getElementById('admin-password').classList.remove('shake'), 500);
  }
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  event.target.classList.add('active');
  renderAdminTab(tab);
}

function renderAdminTab(tab) {
  const body = document.getElementById('admin-body');
  
  if (tab === 'content') {
    body.innerHTML = `
      <div class="admin-section">
        <label class="admin-label">Availability Text</label>
        <input class="admin-input" id="ad_availability" value="${localData.availability_text}" />
        
        <label class="admin-label">Hero Headline (use \\n for line break)</label>
        <textarea class="admin-input admin-textarea" id="ad_hero_headline">${localData.hero_headline}</textarea>
        
        <label class="admin-label">Hero Subtext</label>
        <textarea class="admin-input admin-textarea" id="ad_hero_sub">${localData.hero_sub}</textarea>

        <label class="admin-label">About Title</label>
        <textarea class="admin-input admin-textarea" id="ad_about_title">${localData.about_title}</textarea>

        <label class="admin-label">About Para 1</label>
        <textarea class="admin-input admin-textarea" id="ad_about_p1">${localData.about_p1}</textarea>

        <label class="admin-label">About Para 2</label>
        <textarea class="admin-input admin-textarea" id="ad_about_p2">${localData.about_p2}</textarea>

        <label class="admin-label">Pull Quote</label>
        <textarea class="admin-input admin-textarea" id="ad_about_quote">${localData.about_quote}</textarea>

        <label class="admin-label">Booking Headline</label>
        <textarea class="admin-input admin-textarea" id="ad_booking_headline">${localData.booking_headline}</textarea>

        <label class="admin-label">Booking Subtext (HTML ok)</label>
        <textarea class="admin-input admin-textarea" id="ad_booking_sub">${localData.booking_sub}</textarea>

        <label class="admin-label">Contact Email</label>
        <input class="admin-input" id="ad_contact_email" value="${localData.contact_email}" />

        <label class="admin-label">Instagram Handle</label>
        <input class="admin-input" id="ad_contact_ig" value="${localData.contact_ig}" />

        <label class="admin-label">Form Endpoint (Formspree / n8n webhook)</label>
        <input class="admin-input" id="ad_form_endpoint" value="${localData.form_endpoint}" />

        <label class="admin-label">Brands (one per line)</label>
        <textarea class="admin-input admin-textarea" id="ad_brands">${localData.brands.join('\n')}</textarea>

        <label class="admin-label">Skills / Tags (one per line)</label>
        <textarea class="admin-input admin-textarea" id="ad_skills">${localData.skills.join('\n')}</textarea>

        <label class="admin-label">Your Photo URL</label>
        <input class="admin-input" id="ad_about_photo" value="${localData.about_photo}" placeholder="https://..." />

        <label class="admin-label">Footer Copy</label>
        <input class="admin-input" id="ad_footer_copy" value="${localData.footer_copy}" />
      </div>
    `;
  } else if (tab === 'portfolio') {
    body.innerHTML = `
      <div class="admin-section">
        <p class="admin-note mono">Click a project to expand and edit it.</p>
        ${localData.portfolio.map((p, i) => `
          <div class="admin-card">
            <div class="admin-card-header" onclick="toggleCard(${i})">
              <span>${p.title || 'Project ' + (i+1)}</span>
              <span class="mono" style="opacity:0.5">${p.result}</span>
            </div>
            <div class="admin-card-body hidden" id="port-card-${i}">
              <label class="admin-label">Title</label>
              <input class="admin-input" id="p${i}_title" value="${p.title}" />
              <label class="admin-label">Category</label>
              <input class="admin-input" id="p${i}_category" value="${p.category}" />
              <label class="admin-label">Description</label>
              <textarea class="admin-input admin-textarea" id="p${i}_desc">${p.description}</textarea>
              <label class="admin-label">Result Badge</label>
              <input class="admin-input" id="p${i}_result" value="${p.result}" />
              <label class="admin-label">Thumbnail URL</label>
              <input class="admin-input" id="p${i}_thumb" value="${p.thumbnail}" placeholder="https://..." />
              <label class="admin-label">Video URL (YouTube embed or direct)</label>
              <input class="admin-input" id="p${i}_video" value="${p.video_url}" placeholder="https://youtube.com/embed/..." />
              <label class="admin-label">Tags (comma separated)</label>
              <input class="admin-input" id="p${i}_tags" value="${p.tags.join(', ')}" />
            </div>
          </div>
        `).join('')}
        <button class="btn-ghost btn-sm" style="margin-top:12px" onclick="addPortfolioItem()">+ Add Project</button>
      </div>
    `;
  } else if (tab === 'testimonials') {
    body.innerHTML = `
      <div class="admin-section">
        ${localData.testimonials.map((t, i) => `
          <div class="admin-card">
            <div class="admin-card-header" onclick="toggleCard('t'+${i})">
              <span>${t.name}</span>
              <span class="mono" style="opacity:0.5">${t.title}</span>
            </div>
            <div class="admin-card-body hidden" id="port-card-t${i}">
              <label class="admin-label">Name</label>
              <input class="admin-input" id="t${i}_name" value="${t.name}" />
              <label class="admin-label">Title</label>
              <input class="admin-input" id="t${i}_title" value="${t.title}" />
              <label class="admin-label">Quote</label>
              <textarea class="admin-input admin-textarea" id="t${i}_quote">${t.quote}</textarea>
              <label class="admin-label">Result Badge</label>
              <input class="admin-input" id="t${i}_result" value="${t.result}" />
              <label class="admin-label">Photo URL</label>
              <input class="admin-input" id="t${i}_photo" value="${t.photo}" placeholder="https://..." />
            </div>
          </div>
        `).join('')}
        <button class="btn-ghost btn-sm" style="margin-top:12px" onclick="addTestimonial()">+ Add Testimonial</button>
      </div>
    `;
  } else if (tab === 'process') {
    body.innerHTML = `
      <div class="admin-section">
        ${localData.process.map((s, i) => `
          <div class="admin-card">
            <div class="admin-card-header" onclick="toggleCard('pr'+${i})">
              <span>${s.step} — ${s.title}</span>
            </div>
            <div class="admin-card-body hidden" id="port-card-pr${i}">
              <label class="admin-label">Step Number</label>
              <input class="admin-input" id="pr${i}_step" value="${s.step}" />
              <label class="admin-label">Title</label>
              <input class="admin-input" id="pr${i}_title" value="${s.title}" />
              <label class="admin-label">Description</label>
              <textarea class="admin-input admin-textarea" id="pr${i}_desc">${s.desc}</textarea>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (tab === 'settings') {
    body.innerHTML = `
      <div class="admin-section">
        <label class="admin-label">Admin Password</label>
        <input class="admin-input" id="ad_password" type="password" placeholder="New password (leave blank to keep current)" />
        <p class="admin-note mono">⚠ To permanently change the password, update ADMIN_PASSWORD in data.js</p>

        <label class="admin-label">Spots Open (shown in availability)</label>
        <input class="admin-input" id="ad_spots" type="number" value="${localData.spots_open}" />

        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #2E2E3D;">
          <p class="admin-note mono">Import previously exported data:</p>
          <textarea class="admin-input admin-textarea" id="import-json" placeholder='Paste exported JSON here...'></textarea>
          <button class="btn-ghost btn-sm" onclick="importData()" style="margin-top:8px">Import</button>
        </div>
      </div>
    `;
  }
}

function toggleCard(id) {
  const el = document.getElementById(`port-card-${id}`);
  if (el) el.classList.toggle('hidden');
}

function addPortfolioItem() {
  localData.portfolio.push({
    id: Date.now(), title: 'New Project', category: 'Category',
    description: 'Description here.', thumbnail: '', video_url: '',
    tags: [], result: 'Result',
  });
  renderAdminTab('portfolio');
}

function addTestimonial() {
  localData.testimonials.push({
    id: Date.now(), name: 'Client Name', title: 'Role, Company',
    quote: 'Testimonial here.', result: 'Result', photo: '',
  });
  renderAdminTab('testimonials');
}

function saveAll() {
  const fields = {
    availability_text: 'ad_availability', hero_headline: 'ad_hero_headline',
    hero_sub: 'ad_hero_sub', about_title: 'ad_about_title',
    about_p1: 'ad_about_p1', about_p2: 'ad_about_p2',
    about_quote: 'ad_about_quote', booking_headline: 'ad_booking_headline',
    booking_sub: 'ad_booking_sub', contact_email: 'ad_contact_email',
    contact_ig: 'ad_contact_ig', form_endpoint: 'ad_form_endpoint',
    about_photo: 'ad_about_photo', footer_copy: 'ad_footer_copy',
  };
  for (const [key, id] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (el) localData[key] = el.value;
  }

  const brandsEl = document.getElementById('ad_brands');
  if (brandsEl) localData.brands = brandsEl.value.split('\n').filter(Boolean);
  const skillsEl = document.getElementById('ad_skills');
  if (skillsEl) localData.skills = skillsEl.value.split('\n').filter(Boolean);
  const spotsEl = document.getElementById('ad_spots');
  if (spotsEl) localData.spots_open = parseInt(spotsEl.value);

  localData.portfolio.forEach((p, i) => {
    const get = (id) => { const el = document.getElementById(id); return el ? el.value : null; };
    if (get(`p${i}_title`)) {
      p.title = get(`p${i}_title`);
      p.category = get(`p${i}_category`);
      p.description = get(`p${i}_desc`);
      p.result = get(`p${i}_result`);
      p.thumbnail = get(`p${i}_thumb`);
      p.video_url = get(`p${i}_video`);
      p.tags = get(`p${i}_tags`).split(',').map(t => t.trim()).filter(Boolean);
    }
  });

  localData.testimonials.forEach((t, i) => {
    const get = (id) => { const el = document.getElementById(id); return el ? el.value : null; };
    if (get(`t${i}_name`)) {
      t.name = get(`t${i}_name`);
      t.title = get(`t${i}_title`);
      t.quote = get(`t${i}_quote`);
      t.result = get(`t${i}_result`);
      t.photo = get(`t${i}_photo`);
    }
  });

  localData.process.forEach((s, i) => {
    const get = (id) => { const el = document.getElementById(id); return el ? el.value : null; };
    if (get(`pr${i}_step`)) {
      s.step = get(`pr${i}_step`);
      s.title = get(`pr${i}_title`);
      s.desc = get(`pr${i}_desc`);
    }
  });

  applyData(localData);
  renderPortfolio(localData.portfolio);
  renderTestimonials(localData.testimonials);
  renderProcess(localData.process);
  setupScrollReveal();

  localStorage.setItem('portfolio_data', JSON.stringify(localData));

  const status = document.getElementById('save-status');
  status.textContent = '✓ Saved & applied';
  setTimeout(() => status.textContent = '', 2500);
}

function exportData() {
  const json = JSON.stringify(localData, null, 2);
  const blob = new Blob([`// Portfolio Data Export\nconst SITE_DATA = ${json};\n`], { type: 'text/javascript' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.js';
  a.click();
}

function importData() {
  try {
    const raw = document.getElementById('import-json').value.trim();
    const parsed = JSON.parse(raw);
    localData = parsed;
    applyData(localData);
    renderPortfolio(localData.portfolio);
    renderTestimonials(localData.testimonials);
    renderProcess(localData.process);
    alert('Imported successfully!');
    renderAdminTab(currentTab);
  } catch (e) {
    alert('Invalid JSON. Make sure you paste just the JSON object, not the full data.js file.');
  }
}

(function loadLocalStorage() {
  const saved = localStorage.getItem('portfolio_data');
  if (saved) {
    try {
      localData = JSON.parse(saved);
    } catch { /* use defaults */ }
  }
})();

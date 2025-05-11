// Navigation buttons and sections references
const buttons = document.querySelectorAll('nav button');
const sections = {
  about: document.getElementById('about-section'),
  divisions: document.getElementById('divisions-section'),
  activities: document.getElementById('activities-section'),
  contact: document.getElementById('contact-section')
};

// Load JSON data for each section dynamically
async function loadSectionData(section) {
  try {
    const response = await fetch(`data/${section}.json`);
    if (!response.ok) throw new Error(`Failed to load ${section} data`);
    const data = await response.json();
    renderSection(section, data);
  } catch (err) {
    sections[section].innerHTML = `<p>Gagal memuat data.</p>`;
    console.error(err);
  }
}

// Render content to each section depending on its data structure
function renderSection(section, data) {
  switch (section) {
    case 'about':
      sections.about.innerHTML = `
        <h2>Tentang BEM</h2>
        <p>${data.description}</p>
      `;
      break;
    case 'divisions':
      sections.divisions.innerHTML = `
        <h2>Divisi BEM</h2>
        <ul>${data.divisions.map(d => `<li>${d}</li>`).join('')}</ul>
      `;
      break;
    case 'activities':
      sections.activities.innerHTML = `
        <h2>Kegiatan Utama</h2>
        <ul>${data.activities.map(a => `<li>${a}</li>`).join('')}</ul>
      `;
      break;
    case 'contact':
      sections.contact.innerHTML = `
        <h2>Kontak Kami</h2>
        <p>Email: ${data.email}</p>
        <p>Telepon: ${data.phone}</p>
        <p>Alamat: ${data.address}</p>
        <p>Media Sosial:</p>
        <ul>
          <li><a href="${data.social.instagram}" target="_blank" rel="noopener" style="color:#00ffe7;">Instagram</a></li>
          <li><a href="${data.social.facebook}" target="_blank" rel="noopener" style="color:#00ffe7;">Facebook</a></li>
          <li><a href="${data.social.twitter}" target="_blank" rel="noopener" style="color:#00ffe7;">Twitter</a></li>
        </ul>
      `;
      break;
  }
}

// Show selected section and update aria-expanded and button styles
function showSection(sectionId) {
  Object.keys(sections).forEach((key) => {
    const isActive = key === sectionId;
    sections[key].hidden = !isActive;
    sections[key].setAttribute('aria-hidden', !isActive);
    buttons.forEach((btn) => {
      if (btn.dataset.section === key) {
        btn.setAttribute('aria-expanded', isActive);
        btn.disabled = isActive;
        if (isActive) {
          btn.style.cursor = 'default';
          btn.style.backgroundColor = '#00ffe7';
          btn.style.color = '#004e92';
          btn.style.boxShadow = '0 0 20px #00ffe7';
        } else {
          btn.style.cursor = 'pointer';
          btn.style.backgroundColor = '#00c9ff';
          btn.style.color = '#003f5c';
          btn.style.boxShadow = '0 0 10px #00d5ffaa';
        }
      }
    });
  });
}

// Load all data on page load then show default section
async function init() {
  await Promise.all([
    loadSectionData('about'),
    loadSectionData('divisions'),
    loadSectionData('activities'),
    loadSectionData('contact')
  ]);
  showSection('about');
}

// Attach event listeners for nav buttons
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    showSection(button.dataset.section);
  });
});

// Initialize
init();


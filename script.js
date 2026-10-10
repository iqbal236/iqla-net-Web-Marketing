const topics = {
  hotspot: {
    index: '01', category: 'LAYANAN HOTSPOT', title: 'Internet di area hotspot',
    copy: 'Untuk saat ini, Hotspot hanya tersedia di sekitar kantor layanan. Hubungi Admin untuk memastikan jangkauan di lokasi Anda.',
    link: 'Lihat paket Hotspot', href: '#panel-hotspot', tab: 'tab-hotspot'
  },
  home: {
    index: '02', category: 'WI-FI RUMAHAN', title: 'Internet untuk Wi-Fi rumah',
    copy: 'Paket untuk Wi-Fi di rumah dengan pilihan kecepatan hingga 25 Mbps.',
    link: 'Lihat paket Wi-Fi Rumah', href: '#panel-pppoe', tab: 'tab-pppoe'
  },
  voucher: {
    index: '03', category: 'PILIHAN VOUCHER', title: 'Voucher internet praktis',
    copy: 'Pilih voucher reguler atau voucher malam. Voucher dapat dibeli di DTR Printing.',
    link: 'Lihat paket Voucher', href: '#panel-voucher', tab: 'tab-voucher'
  },
  area: {
    index: '04', category: 'CAKUPAN JARINGAN', title: 'Pastikan area Anda terjangkau',
    copy: 'Wilayah coverage Iqla.net adalah Marga Jaya. Untuk saat ini, Hotspot hanya tersedia di sekitar kantor layanan. Alamat kantor: Jl. Protokol, Desa Marga Jaya, RT.12 RW.03, Kec. Padang Jaya, Kab. Bengkulu Utara.',
    link: 'Pilih paket Hotspot', href: '#panel-hotspot', tab: 'tab-hotspot'
  },
  kontak: {
    index: '05', category: 'HUBUNGI IQla.net', title: 'Tanyakan lewat WhatsApp',
    copy: 'Hubungi kami untuk menanyakan paket dan ketersediaan layanan.',
    link: 'Chat Admin via WhatsApp', href: 'https://wa.me/6282364000557', tab: null, external: true
  }
};
const panel = document.getElementById('info-dialog');
const orbitButtons = [...document.querySelectorAll('.satellite')];
function selectTopic(key) {
  const info = topics[key];
  orbitButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === key)));
  {
    document.getElementById('info-index').textContent = info.index;
    document.getElementById('info-category').textContent = info.category;
    document.getElementById('info-title').textContent = info.title;
    document.getElementById('info-copy').textContent = info.copy;
    const link = document.getElementById('info-link');
    link.textContent = info.link;
    const arrow = document.createElement('span');
    arrow.textContent = '↘';
    link.append(arrow);
    link.href = info.href;
    link.target = info.external ? '_blank' : '';
    link.rel = info.external ? 'noopener noreferrer' : '';
    if (info.tab) link.onclick = () => selectPackage(info.tab);
    else link.onclick = null;
    if (!panel.open) panel.showModal();
  }
}
orbitButtons.forEach(button => button.addEventListener('click', () => selectTopic(button.dataset.topic)));
const voucherTabs = [...document.querySelectorAll('.voucher-tab')];
voucherTabs.forEach(tab => tab.addEventListener('click', () => {
  voucherTabs.forEach(item => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.voucher-group').forEach(group => {
    const active = group.getAttribute('aria-labelledby') === tab.id;
    group.hidden = !active;
    group.classList.toggle('active', active);
  });
}));
function selectPackage(tabId) {
  const tab = document.getElementById(tabId);
  document.querySelectorAll('.package-tab').forEach(item => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.package-panel').forEach(item => {
    const active = item.getAttribute('aria-labelledby') === tabId;
    item.hidden = !active;
    item.classList.toggle('active', active);
  });
}
document.querySelectorAll('.package-tab').forEach(tab => tab.addEventListener('click', () => selectPackage(tab.id)));
document.querySelector('.dialog-close').addEventListener('click', () => panel.close());
panel.addEventListener('click', event => { if (event.target === panel) panel.close(); });
document.getElementById('info-link').addEventListener('click', () => { if (panel.open) panel.close(); });

const packagePopover = document.getElementById('package-popover');
const packageCards = [...document.querySelectorAll('.package-card')];
let activePackageCard = null;
const packageAppIcons = {
  WhatsApp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.1 11.9a8.1 8.1 0 0 1-11.8 7.2L4 20l.9-4.1A8.1 8.1 0 1 1 20.1 12Z"/><path d="M8.2 7.8c.4-.5 1-.3 1.2.2l.7 1.5-.8.8c.5 1 1.3 1.8 2.4 2.3l.8-.9 1.6.7c.5.2.7.8.2 1.2-.5.5-1.2.7-1.8.5-2.7-.8-4.6-2.7-5.4-5.4-.2-.5.1-1.2.6-1.7Z"/></svg>',
  YouTube: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4"/><path class="app-icon-cutout" d="m10 8.5 6 3.5-6 3.5z"/></svg>',
  Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle class="app-icon-dot" cx="17.4" cy="6.9" r="1"/></svg>',
  TikTok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h3c.2 2.3 1.5 3.8 4 4.2v3.1a9 9 0 0 1-4-1.3v6.4a6.4 6.4 0 1 1-6.4-6.4c.5 0 1 .1 1.4.2v3.3a3.2 3.2 0 1 0 1.9 2.9V3Z"/></svg>',
  Zoom: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="4"/><path d="m16 10 6-3v10l-6-3z"/></svg>',
  'Google Classroom': '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2.2"/><path d="M5.8 16c.4-2 1.5-3 3.2-3s2.8 1 3.2 3zM14 9h4v1.8h-4zm0 4h4v1.8h-4z"/></svg>',
  Netflix: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l6 12V3h4v18h-4L9 9v12H5z"/></svg>',
  Google: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
  Telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 4-3.2 16-6-4.3-3.2 2.5.7-5.3L18 7l-10.2 5.7L3 11z"/></svg>'
};

function packageRecommendation(card) {
  const service = card.querySelector('.package-type').textContent.trim();
  const name = card.querySelector('h3').textContent.trim();
  const speed = Number.parseInt(card.querySelector('.speed').textContent, 10);
  const quota = card.querySelector('.voucher-quota')?.textContent.trim();
  let devices;
  let copy;
  let apps;
  let note = 'Jumlah perangkat dan aplikasi adalah gambaran. Pengalaman dapat berbeda menurut aktivitas dan kondisi jaringan.';

  if (service === 'HOTSPOT') {
    devices = speed <= 5 ? '1–2 perangkat' : speed <= 10 ? '2–3 perangkat' : '3–5 perangkat';
    apps = speed <= 5 ? ['WhatsApp', 'Google', 'Telegram'] : speed <= 10 ? ['WhatsApp', 'Instagram', 'YouTube'] : ['YouTube', 'TikTok', 'Zoom'];
    copy = speed <= 5
      ? 'Pas untuk chat, browsing, dan media sosial ringan di area Hotspot.'
      : speed <= 10
        ? 'Nyaman untuk browsing, media sosial, dan streaming ringan.'
        : 'Pilihan untuk aktivitas yang lebih ramai dan streaming di beberapa perangkat.';
    note = 'Hotspot saat ini tersedia di sekitar kantor layanan. Contoh aplikasi dan jumlah perangkat hanya perkiraan.';
  } else if (service === 'WI-FI RUMAH') {
    devices = speed <= 5 ? '1–2 perangkat' : speed <= 10 ? '2–4 perangkat' : speed <= 15 ? '3–5 perangkat' : '5–8 perangkat';
    apps = speed <= 5 ? ['WhatsApp', 'Google Classroom', 'YouTube'] : speed <= 10 ? ['WhatsApp', 'Instagram', 'YouTube'] : speed <= 15 ? ['YouTube', 'Instagram', 'Zoom'] : ['Netflix', 'YouTube', 'Zoom', 'TikTok'];
    copy = speed <= 5
      ? 'Cocok untuk chat, browsing, belajar, dan kebutuhan dasar di rumah.'
      : speed <= 10
        ? 'Cocok untuk penggunaan harian keluarga: browsing, media sosial, dan video.'
        : speed <= 15
          ? 'Lebih nyaman untuk beberapa pengguna dan streaming.'
          : 'Untuk rumah dengan lebih banyak perangkat, video call, dan streaming bersamaan.';
  } else if (service === 'VOUCHER REGULER') {
    devices = speed <= 2 ? '1 perangkat' : '1–2 perangkat';
    apps = speed <= 2 ? ['WhatsApp', 'Google', 'Telegram'] : ['WhatsApp', 'Instagram', 'YouTube'];
    copy = speed <= 2
      ? 'Pas untuk chat dan browsing ringan selama masa aktif voucher.'
      : 'Cocok untuk browsing, media sosial, dan video ringan selama masa aktif voucher.';
    note = `Masa aktif ${name.toLowerCase()}. Voucher tersedia di DTR Printing. Contoh aplikasi untuk penggunaan ringan.`;
  } else {
    devices = speed >= 50 ? '3–4 perangkat' : speed >= 30 ? '2–3 perangkat' : '1–2 perangkat';
    apps = speed >= 50 ? ['Netflix', 'YouTube', 'TikTok', 'Zoom'] : speed >= 30 ? ['YouTube', 'Netflix', 'TikTok'] : ['YouTube', 'TikTok', 'Instagram'];
    copy = 'Cocok untuk unduhan atau pembaruan berukuran besar pada malam hari.';
    note = `${quota} kuota, aktif pukul 00:00–06:00 dan hanya berlaku semalam. Voucher tersedia di DTR Printing.`;
  }

  return { service, name, speed, quota, devices, apps, copy, note };
}

function closePackagePopover() {
  if (packagePopover.open) packagePopover.close();
}

function showPackagePopover(card) {
  if (activePackageCard === card && packagePopover.open) {
    closePackagePopover();
    return;
  }

  if (activePackageCard) activePackageCard.setAttribute('aria-expanded', 'false');
  activePackageCard = card;
  activePackageCard.setAttribute('aria-expanded', 'true');
  const info = packageRecommendation(card);
  document.getElementById('package-popover-kicker').textContent = `${info.service} · ${info.speed} Mbps${info.quota ? ` · ${info.quota}` : ''}`;
  document.getElementById('package-popover-title').textContent = info.name;
  document.getElementById('package-popover-devices').textContent = info.devices;
  document.getElementById('package-popover-copy').textContent = info.copy;
  const appList = document.getElementById('package-popover-apps');
  appList.replaceChildren(...info.apps.map(name => {
    const chip = document.createElement('span');
    chip.className = `package-app-chip package-app-${name.toLowerCase().replaceAll(' ', '-')}`;
    const icon = document.createElement('span');
    icon.className = 'package-app-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = packageAppIcons[name];
    const label = document.createElement('span');
    label.textContent = name;
    chip.append(icon, label);
    return chip;
  }));
  const note = document.getElementById('package-popover-note');
  note.textContent = info.note;
  note.hidden = !info.note;

  packagePopover.style.left = '0px';
  packagePopover.style.top = '0px';
  if (!packagePopover.open) packagePopover.show();
  const cardRect = card.getBoundingClientRect();
  const popupRect = packagePopover.getBoundingClientRect();
  const margin = 12;
  const left = Math.min(Math.max(margin, cardRect.left + (cardRect.width - popupRect.width) / 2), window.innerWidth - popupRect.width - margin);
  let top = cardRect.bottom + 10;
  if (top + popupRect.height > window.innerHeight - margin) top = cardRect.top - popupRect.height - 10;
  top = Math.min(Math.max(margin, top), window.innerHeight - popupRect.height - margin);
  packagePopover.style.left = `${left}px`;
  packagePopover.style.top = `${top}px`;
}

packageCards.forEach((card, index) => {
  const info = packageRecommendation(card);
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-haspopup', 'dialog');
  card.setAttribute('aria-expanded', 'false');
  card.setAttribute('aria-label', `Rekomendasi paket ${info.name}, ${info.speed} Mbps, ${card.querySelector('.price').textContent.trim()}`);
  const hint = document.createElement('span');
  hint.className = 'package-info-icon';
  hint.setAttribute('aria-hidden', 'true');
  hint.textContent = 'i';
  card.append(hint);
  card.addEventListener('click', () => showPackagePopover(card));
  card.addEventListener('keydown', event => {
    if (event.target !== card || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    showPackagePopover(card);
  });
});

document.querySelector('.package-popover-close').addEventListener('click', closePackagePopover);
packagePopover.addEventListener('close', () => {
  if (activePackageCard) activePackageCard.setAttribute('aria-expanded', 'false');
  activePackageCard = null;
});
document.addEventListener('pointerdown', event => {
  if (packagePopover.open && !packagePopover.contains(event.target) && !event.target.closest('.package-card')) closePackagePopover();
});
window.addEventListener('scroll', closePackagePopover, { passive: true });
window.addEventListener('resize', closePackagePopover);

document.getElementById('year').textContent = new Date().getFullYear();

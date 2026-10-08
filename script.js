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
document.getElementById('year').textContent = new Date().getFullYear();

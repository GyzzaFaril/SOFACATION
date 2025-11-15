/* app.js — client-side demo: render layanan & produk, simpan di localStorage (demo),
   buka halaman via data-page, buka google form untuk booking.
*/

const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menuToggle');
const navEl = document.querySelector('.nav');

function showPage(name){
  pages.forEach(p=> p.style.display = p.id === 'page-' + name ? 'block' : 'none');
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.page === name));
  document.querySelector('.brand').textContent = name === 'home' ? 'Victornz Services' : navLinks.forEach? document.querySelector('.nav-link.active')?.textContent.trim() : '';
}

// nav clicks
navLinks.forEach(a => a.addEventListener('click', (e)=>{
  e.preventDefault();
  const page = a.dataset.page;
  showPage(page);
}));

// responsive menu toggle
menuToggle?.addEventListener('click', ()=> {
  const visible = navEl.style.display === 'flex';
  navEl.style.display = visible ? '' : 'flex';
  navEl.style.flexDirection = 'row';
});

// booking button opens Google Form (ganti link ke Form-mu)
document.getElementById('bookBtn')?.addEventListener('click', ()=> {
  window.open('https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform', '_blank');
});
document.getElementById('openForm')?.addEventListener('click', ()=> {
  window.open('https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform', '_blank');
});

// Demo storage keys
const SERVICES_KEY = 'demo_services_v1';
const PRODUCTS_KEY = 'demo_products_v1';

// helpers: load/save
function loadJSON(key, fallback=[]) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch(e) { return fallback; }
}
function saveJSON(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

// render services
function renderServices(){
  const list = document.getElementById('servicesList');
  list.innerHTML = '';
  const items = loadJSON(SERVICES_KEY, [
    { title:'Tutoring Mingguan (4x)', price:150000, desc:'Sesi 1 jam, materi & latihan.' },
    { title:'Proofreading Laporan', price:80000, desc:'Perbaikan tata bahasa & struktur.' }
  ]);
  items.forEach(it => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<div>
        <strong>${it.title}</strong><div style="color:#666">${it.desc}</div>
      </div>
      <div style="text-align:right">
        <div style="font-weight:800">Rp ${it.price.toLocaleString()}</div>
        <button class="btn" style="margin-top:8px" onclick="bookService('${encodeURIComponent(it.title)}')">Pesan</button>
      </div>`;
    list.appendChild(div);
  });
}

// render products
function renderProducts(){
  const grid = document.getElementById('productList');
  grid.innerHTML = '';
  const items = loadJSON(PRODUCTS_KEY, [
    { title:'Template Presentasi', price:25000, image:'', desc:'Template modern untuk presentasi.' },
    { title:'Thumbnail Pack', price:40000, image:'', desc:'Paket thumbnail siap pakai.' }
  ]);
  items.forEach(it => {
    const card = document.createElement('div');
    card.className = 'product';
    card.innerHTML = `<img src="${it.image || 'https://via.placeholder.com/400x240?text=No+Image'}" alt="${it.title}">
      <h4>${it.title}</h4>
      <div style="color:#666">${it.desc}</div>
      <div style="margin-top:8px; font-weight:800">Rp ${it.price.toLocaleString()}</div>
      <div style="margin-top:10px"><button class="btn" onclick="buyProduct('${encodeURIComponent(it.title)}')">Beli</button></div>`;
    grid.appendChild(card);
  });
}

// book / buy handlers (demo simple)
function bookService(title){
  // arahkan ke email + isi subject demo
  const subject = encodeURIComponent('Pemesanan Bimbingan: ' + decodeURIComponent(title));
  window.location.href = `mailto:contact@example.com?subject=${subject}`;
}
function buyProduct(title){
  const subject = encodeURIComponent('Order Produk: ' + decodeURIComponent(title));
  window.location.href = `mailto:contact@example.com?subject=${subject}`;
}

// attach add forms
document.getElementById('addServiceForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const f = e.target;
  const title = f.title.value.trim();
  const price = Number(f.price.value) || 0;
  const desc = f.desc.value.trim();
  const items = loadJSON(SERVICES_KEY);
  items.unshift({ title, price, desc });
  saveJSON(SERVICES_KEY, items);
  f.reset();
  renderServices();
});

document.getElementById('addProductForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const f = e.target;
  const title = f.title.value.trim();
  const price = Number(f.price.value) || 0;
  const image = f.image.value.trim();
  const desc = f.desc.value.trim();
  const items = loadJSON(PRODUCTS_KEY);
  items.unshift({ title, price, image, desc });
  saveJSON(PRODUCTS_KEY, items);
  f.reset();
  renderProducts();
});

// init
document.addEventListener('DOMContentLoaded', ()=>{
  renderServices();
  renderProducts();

  // handle page buttons (cards on home)
  document.querySelectorAll('[data-page]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const p = btn.dataset.page;
      showPage(p);
    });
  });

  // show home by default
  showPage('home');
});

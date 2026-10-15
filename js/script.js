// Um único objeto de estado manda em tudo (mapa, lista e cartão de detalhes).
// Sempre que algo muda, chamamos render() e as três partes se atualizam juntas.

const FAV_KEY = 'mapa-recife-favoritos';

function loadFavs() {
  try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); }
  catch { return new Set(); }
}

const state = {
  cat: 'todos',       // 'todos', 'comer', 'ver' ou 'cultura'
  onlyFavs: false,    // mostrar só os favoritos?
  selected: null,     // id do lugar aberto no cartão de detalhes
  favs: loadFavs(),   // ids dos lugares favoritados
};

// ---------- Elementos e utilidades ----------

const listEl = document.getElementById('list');
const detailEl = document.getElementById('detail');
const countEl = document.getElementById('count');
const favToggle = document.getElementById('favToggle');
const favCount = document.getElementById('favCount');

const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const byId = (id) => PLACES.find((p) => p.id === id);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function saveFavs() {
  try { localStorage.setItem(FAV_KEY, JSON.stringify([...state.favs])); } catch {}
}

function visiblePlaces() {
  return PLACES.filter((p) =>
    (state.cat === 'todos' || p.cat === state.cat) &&
    (!state.onlyFavs || state.favs.has(p.id))
  );
}

// ---------- Mapa (Leaflet + OpenStreetMap) ----------

if (typeof L === 'undefined') {
  document.getElementById('map').textContent = 'Não foi possível carregar o mapa. Confira sua conexão e recarregue a página.';
  throw new Error('Leaflet não carregou');
}

const map = L.map('map').setView([-8.063, -34.88], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const markersLayer = L.layerGroup().addTo(map);

function renderMarkers(items, fit) {
  markersLayer.clearLayers();

  items.forEach((p) => {
    const isSelected = p.id === state.selected;
    const icon = L.divIcon({
      className: '',
      html: `<span class="pin pin-${p.cat}${isSelected ? ' on' : ''}"></span>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
    L.marker([p.lat, p.lng], { icon, title: p.nome, zIndexOffset: isSelected ? 1000 : 0 })
      .on('click', () => select(p.id))
      .addTo(markersLayer);
  });

  // Ao mudar o filtro, enquadra o mapa nos lugares que sobraram
  if (fit && items.length) {
    map.fitBounds(L.latLngBounds(items.map((p) => [p.lat, p.lng])), { padding: [50, 50], maxZoom: 15 });
  }
}

// ---------- Lista ----------

function renderList(items) {
  const n = items.length;
  countEl.textContent = `${n} ${n === 1 ? 'lugar' : 'lugares'}`;

  if (!n) {
    listEl.innerHTML = state.onlyFavs
      ? '<li class="empty">Nenhum favorito aqui ainda. Toque na estrela de um lugar pra guardá-lo.</li>'
      : '<li class="empty">Nenhum lugar nesta categoria.</li>';
    return;
  }

  listEl.innerHTML = items.map((p) => {
    const fav = state.favs.has(p.id);
    const sel = p.id === state.selected;
    return `
      <li class="card cat-${p.cat}${sel ? ' selected' : ''}">
        <button type="button" class="card-main" data-id="${p.id}" aria-pressed="${sel}">
          <span class="card-name">${esc(p.nome)}</span>
          <span class="card-meta"><span class="tag tag-${p.cat}">${CATS[p.cat]}</span>${esc(p.bairro)}</span>
        </button>
        <button type="button" class="star${fav ? ' on' : ''}" data-fav="${p.id}" aria-pressed="${fav}" aria-label="Favoritar ${esc(p.nome)}">${fav ? '★' : '☆'}</button>
      </li>`;
  }).join('');
}

// ---------- Cartão de detalhes ----------

function renderDetail() {
  const p = byId(state.selected);
  if (!p) { detailEl.hidden = true; detailEl.innerHTML = ''; return; }

  const fav = state.favs.has(p.id);
  detailEl.hidden = false;
  detailEl.innerHTML = `
    <div class="detail-top">
      <h2>${esc(p.nome)}</h2>
      <button type="button" class="close" id="detailClose" aria-label="Fechar detalhes">×</button>
    </div>
    <p class="card-meta"><span class="tag tag-${p.cat}">${CATS[p.cat]}</span>${esc(p.bairro)}</p>
    <p>${esc(p.desc)}</p>
    <p><strong>Dica:</strong> ${esc(p.dica)}</p>
    <div class="detail-actions">
      <button type="button" class="btn" id="detailFav" aria-pressed="${fav}">${fav ? '★ Favoritado' : '☆ Favoritar'}</button>
      <a class="btn" href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}" target="_blank" rel="noopener">Abrir no Google Maps</a>
    </div>`;
}

// ---------- Render geral ----------

function renderChips() {
  document.querySelectorAll('[data-cat]').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.cat === state.cat));
  });
  favToggle.setAttribute('aria-pressed', String(state.onlyFavs));
  favCount.textContent = state.favs.size;
}

// refocus: seletor do botão que deve manter o foco (o HTML é recriado a cada render)
function render({ fit = false, refocus = null } = {}) {
  const items = visiblePlaces();
  if (state.selected && !items.some((p) => p.id === state.selected)) state.selected = null;

  renderChips();
  renderList(items);
  renderMarkers(items, fit);
  renderDetail();

  if (refocus) {
    const el = document.querySelector(refocus);
    if (el) el.focus();
  }
}

// ---------- Ações ----------

function select(id) {
  state.selected = id;
  render({ refocus: `[data-id="${id}"]` });
  const p = byId(id);
  const zoom = Math.max(map.getZoom(), 15);
  if (reducedMotion) map.setView([p.lat, p.lng], zoom);
  else map.flyTo([p.lat, p.lng], zoom, { duration: 0.8 });
}

function toggleFav(id, refocus) {
  if (state.favs.has(id)) state.favs.delete(id);
  else state.favs.add(id);
  saveFavs();
  // No modo "só favoritos", desfavoritar tira o card da lista: nesse caso o foco vai pro filtro
  const stillVisible = !state.onlyFavs || state.favs.has(id);
  render({ refocus: stillVisible ? refocus : '#favToggle' });
}

function closeDetail() {
  const id = state.selected;
  state.selected = null;
  render({ refocus: `[data-id="${id}"]` });
}

// ---------- Eventos ----------

document.querySelectorAll('[data-cat]').forEach((chip) => {
  chip.addEventListener('click', () => {
    state.cat = chip.dataset.cat;
    render({ fit: true });
  });
});

favToggle.addEventListener('click', () => {
  state.onlyFavs = !state.onlyFavs;
  render({ fit: true });
});

listEl.addEventListener('click', (e) => {
  const main = e.target.closest('[data-id]');
  const star = e.target.closest('[data-fav]');
  if (main) select(main.dataset.id);
  if (star) toggleFav(star.dataset.fav, `[data-fav="${star.dataset.fav}"]`);
});

detailEl.addEventListener('click', (e) => {
  if (e.target.closest('#detailClose')) closeDetail();
  if (e.target.closest('#detailFav')) toggleFav(state.selected, '#detailFav');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.selected) closeDetail();
});

// ---------- Início ----------

render({ fit: true });

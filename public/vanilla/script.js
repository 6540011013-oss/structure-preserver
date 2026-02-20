/* ================================================================
   ANDAMAN BEACH SUITES HOTEL — Shared JavaScript
   Vanilla JS — All features
================================================================ */

// ===== LANGUAGE SYSTEM =====
const LANG = {
  current: localStorage.getItem('appLang') || 'en',
  translations: {
    "hotel.name":       { en: "ANDAMAN BEACH SUITES HOTEL", th: "โรงแรมอันดามัน บีช สวีท" },
    "hotel.subtitle":   { en: "Room Status System", th: "ระบบสถานะห้องพัก" },
    "time.label":       { en: "Local Time :", th: "เวลาท้องถิ่น :" },
    "server.label":     { en: "Server Status :", th: "สถานะเซิร์ฟเวอร์ :" },
    "server.active":    { en: "Active", th: "ออนไลน์" },
    "btn.staffLogin":   { en: "STAFF LOGIN", th: "เข้าสู่ระบบ" },
    "btn.adminActive":  { en: "ADMIN ACTIVE ✓", th: "แอดมินเปิดใช้งาน ✓" },
    "hero.title":       { en: "Room Status System", th: "ระบบสถานะห้องพัก" },
    "hero.subtitle":    { en: "Internal Room Management System", th: "ระบบจัดการห้องพักภายใน" },
    "building.a.name":  { en: "ABSH", th: "ABSH" },
    "building.a.desc":  { en: "Building A • 104 Rooms", th: "อาคาร A • 104 ห้อง" },
    "building.a.floors":{ en: "9 Floors", th: "9 ชั้น" },
    "building.a.rooms": { en: "8 Rooms", th: "8 ห้อง" },
    "building.b.name":  { en: "ABSC", th: "ABSC" },
    "building.b.desc":  { en: "Building B • 40 Rooms", th: "อาคาร B • 40 ห้อง" },
    "building.b.floors":{ en: "4 Floors", th: "4 ชั้น" },
    "building.b.rooms": { en: "10 Rooms", th: "10 ห้อง" },
    "label.totalFloors":{ en: "Total Floors", th: "จำนวนชั้น" },
    "label.roomsFloor": { en: "Rooms/Floor", th: "ห้อง/ชั้น" },
    "btn.viewFloorPlan":{ en: "View Floor Plan →", th: "ดูผังชั้น →" },
    "footer.copyright": { en: "© Andaman Beach Suites Hotel", th: "© โรงแรมอันดามัน บีช สวีท" },
    "nav.home":         { en: "HOME", th: "หน้าหลัก" },
    "nav.lockMode":     { en: "🔒 Lock Mode", th: "🔒 ล็อค" },
    "nav.editModeOn":   { en: "🔓 Edit Mode: ON", th: "🔓 แก้ไข: เปิด" },
    "nav.settings":     { en: "⚙️ Settings", th: "⚙️ ตั้งค่า" },
    "nav.dashboard":    { en: "📊 Dashboard", th: "📊 แดชบอร์ด" },
    "nav.date":         { en: "📅 Date", th: "📅 วันที่" },
    "nav.buildingB":    { en: "🏢 Building B", th: "🏢 อาคาร B" },
    "nav.buildingA":    { en: "🏢 Building A", th: "🏢 อาคาร A" },
    "buildingA.title":  { en: "Building A — ABSH", th: "อาคาร A — ABSH" },
    "buildingA.sub":    { en: "Ocean View • Main Building", th: "วิวทะเล • อาคารหลัก" },
    "buildingB.title":  { en: "Building B — ABSC", th: "อาคาร B — ABSC" },
    "buildingB.sub":    { en: "City View • Condo Wing", th: "วิวเมือง • ปีกคอนโด" },
    "legend.roomType":  { en: "Room Type", th: "ประเภทห้อง" },
    "legend.service":   { en: "Service Status", th: "สถานะบริการ" },
    "room.title":       { en: "Room", th: "ห้อง" },
    "room.items":       { en: "items", th: "รายการ" },
    "room.addItem":     { en: "+ Add Item", th: "+ เพิ่มรายการ" },
    "room.noItems":     { en: "No items yet", th: "ยังไม่มีรายการ" },
    "room.noItemsSub":  { en: "Start adding items for this room.", th: "เริ่มเพิ่มรายการสำหรับห้องนี้" },
    "room.addFirst":    { en: "+ Add First Item", th: "+ เพิ่มรายการแรก" },
    "room.all":         { en: "All", th: "ทั้งหมด" },
    "room.note":        { en: "Room Note", th: "บันทึกห้อง" },
    "room.delete":      { en: "Delete", th: "ลบ" },
    "addItem.title":    { en: "Add New Item", th: "เพิ่มรายการใหม่" },
    "addItem.name":     { en: "Item Name", th: "ชื่อรายการ" },
    "addItem.width":    { en: "Width (cm)", th: "กว้าง (ซม.)" },
    "addItem.length":   { en: "Length (cm)", th: "ยาว (ซม.)" },
    "addItem.note":     { en: "Note", th: "หมายเหตุ" },
    "addItem.category": { en: "Category", th: "หมวดหมู่" },
    "addItem.save":     { en: "Save Item", th: "บันทึกรายการ" },
    "addItem.image":    { en: "Image", th: "รูปภาพ" },
    "addItem.dragHint": { en: "Drag an image here or click to choose.", th: "ลากรูปมาวางหรือคลิกเพื่อเลือก" },
    "edit.save":        { en: "Save Changes", th: "บันทึก" },
    "edit.cancel":      { en: "Cancel", th: "ยกเลิก" },
    "login.title":      { en: "Staff Login", th: "เข้าสู่ระบบพนักงาน" },
    "login.subtitle":   { en: "Please enter passcode to access", th: "กรุณาใส่รหัสผ่านเพื่อเข้าใช้งาน" },
    "login.cancel":     { en: "Cancel", th: "ยกเลิก" },
    "login.confirm":    { en: "Confirm", th: "ยืนยัน" },
    "login.logoutConfirm": { en: "Log out of Admin?", th: "ออกจากระบบแอดมิน?" },
    "cat.furniture":    { en: "Furniture", th: "เฟอร์นิเจอร์" },
    "cat.appliances":   { en: "Appliances", th: "เครื่องใช้ไฟฟ้า" },
    "cat.decor":        { en: "Decor", th: "ของตกแต่ง" },
    "cat.other":        { en: "Other", th: "อื่นๆ" },
    "settings.title":   { en: "Settings", th: "ตั้งค่า" },
    "settings.subtitle":{ en: "Manage system configuration", th: "จัดการการตั้งค่าระบบ" },
    "settings.roomTypes":{ en: "Room Types", th: "ประเภทห้อง" },
    "settings.maintenance":{ en: "Maintenance", th: "ซ่อมบำรุง" },
    "settings.adminPass":{ en: "Admin Password", th: "รหัสแอดมิน" },
    "settings.general": { en: "General", th: "ทั่วไป" },
    "settings.language":{ en: "🌐 Language", th: "🌐 ภาษา" },
    "settings.hotelName":{ en: "🏨 Hotel Name", th: "🏨 ชื่อโรงแรม" },
  },
  t(key) {
    const entry = this.translations[key];
    if (!entry) return key;
    return entry[this.current] || entry['en'] || key;
  },
  setLang(lang) {
    this.current = lang;
    localStorage.setItem('appLang', lang);
  }
};

// ===== ADMIN STATE =====
function isAdmin() { return localStorage.getItem('isAdmin') === 'true'; }
function setAdmin(val) { val ? localStorage.setItem('isAdmin', 'true') : localStorage.removeItem('isAdmin'); }

// ===== ROOM DATA (in-memory) =====
const roomItems = {};      // { roomId: [ {id, name, width, height, note, category, categoryIcon, image} ] }
const roomServices = {};   // { roomId: [catId, ...] }
const roomNotes = {};      // { roomId: "note text" }

// ===== DEFAULT SERVICE CATEGORIES =====
let serviceCategories = [
  { id: "air", name: "แอร์", icon: "❄️", color: "hsl(270,80%,75%)" },
  { id: "electric", name: "ไฟฟ้า", icon: "⚡", color: "hsl(45,90%,60%)" },
  { id: "housekeeping", name: "แม่บ้าน", icon: "🧹", color: "hsl(350,75%,75%)" },
  { id: "shower", name: "ฝักบัว", icon: "🚿", color: "hsl(210,15%,70%)" },
];

// ===== ROOM TYPES =====
const roomTypes = [
  { id: "condo", label: "Condo / Owner", color: "#FFFF00", borderColor: "#e6e600" },
  { id: "sus", label: "Superior Suite", color: "#FFCC99", borderColor: "#f2b379" },
  { id: "dls", label: "Deluxe Suite", color: "#9ACD32", borderColor: "#86b32b" },
  { id: "sdl", label: "Studio Deluxe", color: "#b18cd3", borderColor: "#9a73bd" },
  { id: "sps", label: "Superior", color: "#f8f8b8", borderColor: "#e1e1a2" },
  { id: "fam", label: "Family", color: "#97bce4", borderColor: "#7ea5cf" },
  { id: "lux", label: "Luxury / Royal", color: "#FF9900", borderColor: "#e68a00" },
];

// ===== ITEM CATEGORIES =====
let itemCategories = [
  { id: "furniture", name: "Furniture", icon: "🛋️" },
  { id: "appliances", name: "Appliances", icon: "💡" },
  { id: "decor", name: "Decor", icon: "🖼️" },
  { id: "other", name: "Other", icon: "📦" },
];

// ===== UTILITY =====
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

// ===== LIVE CLOCK =====
function startClock(el) {
  if (!el) return;
  function tick() {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  }
  tick();
  setInterval(tick, 1000);
}

// ===== HERO SLIDER =====
function initHeroSlider(trackEl, slides) {
  if (!trackEl || !slides.length) return;
  let current = 0;
  setInterval(() => {
    current = (current + 1) % slides.length;
    trackEl.style.transform = `translateX(-${(current * 100) / slides.length}%)`;
  }, 3000);
}

// ===== LOGIN MODAL =====
function showLoginModal() {
  const m = $('#loginModal');
  if (m) { m.classList.remove('hidden'); setTimeout(() => { const inp = m.querySelector('input'); if(inp) inp.focus(); }, 100); }
}
function hideLoginModal() {
  const m = $('#loginModal');
  if (m) { m.classList.add('hidden'); const inp = m.querySelector('input'); if(inp) inp.value = ''; }
}
function handleLogin() {
  const inp = $('#loginModal input');
  if (inp && inp.value === '1234') {
    setAdmin(true);
    hideLoginModal();
    updateAdminUI();
    return true;
  }
  alert('Incorrect password ❌');
  return false;
}
function handleAdminBtn() {
  if (isAdmin()) {
    if (confirm(LANG.t('login.logoutConfirm'))) {
      setAdmin(false);
      updateAdminUI();
    }
  } else {
    showLoginModal();
  }
}
function updateAdminUI() {
  const btn = $('#adminBtn');
  if (!btn) return;
  if (isAdmin()) {
    btn.textContent = LANG.t('btn.adminActive');
    btn.classList.add('active');
  } else {
    btn.textContent = LANG.t('btn.staffLogin');
    btn.classList.remove('active');
  }
}

// ===== SERVICE STATUS PANEL =====
function renderServicePanel(container, activeFilters) {
  if (!container) return;
  container.innerHTML = '';
  serviceCategories.forEach(cat => {
    const count = Object.values(roomServices).filter(s => s.includes(cat.id)).length;
    const active = activeFilters.includes(cat.id);
    const btn = document.createElement('button');
    btn.className = 'service-btn' + (active ? ' active' : '');
    btn.innerHTML = `
      <span class="service-icon-wrap" style="${active ? 'background:' + cat.color + '40' : ''}">${cat.icon}</span>
      <span class="service-name">${cat.name}</span>
      <span class="service-count" style="${active ? 'background:' + cat.color : ''}">${count}</span>
    `;
    btn.onclick = () => {
      const idx = activeFilters.indexOf(cat.id);
      if (idx >= 0) activeFilters.splice(idx, 1);
      else activeFilters.push(cat.id);
      renderServicePanel(container, activeFilters);
      applyRoomFilters(activeFilters);
    };
    container.appendChild(btn);
  });
}

function applyRoomFilters(activeFilters) {
  const rooms = $$('.room, .room-b');
  if (activeFilters.length === 0) {
    rooms.forEach(r => { r.classList.remove('room-greyed', 'room-highlighted'); });
    return;
  }
  const highlighted = new Set();
  for (const [rid, services] of Object.entries(roomServices)) {
    if (activeFilters.some(f => services.includes(f))) highlighted.add(rid);
  }
  rooms.forEach(r => {
    const rid = r.dataset.roomId || r.textContent.trim().split('\n')[0].trim();
    if (highlighted.has(rid)) { r.classList.remove('room-greyed'); r.classList.add('room-highlighted'); }
    else { r.classList.add('room-greyed'); r.classList.remove('room-highlighted'); }
  });
}

// ===== RENDER SERVICE DOTS IN ROOMS =====
function renderServiceDots() {
  $$('.room-service-icons').forEach(el => el.remove());
  $$('.room, .room-b').forEach(r => {
    const rid = r.dataset.roomId || r.childNodes[0]?.textContent?.trim();
    const services = roomServices[rid];
    if (!services || !services.length) return;
    const container = document.createElement('div');
    container.className = 'room-service-icons';
    services.forEach(catId => {
      const cat = serviceCategories.find(c => c.id === catId);
      if (!cat) return;
      const dot = document.createElement('span');
      dot.className = 'room-service-dot';
      dot.style.background = cat.color;
      dot.title = cat.name;
      container.appendChild(dot);
    });
    r.style.position = 'relative';
    r.appendChild(container);
  });
}

// ===== ROOM LEGEND =====
function renderRoomTypeLegend(container) {
  if (!container) return;
  container.innerHTML = '<h4>' + LANG.t('legend.roomType') + '</h4>';
  roomTypes.forEach(rt => {
    const row = document.createElement('div');
    row.className = 'legend-row';
    row.innerHTML = `<span class="legend-box" style="background:${rt.color};border-color:${rt.borderColor}"></span><span>${rt.label}</span>`;
    container.appendChild(row);
  });
}

// ===== ROOM INFO MODAL =====
function showRoomInfo(roomId) {
  const modal = $('#roomInfoModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.dataset.roomId = roomId;
  const items = roomItems[roomId] || [];
  const title = modal.querySelector('.room-info-banner h1');
  const sub = modal.querySelector('.room-info-banner p');
  if (title) title.textContent = LANG.t('room.title') + ' ' + roomId;
  if (sub) sub.textContent = LANG.t('room.title') + ' #' + roomId + ' • ' + items.length + ' ' + LANG.t('room.items');
  renderRoomItems(roomId, 'all');
}
function hideRoomInfo() {
  const modal = $('#roomInfoModal');
  if (modal) modal.classList.add('hidden');
}

function renderRoomItems(roomId, catFilter) {
  const grid = $('#roomItemsGrid');
  const empty = $('#roomItemsEmpty');
  const filters = $('#roomCatFilters');
  if (!grid) return;

  const items = (roomItems[roomId] || []).filter(i => catFilter === 'all' || i.category === catFilter);

  // Render category filters
  if (filters) {
    filters.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'cat-pill' + (catFilter === 'all' ? ' active' : '');
    allBtn.textContent = LANG.t('room.all');
    allBtn.onclick = () => renderRoomItems(roomId, 'all');
    filters.appendChild(allBtn);
    itemCategories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-pill' + (catFilter === cat.id ? ' active' : '');
      btn.textContent = cat.icon + ' ' + cat.name;
      btn.onclick = () => renderRoomItems(roomId, cat.id);
      filters.appendChild(btn);
    });
  }

  if (items.length === 0) {
    grid.style.display = 'none';
    if (empty) {
      empty.style.display = 'block';
      empty.innerHTML = `
        <div class="empty-state">
          <div class="emoji">📭</div>
          <h3>${LANG.t('room.noItems')}</h3>
          <p>${LANG.t('room.noItemsSub')}</p>
          <button class="btn-add-item" onclick="showAddItemModal()">${LANG.t('room.addFirst')}</button>
        </div>`;
    }
    return;
  }

  if (empty) empty.style.display = 'none';
  grid.style.display = 'grid';
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    let html = '';
    if (item.image) html += `<img src="${item.image}" alt="${item.name}">`;
    html += `<div class="info"><h4>${item.name}</h4>`;
    if (item.width && item.height) html += `<p class="dims">${item.width} × ${item.height} cm</p>`;
    if (item.note) html += `<p class="note">${item.note}</p>`;
    html += `<span class="cat-tag">${item.categoryIcon} ${item.category}</span></div>`;
    if (isAdmin()) {
      html += `<div style="padding:0 16px 12px;text-align:right"><button onclick="deleteItem('${roomId}','${item.id}')" style="color:#f87171;background:none;border:none;cursor:pointer;font-size:12px">${LANG.t('room.delete')}</button></div>`;
    }
    card.innerHTML = html;
    grid.appendChild(card);
  });
}

function deleteItem(roomId, itemId) {
  if (roomItems[roomId]) {
    roomItems[roomId] = roomItems[roomId].filter(i => i.id !== itemId);
    const modal = $('#roomInfoModal');
    if (modal) renderRoomItems(roomId, 'all');
  }
}

// ===== ADD ITEM MODAL =====
function showAddItemModal() {
  const m = $('#addItemModal');
  if (m) m.classList.remove('hidden');
}
function hideAddItemModal() {
  const m = $('#addItemModal');
  if (m) m.classList.add('hidden');
}
function saveNewItem() {
  const modal = $('#roomInfoModal');
  const roomId = modal ? modal.dataset.roomId : '';
  if (!roomId) return;

  const name = $('#addItemName')?.value?.trim();
  if (!name) { alert('Please enter item name'); return; }

  const width = $('#addItemWidth')?.value || '';
  const height = $('#addItemHeight')?.value || '';
  const note = $('#addItemNote')?.value || '';
  const catSel = $('#addItemCategory');
  const catVal = catSel ? catSel.value : 'other';
  const catObj = itemCategories.find(c => c.id === catVal) || { id: 'other', name: 'Other', icon: '📦' };

  if (!roomItems[roomId]) roomItems[roomId] = [];
  roomItems[roomId].push({
    id: Date.now().toString(),
    name, width, height, note,
    category: catObj.id,
    categoryIcon: catObj.icon,
    image: ''
  });

  // Clear inputs
  if ($('#addItemName')) $('#addItemName').value = '';
  if ($('#addItemWidth')) $('#addItemWidth').value = '';
  if ($('#addItemHeight')) $('#addItemHeight').value = '';
  if ($('#addItemNote')) $('#addItemNote').value = '';

  hideAddItemModal();
  renderRoomItems(roomId, 'all');
  // Update count in banner
  const sub = modal.querySelector('.room-info-banner p');
  const items = roomItems[roomId] || [];
  if (sub) sub.textContent = LANG.t('room.title') + ' #' + roomId + ' • ' + items.length + ' ' + LANG.t('room.items');
}

// ===== EDIT ROOM MODAL =====
function showEditModal(roomId) {
  const m = $('#editRoomModal');
  if (!m) return;
  m.classList.remove('hidden');
  m.dataset.roomId = roomId;
  const title = m.querySelector('.edit-header h2');
  if (title) title.textContent = '✏️ Edit Room ' + roomId;

  // Populate service toggles
  const serviceContainer = m.querySelector('.service-select');
  if (serviceContainer) {
    serviceContainer.innerHTML = '';
    serviceCategories.forEach(cat => {
      const active = (roomServices[roomId] || []).includes(cat.id);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'service-toggle' + (active ? ' active' : '');
      btn.dataset.catId = cat.id;
      btn.innerHTML = `${cat.icon} ${cat.name}${active ? ' ✓' : ''}`;
      btn.onclick = () => { btn.classList.toggle('active'); };
      serviceContainer.appendChild(btn);
    });
  }
}
function hideEditModal() {
  const m = $('#editRoomModal');
  if (m) m.classList.add('hidden');
}
function saveEditModal() {
  const m = $('#editRoomModal');
  if (!m) return;
  const roomId = m.dataset.roomId;
  // Collect selected services
  const selected = [];
  m.querySelectorAll('.service-toggle.active').forEach(btn => {
    selected.push(btn.dataset.catId);
  });
  roomServices[roomId] = selected;
  hideEditModal();
  renderServiceDots();
  // Re-render service panel counts
  const servicePanel = $('#servicePanel');
  if (servicePanel) renderServicePanel(servicePanel, window._activeFilters || []);
}

// ===== SETTINGS MODAL =====
function showSettingsModal() {
  const m = $('#settingsModal');
  if (m) m.classList.remove('hidden');
  renderSettingsTab('room-types');
}
function hideSettingsModal() {
  const m = $('#settingsModal');
  if (m) m.classList.add('hidden');
}
function renderSettingsTab(tab) {
  const content = $('#settingsContent');
  if (!content) return;

  // Update tab active state
  $$('.settings-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));

  if (tab === 'room-types') {
    let html = '<h3 style="font-size:16px;font-weight:800;margin-bottom:16px">Room Types</h3>';
    html += '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">';
    roomTypes.forEach(rt => {
      html += `<div style="display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:12px">
        <span style="width:20px;height:20px;border-radius:50%;background:${rt.color};flex-shrink:0;border:1px solid ${rt.borderColor}"></span>
        <span style="flex:1;font-size:13px;font-weight:600">${rt.label}</span>
        <code style="font-size:11px;color:#94a3b8">${rt.id}</code>
      </div>`;
    });
    html += '</div>';
    content.innerHTML = html;
  } else if (tab === 'maintenance') {
    let html = '<h3 style="font-size:16px;font-weight:800;margin-bottom:16px">🛠️ Maintenance Categories</h3>';
    html += '<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">';
    serviceCategories.forEach(cat => {
      html += `<div style="display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:12px">
        <span style="width:32px;height:32px;border-radius:8px;background:${cat.color}30;border:2px solid ${cat.color};display:flex;align-items:center;justify-content:center;font-size:16px">${cat.icon}</span>
        <span style="flex:1;font-size:13px;font-weight:600">${cat.name}</span>
        <button onclick="removeServiceCategory('${cat.id}')" style="color:#f87171;background:none;border:none;cursor:pointer;font-size:14px">✕</button>
      </div>`;
    });
    html += '</div>';
    html += `<div style="padding:16px;background:#faf5ff;border-radius:12px;border:1px solid #e9d5ff">
      <label style="display:block;font-size:12px;font-weight:700;margin-bottom:4px">Category Name</label>
      <input id="newCatName" type="text" placeholder="e.g., Electrical" class="form-input" style="margin-bottom:12px">
      <label style="display:block;font-size:12px;font-weight:700;margin-bottom:4px">Emoji Icon</label>
      <input id="newCatIcon" type="text" value="⚡" class="form-input" style="width:80px;margin-bottom:12px">
      <button onclick="addServiceCategory()" style="width:100%;padding:10px;border-radius:12px;background:#7c3aed;color:white;border:none;font-weight:700;cursor:pointer">+ Add Category</button>
    </div>`;
    content.innerHTML = html;
  } else if (tab === 'admin') {
    content.innerHTML = `
      <h3 style="font-size:16px;font-weight:800;margin-bottom:16px">Admin Password</h3>
      <div style="max-width:360px">
        <label class="form-label">🔑 Current Password</label>
        <input type="password" class="form-input" placeholder="••••" style="margin-bottom:12px">
        <label class="form-label">🔐 New Password</label>
        <input type="password" class="form-input" placeholder="At least 4 characters" style="margin-bottom:12px">
        <label class="form-label">🔐 Confirm New Password</label>
        <input type="password" class="form-input" placeholder="••••" style="margin-bottom:16px">
        <button onclick="alert('Password changed ✅')" style="width:100%;padding:12px;border-radius:12px;background:#2563eb;color:white;border:none;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,0.25)">Change Password</button>
      </div>`;
  } else if (tab === 'general') {
    content.innerHTML = `
      <h3 style="font-size:16px;font-weight:800;margin-bottom:16px">General Settings</h3>
      <div style="max-width:360px">
        <label class="form-label">${LANG.t('settings.hotelName')}</label>
        <input type="text" class="form-input" value="Andaman Beach Suites" style="margin-bottom:16px">
        <label class="form-label">${LANG.t('settings.language')}</label>
        <select class="form-input form-select" onchange="LANG.setLang(this.value); location.reload();">
          <option value="en" ${LANG.current==='en'?'selected':''}>English</option>
          <option value="th" ${LANG.current==='th'?'selected':''}>ภาษาไทย</option>
        </select>
      </div>`;
  }
}
function addServiceCategory() {
  const name = ($('#newCatName')?.value || '').trim();
  const icon = ($('#newCatIcon')?.value || '📦').trim();
  if (!name) return;
  const id = name.toLowerCase().replace(/\s+/g, '-');
  serviceCategories.push({ id, name, icon, color: 'hsl(200,80%,60%)' });
  renderSettingsTab('maintenance');
}
function removeServiceCategory(id) {
  serviceCategories = serviceCategories.filter(c => c.id !== id);
  renderSettingsTab('maintenance');
}

// ===== DATE PICKER =====
function showDatePicker() {
  const m = $('#datePickerModal');
  if (m) m.classList.remove('hidden');
  renderCalendar();
}
function hideDatePicker() {
  const m = $('#datePickerModal');
  if (m) m.classList.add('hidden');
}

let calViewYear, calViewMonth, calPicked = null;
(function() {
  const now = new Date();
  calViewYear = now.getFullYear();
  calViewMonth = now.getMonth();
})();

const TH_MONTHS = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
const EN_MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const TH_DAYS = ["อา","จ","อ","พ","พฤ","ศ","ส"];
const EN_DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function renderCalendar() {
  const grid = $('#calGrid');
  const monthLabel = $('#calMonthLabel');
  const display = $('#calDisplay');
  if (!grid || !monthLabel) return;

  const today = new Date();
  const minDate = new Date(today); minDate.setDate(minDate.getDate() - 30); minDate.setHours(0,0,0,0);
  const maxDate = new Date(today); maxDate.setHours(23,59,59,999);

  const months = LANG.current === 'th' ? TH_MONTHS : EN_MONTHS;
  const days = LANG.current === 'th' ? TH_DAYS : EN_DAYS;
  const displayYear = LANG.current === 'th' ? calViewYear + 543 : calViewYear;
  monthLabel.textContent = months[calViewMonth] + ' ' + displayYear;

  grid.innerHTML = '';
  // Day headers
  days.forEach((d, i) => {
    const div = document.createElement('div');
    div.className = 'cal-day-header' + (i === 0 ? ' sun' : '') + (i === 6 ? ' sat' : '');
    div.textContent = d;
    grid.appendChild(div);
  });

  const firstDay = new Date(calViewYear, calViewMonth, 1).getDay();
  const daysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const div = document.createElement('div');
    div.className = 'cal-day';
    grid.appendChild(div);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const btn = document.createElement('button');
    btn.className = 'cal-day';
    btn.textContent = d;
    const date = new Date(calViewYear, calViewMonth, d, 12);
    const disabled = date < minDate || date > maxDate;
    const isToday = d === today.getDate() && calViewMonth === today.getMonth() && calViewYear === today.getFullYear();
    const isSelected = calPicked && d === calPicked.getDate() && calViewMonth === calPicked.getMonth() && calViewYear === calPicked.getFullYear();

    if (disabled) btn.classList.add('disabled');
    if (isToday && !isSelected) btn.classList.add('today');
    if (isSelected) btn.classList.add('selected');

    if (!disabled) {
      btn.onclick = () => {
        calPicked = new Date(calViewYear, calViewMonth, d);
        renderCalendar();
      };
    }
    grid.appendChild(btn);
  }

  // Display
  if (display) {
    if (calPicked) {
      if (LANG.current === 'th') {
        display.textContent = calPicked.getDate() + ' ' + TH_MONTHS[calPicked.getMonth()] + ' ' + (calPicked.getFullYear() + 543);
      } else {
        display.textContent = calPicked.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
      }
    } else {
      display.textContent = LANG.current === 'th' ? 'กรุณาเลือกวันที่' : 'Please select a date';
    }
  }

  const selectBtn = $('#calSelectBtn');
  if (selectBtn) selectBtn.disabled = !calPicked;
}

function calPrevMonth() {
  if (calViewMonth === 0) { calViewYear--; calViewMonth = 11; } else calViewMonth--;
  renderCalendar();
}
function calNextMonth() {
  if (calViewMonth === 11) { calViewYear++; calViewMonth = 0; } else calViewMonth++;
  renderCalendar();
}
function calGoToday() {
  const now = new Date();
  calViewYear = now.getFullYear();
  calViewMonth = now.getMonth();
  calPicked = now;
  renderCalendar();
}
function calConfirm() {
  hideDatePicker();
}

// ===== ROOM NOTE =====
function toggleRoomNote(roomId) {
  const panel = $('#roomNotePanel');
  if (!panel) return;
  if (panel.style.display === 'block') {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'block';
    const ta = panel.querySelector('textarea');
    if (ta) ta.value = roomNotes[roomId] || '';
    panel.dataset.roomId = roomId;
  }
}
function saveRoomNote() {
  const panel = $('#roomNotePanel');
  if (!panel) return;
  const ta = panel.querySelector('textarea');
  if (ta) roomNotes[panel.dataset.roomId] = ta.value;
  panel.style.display = 'none';
}

// ===== ROOM CLICK HANDLER (for building pages) =====
function initBuildingRoomClicks(editMode) {
  const building = $('#buildingPlan');
  if (!building) return;
  building.addEventListener('click', (e) => {
    const roomEl = e.target.closest('.room, .room-b');
    if (!roomEl) return;
    const roomId = roomEl.dataset.roomId || roomEl.childNodes[0]?.textContent?.trim().replace(/\s+/g, ' ') || 'Room';
    if (editMode.value && isAdmin()) {
      showEditModal(roomId);
    } else {
      showRoomInfo(roomId);
    }
  });
}

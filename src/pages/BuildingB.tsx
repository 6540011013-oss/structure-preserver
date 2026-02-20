import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Check, Settings, Building2, LayoutDashboard, Calendar, ChevronLeft, Hotel } from "lucide-react";
import EditRoomModal from "@/components/index/EditRoomModal";
import SettingsModal from "@/components/index/SettingsModal";
import ServiceStatus from "@/components/index/ServiceStatus";
import { MaintenanceCategory, DEFAULT_CATEGORIES } from "@/data/maintenanceCategories";
import { DEFAULT_ROOM_TYPES, RoomTypeItem } from "@/data/roomTypes";
import { useLanguage } from "@/contexts/LanguageContext";

/* ================================================================
   Building B – Floor Plan (React port)
   Layout / room sizes preserved exactly from original HTML/CSS
================================================================ */

export default function BuildingB() {
  const { t } = useLanguage();
  const [isAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showRoomInfoModal, setShowRoomInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] = useState<MaintenanceCategory[]>(DEFAULT_CATEGORIES);
  const [roomServices, setRoomServices] = useState<Record<string, string[]>>({});
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [roomTypes] = useState<RoomTypeItem[]>(DEFAULT_ROOM_TYPES);
  const [roomItems, setRoomItems] = useState<Array<{ id: string; roomId: string; name: string; width?: string; height?: string; note?: string; category: string; categoryIcon: string; image?: string }>>([]);
  const [activeItemCategory, setActiveItemCategory] = useState("all");
  const [itemCategories, setItemCategories] = useState([
    { id: "furniture", name: "Furniture", icon: "🛋️" },
    { id: "appliances", name: "Appliances", icon: "💡" },
    { id: "decor", name: "Decor", icon: "🖼️" },
    { id: "other", name: "Other", icon: "📦" },
  ]);
  const [showRoomNote, setShowRoomNote] = useState(false);
  const [roomNotes, setRoomNotes] = useState<Record<string, string>>({});
  const buildingRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredItems = roomItems
    .filter(i => i.roomId === selectedRoom)
    .filter(i => activeItemCategory === "all" || i.category === activeItemCategory);

  const getRoomId = (room: Element): string => {
    return room.getAttribute('data-room-id') || room.childNodes[0]?.textContent?.trim().replace(/\s+/g, ' ') || "";
  };

  // Apply grey filter to rooms when service categories are selected
  useEffect(() => {
    const buildingEl = buildingRef.current;
    if (!buildingEl) return;
    const rooms = buildingEl.querySelectorAll('.room-b');
    if (activeFilters.length === 0) {
      rooms.forEach(room => { room.classList.remove('room-greyed', 'room-highlighted'); });
      return;
    }
    const highlightedRooms = new Set<string>();
    for (const [roomId, services] of Object.entries(roomServices)) {
      if (activeFilters.some(f => services.includes(f))) highlightedRooms.add(roomId);
    }
    rooms.forEach(room => {
      const roomText = getRoomId(room);
      if (highlightedRooms.has(roomText)) {
        room.classList.remove('room-greyed');
        room.classList.add('room-highlighted');
      } else {
        room.classList.add('room-greyed');
        room.classList.remove('room-highlighted');
      }
    });
  }, [activeFilters, roomServices]);

  // Inject service icon dots into rooms
  useEffect(() => {
    const buildingEl = buildingRef.current;
    if (!buildingEl) return;
    const rooms = buildingEl.querySelectorAll('.room-b');
    buildingEl.querySelectorAll('.room-service-icons').forEach(el => el.remove());
    rooms.forEach(room => {
      const roomId = getRoomId(room);
      const services = roomServices[roomId];
      if (!services || services.length === 0) return;
      const container = document.createElement('div');
      container.className = 'room-service-icons';
      services.forEach(catId => {
        const cat = categories.find(c => c.id === catId);
        if (!cat) return;
        const dot = document.createElement('span');
        dot.className = 'room-service-dot';
        dot.style.background = cat.color;
        dot.title = cat.name;
        container.appendChild(dot);
      });
      (room as HTMLElement).style.position = 'relative';
      room.appendChild(container);
    });
  }, [roomServices, categories]);

  const openAddItemModal = useCallback(() => setShowAddItemModal(true), []);
  const closeAddItemModal = useCallback(() => setShowAddItemModal(false), []);
  const openRoom = useCallback((roomId: string) => {
    setSelectedRoom(roomId);
    setShowRoomInfoModal(true);
  }, []);
  const closeInfoModal = useCallback(() => {
    setShowRoomInfoModal(false);
    setSelectedRoom("");
  }, []);

  const goHome = () => { navigate("/"); };
  const goA = () => {
    setShowRoomInfoModal(false);
    setShowAddItemModal(false);
    navigate("/building-a");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f1f5f9", minHeight: "100vh" }}>
      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-[3000] bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-4">
            <button onClick={goHome} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors border-none bg-transparent cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs font-semibold hidden sm:inline">{t("nav.home")}</span>
            </button>
            <div className="h-6 w-px bg-slate-300" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                B
              </div>
              <div>
                <h1 className="text-sm font-extrabold text-slate-800 leading-none tracking-wide">{t("buildingB.title")}</h1>
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{t("buildingB.sub")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                if (!isAdmin) { alert("Admin only."); return; }
                setEditMode(!editMode);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all border-none cursor-pointer ${
                editMode
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <span>{editMode ? "🔓" : "🔒"}</span>
              <span className="hidden md:inline">{editMode ? t("nav.editModeOn") : t("nav.lockMode")}</span>
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-all border-none bg-transparent cursor-pointer"
            >
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.settings")}</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-all border-none bg-transparent cursor-pointer">
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.dashboard")}</span>
            </button>

            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-all border-none bg-transparent cursor-pointer">
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.date")}</span>
            </button>

            <div className="h-6 w-px bg-slate-300 mx-1" />

            <button onClick={goA} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide bg-violet-50 text-violet-600 hover:bg-violet-100 hover:text-violet-700 transition-all border-none cursor-pointer">
              <Building2 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.buildingA")}</span>
            </button>
          </div>

          <button id="adminBtn" className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wide transition-all duration-300 cursor-pointer ${
            isAdmin
              ? "bg-green-600 border-2 border-green-600 text-white hover:bg-green-700"
              : "border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
          }`}>
            {isAdmin ? <Check className="h-3.5 w-3.5" /> : <LogIn className="h-3.5 w-3.5" />}
            <span>{isAdmin ? t("btn.adminActive") : t("btn.staffLogin")}</span>
          </button>
        </div>
      </header>

      {/* ===== PLAN WRAPPER ===== */}
      <div className="plan-wrapper" style={{
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        padding: "40px 20px", gap: 32, overflowX: "auto", background: "#f1f5f9"
      }}>
        {/* Left Panel – Service Status */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm sticky top-20">
            <h4 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2 uppercase tracking-wider">{t("legend.serviceStatus")}</h4>
            <ServiceStatus
              categories={categories}
              roomServices={roomServices}
              activeFilters={activeFilters}
              onFilterChange={(catId) => setActiveFilters(prev =>
                prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
              )}
            />
          </div>
        </div>

        {/* Building B grid */}
        <div className="building-b-container" ref={buildingRef} style={{ cursor: "pointer" }} onClick={(e) => {
          const target = e.target as HTMLElement;
          const roomEl = target.closest('.room-b') as HTMLElement | null;
          if (roomEl) {
            const rid = roomEl.getAttribute('data-room-id') || roomEl.textContent?.trim() || "Room";
            setSelectedRoom(rid);
            if (editMode && isAdmin) {
              setShowEditModal(true);
            } else {
              setShowRoomInfoModal(true);
            }
          }
        }}>
          {/* Floor 25 – 7 rooms */}
          <div className="floor-row">
            {["2501","2502","2503","2504","2505","2506","2507"].map(r => (
              <div key={r} className="room-b" data-room-id={r}>{r}</div>
            ))}
          </div>
          {/* Floor 24 – 10 rooms */}
          <div className="floor-row">
            {["2401","2402","2403","2404","2405","2406","2407","2408","2409","2410"].map(r => (
              <div key={r} className="room-b" data-room-id={r}>{r}</div>
            ))}
          </div>
          {/* Floor 23 – 10 rooms */}
          <div className="floor-row">
            {["2301","2302","2303","2304","2305","2306","2307","2308","2309","2310"].map(r => (
              <div key={r} className="room-b" data-room-id={r}>{r}</div>
            ))}
          </div>
          {/* Floor 22 – 10 rooms */}
          <div className="floor-row">
            {["2201","2202","2203","2204","2205","2206","2207","2208","2209","2210"].map(r => (
              <div key={r} className="room-b" data-room-id={r}>{r}</div>
            ))}
          </div>
          {/* Floor 21 – 2 rooms */}
          <div className="floor-row">
            {["2111","2112"].map(r => (
              <div key={r} className="room-b" data-room-id={r}>{r}</div>
            ))}
          </div>
        </div>

        {/* Right Panel – Room Types */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm sticky top-20">
            <h4 className="text-sm font-bold text-gray-800 mb-2 border-b pb-1 uppercase tracking-wider">{t("legend.roomType")}</h4>
            <div className="flex flex-col gap-1.5 mt-2">
              {roomTypes.map(rt => (
                <div key={rt.id} className="flex items-center gap-2.5">
                  <span
                    className="w-5 h-5 rounded flex-shrink-0 border"
                    style={{ background: rt.color, borderColor: rt.borderColor }}
                  />
                  <span className="text-xs font-semibold text-slate-600">{rt.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Room Info Modal ===== */}
      <div id="roomInfoModal" style={{ display: showRoomInfoModal ? "flex" : "none", position: "fixed", inset: 0, alignItems: "center", justifyContent: "center", padding: 16, zIndex: 20000 }}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-0" onClick={closeInfoModal}></div>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl" style={{ maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div className="p-4 md:p-6 pb-0 bg-white">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🏠</span>
                    <h1 className="text-2xl md:text-3xl font-bold text-white m-0">{t("room.title")} {selectedRoom}</h1>
                  </div>
                  <p className="text-white text-sm opacity-90">{t("room.title")} #{selectedRoom} • {roomItems.filter(i => i.roomId === selectedRoom).length} {t("room.items")}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={(e) => { e.stopPropagation(); openAddItemModal(); }} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold cursor-pointer border-none text-sm transition-colors flex items-center gap-2 shadow-lg">
                    <span>+</span> {t("room.addItem").replace("+ ", "")}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); closeInfoModal(); }} className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-xl cursor-pointer border-none text-lg flex items-center justify-center">✕</button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white relative">
            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-4 flex-wrap">
              <button
                onClick={() => setActiveItemCategory("all")}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border-none cursor-pointer transition-all ${
                  activeItemCategory === "all" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >{t("room.all")}</button>
              {itemCategories.map(cat => (
                <div key={cat.id} className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveItemCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border-none cursor-pointer transition-all ${
                      activeItemCategory === cat.id ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >{cat.icon} {cat.name}</button>
                  {isAdmin && (
                    <button
                      onClick={() => setItemCategories(prev => prev.filter(c => c.id !== cat.id))}
                      className="text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer text-sm font-bold"
                    >✕</button>
                  )}
                </div>
              ))}
              {isAdmin && (
                <button
                  onClick={() => {
                    const name = prompt("Category name:");
                    if (name) {
                      const icon = prompt("Emoji icon:", "📦") || "📦";
                      setItemCategories(prev => [...prev, { id: name.toLowerCase().replace(/\s+/g, '-'), name, icon }]);
                    }
                  }}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold border-2 border-dashed border-emerald-400 text-emerald-600 bg-transparent cursor-pointer hover:bg-emerald-50 transition-all"
                >{t("room.addCategory")}</button>
              )}
            </div>

            {/* Items Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
                {filteredItems.map(item => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
                    {item.image && (
                      <div className="h-32 bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                      {item.width && item.height && (
                        <p className="text-xs text-gray-400 mt-1">{item.width} × {item.height} cm</p>
                      )}
                      {item.note && <p className="text-xs text-gray-500 mt-1">{item.note}</p>}
                      <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-semibold">{item.categoryIcon} {item.category}</span>
                    </div>
                    {isAdmin && (
                      <div className="px-4 pb-3 flex justify-end">
                        <button onClick={() => setRoomItems(prev => prev.filter(i => i.id !== item.id))} className="text-xs text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer">{t("room.delete")}</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-slate-700 text-xl font-semibold mb-2">{t("room.noItems")}</h3>
                <p className="text-slate-500 mb-6">{t("room.noItemsSub")}</p>
                <button onClick={(e) => { e.stopPropagation(); openAddItemModal(); }} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 cursor-pointer border-none transition-colors shadow-lg">
                  {t("room.addFirstItem")}
                </button>
              </div>
            )}

            {/* Room Note Pin */}
            <button
              onClick={() => setShowRoomNote(!showRoomNote)}
              className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition cursor-pointer border-none text-base font-bold shadow-md z-20"
              title={t("room.note")}
            >📌</button>

            {showRoomNote && (
              <div className="absolute bottom-16 right-4 w-80 max-w-[calc(100%-2rem)] rounded-xl border border-slate-200 bg-white p-4 shadow-xl z-30">
                <div className="text-sm font-semibold text-slate-700 mb-2">{t("room.note")}</div>
                <textarea
                  value={roomNotes[selectedRoom] || ""}
                  onChange={(e) => setRoomNotes(prev => ({ ...prev, [selectedRoom]: e.target.value }))}
                  rows={4}
                  placeholder="จดได้ทุกอย่าง เช่น ความกว้างห้อง, ตำแหน่งเตียง, จุดสังเกตพิเศษ ฯลฯ"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition bg-white text-sm"
                />
                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => setShowRoomNote(false)} className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-300 transition cursor-pointer border-none">Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Add Item Modal ===== */}
      <div id="addItemModal" style={{ display: showAddItemModal ? "flex" : "none", position: "fixed", inset: 0, alignItems: "center", justifyContent: "center", padding: 16, zIndex: 21000 }}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-0" onClick={closeAddItemModal}></div>
        <div className="bg-white rounded-3xl w-full max-w-[480px] overflow-hidden shadow-2xl relative z-[1]">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white m-0">{t("addItem.title")}</h2>
            <button onClick={(e) => { e.stopPropagation(); closeAddItemModal(); }} className="bg-white/20 hover:bg-white/30 text-white w-9 h-9 rounded-lg cursor-pointer border-none text-lg flex items-center justify-center relative z-[2]">✕</button>
          </div>
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.image")}</label>
                <div className="image-preview relative w-full h-40 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 cursor-pointer">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">📷</span>
                    <span className="text-slate-500 text-sm">{t("addItem.dragHint")}</span>
                    <button type="button" className="mt-3 px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition border-none cursor-pointer">{t("addItem.chooseImage")}</button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.name")} <span className="text-red-500">*</span></label>
                <input type="text" id="b-item-name-input" placeholder="e.g., Bed" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.width")}</label>
                  <input type="text" id="b-item-width-input" placeholder="55" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.length")}</label>
                  <input type="text" id="b-item-height-input" placeholder="55" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.note")}</label>
                <textarea id="b-item-note-input" rows={3} placeholder="เช่น ห้องกว้าง 4 เมตร, หัวเตียงชิดผนังด้านซ้าย" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.category")}</label>
                <select id="b-item-category-input" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition bg-white">
                  <option value="เฟอร์นิเจอร์">🛋️ {t("cat.furniture")}</option>
                  <option value="เครื่องใช้ไฟฟ้า">💡 {t("cat.appliances")}</option>
                  <option value="ของตกแต่ง">🖼️ {t("cat.decor")}</option>
                  <option value="อื่นๆ">📦 {t("cat.other")}</option>
                </select>
              </div>
            </div>

            <button onClick={() => {
              const nameEl = document.getElementById("b-item-name-input") as HTMLInputElement;
              const widthEl = document.getElementById("b-item-width-input") as HTMLInputElement;
              const heightEl = document.getElementById("b-item-height-input") as HTMLInputElement;
              const noteEl = document.getElementById("b-item-note-input") as HTMLTextAreaElement;
              const catEl = document.getElementById("b-item-category-input") as HTMLSelectElement;
              const name = nameEl?.value?.trim();
              if (!name) { alert("Please enter item name"); return; }
              const catValue = catEl?.value || "อื่นๆ";
              const catMap: Record<string, { name: string; icon: string }> = {
                "เฟอร์นิเจอร์": { name: "Furniture", icon: "🛋️" },
                "เครื่องใช้ไฟฟ้า": { name: "Appliances", icon: "💡" },
                "ของตกแต่ง": { name: "Decor", icon: "🖼️" },
                "อื่นๆ": { name: "Other", icon: "📦" },
              };
              const matched = catMap[catValue] || { name: catValue, icon: "📦" };
              const matchedCat = itemCategories.find(c => c.name === matched.name);
              setRoomItems(prev => [...prev, {
                id: Date.now().toString(),
                roomId: selectedRoom,
                name,
                width: widthEl?.value || undefined,
                height: heightEl?.value || undefined,
                note: noteEl?.value || undefined,
                category: matchedCat?.id || "other",
                categoryIcon: matched.icon,
              }]);
              if (nameEl) nameEl.value = "";
              if (widthEl) widthEl.value = "";
              if (heightEl) heightEl.value = "";
              if (noteEl) noteEl.value = "";
              closeAddItemModal();
            }} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg mt-6 cursor-pointer border-none transition-colors">
              {t("addItem.save")}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Room Modal */}
      {showEditModal && selectedRoom && (
        <EditRoomModal
          roomId={selectedRoom}
          onClose={() => { setShowEditModal(false); setSelectedRoom(""); }}
          categories={categories}
          activeServices={roomServices[selectedRoom] || []}
          onSave={(data) => {
            console.log("Save room:", selectedRoom, data);
            setRoomServices(prev => ({ ...prev, [selectedRoom]: data.services }));
            setShowEditModal(false);
            setSelectedRoom("");
          }}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          categories={categories}
          onCategoriesChange={setCategories}
        />
      )}
    </div>
  );
}

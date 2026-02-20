import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Check, Settings, Building2, LayoutDashboard, Calendar, ChevronLeft, Hotel } from "lucide-react";
import EditRoomModal from "@/components/index/EditRoomModal";
import SettingsModal from "@/components/index/SettingsModal";
import ServiceStatus from "@/components/index/ServiceStatus";
import DatePickerModal from "@/components/index/DatePickerModal";
import { MaintenanceCategory, DEFAULT_CATEGORIES } from "@/data/maintenanceCategories";
import { DEFAULT_ROOM_TYPES, RoomTypeItem } from "@/data/roomTypes";
import { useLanguage } from "@/contexts/LanguageContext";

/* ================================================================
   Building A – Floor Plan (React port)
   Layout / room sizes preserved exactly from original HTML/CSS
================================================================ */

export default function BuildingA() {
  const { t } = useLanguage();
  const [isAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showRoomInfoModal, setShowRoomInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [editMode, setEditMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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

  // Helper: extract room ID from a room element
  const getRoomId = (room: Element): string => {
    return room.childNodes[0]?.textContent?.trim().replace(/\s+/g, ' ') || "";
  };

  // Apply grey filter to rooms when service categories are selected
  useEffect(() => {
    const buildingEl = buildingRef.current;
    if (!buildingEl) return;

    const rooms = buildingEl.querySelectorAll('.room');

    if (activeFilters.length === 0) {
      rooms.forEach(room => {
        room.classList.remove('room-greyed', 'room-highlighted');
      });
      return;
    }

    const highlightedRooms = new Set<string>();
    for (const [roomId, services] of Object.entries(roomServices)) {
      if (activeFilters.some(f => services.includes(f))) {
        highlightedRooms.add(roomId);
      }
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

    const rooms = buildingEl.querySelectorAll('.room');

    // Clean up old icons
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

      // Ensure room is positioned for absolute child
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
  const goB = () => {
    setShowRoomInfoModal(false);
    setShowAddItemModal(false);
    navigate("/building-b");
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f1f5f9", minHeight: "100vh" }}>
      {/* ===== NAVBAR (Light theme matching Index) ===== */}
      <header className="sticky top-0 z-[3000] bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between px-5 py-3">
          {/* Left: Back + Building name */}
          <div className="flex items-center gap-4">
            <button onClick={goHome} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors border-none bg-transparent cursor-pointer">
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs font-semibold hidden sm:inline">{t("nav.home")}</span>
            </button>
            <div className="h-6 w-px bg-slate-300" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                A
              </div>
              <div>
                <h1 className="text-sm font-extrabold text-slate-800 leading-none tracking-wide">{t("buildingA.title")}</h1>
                <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{t("buildingA.sub")}</span>
              </div>
            </div>
          </div>

          {/* Center: Nav actions */}
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

            <button onClick={() => setShowDatePicker(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-all border-none bg-transparent cursor-pointer">
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.date")}</span>
            </button>

            <div className="h-6 w-px bg-slate-300 mx-1" />

            <button onClick={goB} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-all border-none cursor-pointer">
              <Building2 className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{t("nav.buildingB")}</span>
            </button>
          </div>

          {/* Right: Auth */}
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
      <div className="plan-wrapper">
        <div className="building-plan" style={{ position: "relative" }}>

          {/* Legend panels */}
          <div id="Acontent">
            <div className="legend-block main-legend">
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

          <div className="legend-block left-info-panel">
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

          {/* ===== BUILDING STRUCTURE (exact dimensions preserved) ===== */}
          <div className="two-line">
            <div className="floor-section">
              <div className="building" ref={buildingRef} onClick={(e) => {
                const target = e.target as HTMLElement;
                const roomEl = target.closest('.room') as HTMLElement | null;
                if (roomEl) {
                  const firstText = roomEl.childNodes[0]?.textContent?.trim() || "Room";
                  const text = firstText.replace(/\s+/g, ' ');
                  setSelectedRoom(text);
                  if (editMode && isAdmin) {
                    setShowEditModal(true);
                  } else {
                    setShowRoomInfoModal(true);
                  }
                }
              }} style={{ cursor: "pointer" }}>

                {/* Floor 21 (small 770px) */}
                <div className="floor small">
                  <div className="room type-condo half flex items-center justify-center relative">2101 Floor 2</div>
                  <div className="room type-condo half flex items-center justify-center relative">2102 Floor 2</div>
                </div>

                <div className="floor small">
                  <div className="room type-condo half flex items-center justify-center relative">
                    2101 Floor 1<br /><span className="guest-label">Mrs.Mizuki</span>
                  </div>
                  <div className="room type-condo half flex items-center justify-center relative">
                    2102 Floor 1<br /><span className="guest-label">Dr.Gerhard</span>
                  </div>
                </div>

                {/* Floor 20 large */}
                <div className="floor large">
                  <div className="room type-condo w-full h-full flex items-center justify-center relative">
                    2001–2008 <br /><span className="guest-label">Mr.Moravekar</span>
                  </div>
                </div>

                {/* Floor 19 */}
                <div className="floor floor19">
                  <div className="r1 room type-condo">1901 <br />Mr.Moravekar</div>
                  <div className="r2 room type-sus">1902 <br />Mr.Moravekar</div>
                  <div className="r3 room type-dls">1903 <br />Mr.Moravekar</div>
                  <div className="r4 room type-condo">1905 <br />Mr.Moravekar</div>
                </div>

                {/* Floor 18 */}
                <div className="floor level18">
                  <div className="r1 room type-condo">1801</div>
                  <div className="r2 room type-dls">1805</div>
                  <div className="r3 room type-sus">1806</div>
                  <div className="r4 room type-dls">1807</div>
                  <div className="r5 room type-dls">1808</div>
                  <div className="r6 room type-sus">1809</div>
                  <div className="r7 room type-dls">1810</div>
                  <div className="r8 room type-condo">1804</div>
                </div>

                {/* Floor 17 */}
                <div className="floor level17">
                  <div className="r1 room type-condo">1701-02</div>
                  <div className="r2 room type-sus">1703</div>
                  <div className="r3 room type-dls">1704</div>
                  <div className="r4 room type-dls">1705</div>
                  <div className="r5 room type-dls">1706</div>
                  <div className="r6 room type-dls">1707</div>
                  <div className="r7 room type-sus">1708</div>
                  <div className="r8 room type-condo">1709</div>
                </div>

                {/* Floor 16 */}
                <div className="floor level16">
                  <div className="r1 room type-lux">1601–1602<br />LUX</div>
                  <div className="r2 room type-condo">1603<br />SUS</div>
                  <div className="r3 room type-sus">1604<br />SUS</div>
                  <div className="r4 room type-dls">1605<br />DLS</div>
                  <div className="r5 room type-dls">1607<br />DLS</div>
                  <div className="r6 room type-dls">1608<br />DLS</div>
                  <div className="r7 room type-dls">1609<br />DLS</div>
                  <div className="r8 room type-sus">1610<br />SUS</div>
                  <div className="r9 room type-condo">1606<br />SUS</div>
                  <div className="r10 room type-lux">1611–1612<br />ROY</div>
                </div>

                {/* Floor 15 */}
                <div className="floor level15">
                  <div className="r1 room type-condo">1501–1502<br />BYD</div>
                  <div className="r2 room type-condo">1503<br />BYD</div>
                  <div className="r3 room type-sus">1504<br />SUS</div>
                  <div className="r4 room type-dls">1505<br />DLS</div>
                  <div className="r5 room type-dls">1506<br />DLS</div>
                  <div className="r6 room type-dls">1507<br />DLS</div>
                  <div className="r7 room type-dls">1508<br />DLS</div>
                  <div className="r8 room type-sus">1509<br />SUS</div>
                  <div className="r9 room type-condo">1510<br />SUS</div>
                  <div className="r10 room type-condo">1511–1512<br />SUS</div>
                </div>

                {/* Floor 14 */}
                <div className="floor level14">
                  <div className="r1 room type-condo">1401–1402</div>
                  <div className="r2 room type-condo">1403</div>
                  <div className="r3 room type-sdl">1404<br />SDL</div>
                  <div className="r4 room type-sdl">1405<br />SDL</div>
                  <div className="r5 room type-sdl">1406<br />SDL</div>
                  <div className="r6 room type-sdl">1410<br />SDL</div>
                  <div className="r7 room type-condo">1407</div>
                  <div className="r10 room type-condo">1408–1409</div>
                </div>

                {/* Floor 12 */}
                <div className="floor level12">
                  <div className="r1 room type-condo">1201-02<br /><span className="guest-label">Mrs.Maillard</span></div>
                  <div className="r2 room type-condo">1203<br /><span className="guest-label">K.Sunan</span></div>
                  <div className="r3 room type-condo">1204<br /><span className="guest-label">Mr.&Mrs.Gazonnaud</span></div>
                  <div className="r4 room type-dls">1205<br />DLS New</div>
                  <div className="r5 room type-dls">1210<br />DLS New</div>
                  <div className="r6 room type-condo">1206<br /><span className="guest-label">Mr.Keller</span></div>
                  <div className="r7 room type-condo">1207<br /><span className="guest-label">Mr.Sonerud</span></div>
                  <div className="r10 room type-condo">1208-09<br /><span className="guest-label">Mrs.Marti</span></div>
                </div>

                {/* Floor 11 */}
                <div className="floor level11">
                  <div className="r1 room type-condo">1101-02<br /><span className="guest-label">K.Bernd</span></div>
                  <div className="r2 room type-sdl" data-room-id="1103-1104" style={{ width: 200 }}>1103 - 1104<br />SDL</div>
                  <div className="r4 room type-sus">1105<br />SUS</div>
                  <div className="r5 room type-dls">1106<br />DLS</div>
                  <div className="r6 room type-dls">1108<br />DLS</div>
                  <div className="r7 room type-dls">1109<br />DLS</div>
                  <div className="r8 room type-condo">1110-11<br /><span className="guest-label">K.Tom, K.สุดใจ</span></div>
                  <div className="r9 room type-condo">1107<br /><span className="guest-label">K.Tom</span></div>
                  <div className="r10 room type-condo">1112-14<br /><span className="guest-label">K.Tom</span></div>
                </div>

                {/* Floor 10 */}
                <div className="floor level10">
                  <div className="r1 room type-condo">1001-02<br /><span className="guest-label">K.Odd</span></div>
                  <div className="r2 room type-condo">1003<br /><span className="guest-label">K.Regis</span></div>
                  <div className="r3 room type-sus">1004<br />SUS</div>
                  <div className="r4 room type-dls">1005<br />DLS</div>
                  <div className="r5 room type-dls">1006<br />DLS</div>
                  <div className="r6 room type-dls">1010<br />DLS</div>
                  <div className="r7 room type-condo">1011-12<br /><span className="guest-label">K.Alex</span></div>
                  <div className="r8 room type-condo">1007<br /><span className="guest-label">K.Alex</span></div>
                  <div className="r9 room type-condo">1008-09<br /><span className="guest-label">K.Alex</span></div>
                </div>

                {/* Floor 9 */}
                <div className="floor level9">
                  <div className="r1 room type-condo">901-02<br /><span className="guest-label">K.Bernd</span></div>
                  <div className="r2 room type-condo">903<br /><span className="guest-label">K.Sunan</span></div>
                  <div className="r3 room type-sus">904<br />SUS</div>
                  <div className="r4 room type-dls">905<br />DLS</div>
                  <div className="r5 room type-dls">906<br />DLS</div>
                  <div className="r6 room type-dls">907<br />DLS</div>
                  <div className="r7 room type-dls" data-room-id="908-909" style={{ width: 200 }}>908 - 909</div>
                  <div className="r9 room type-dls">910<br />DLS</div>
                  <div className="r10 room type-sdl">911<br />SDL</div>
                  <div className="r11 room type-condo">912<br /><span className="guest-label">K.Marcus</span></div>
                </div>

                {/* Floor 8 */}
                <div className="floor level8">
                  <div className="r1 room type-fam">801 802<br />FAM</div>
                  <div className="r2 room type-condo">803<br /><span className="guest-label">Mr.&Mrs.Stammer</span></div>
                  <div className="r3 room type-sps">804<br />SPS</div>
                  <div className="r4 room type-sps">805<br />SPS</div>
                  <div className="r5 room type-sps">806<br />SPS</div>
                  <div className="r6 room type-sps">807<br />SPS</div>
                  <div className="r7 room type-sps">808<br />DLS</div>
                  <div className="r8 room type-sps">809<br />SPS</div>
                  <div className="r9 room type-sps">810<br />SPS</div>
                  <div className="r10 room type-sdl">811<br />SDL</div>
                  <div className="r11 room type-condo">812-14<br /><span className="guest-label">K.Eddy</span></div>
                </div>

                {/* Floor 7 */}
                <div className="floor level7">
                  <div className="r1 room type-fam">701 702<br />FAM</div>
                  <div className="r2 room type-condo">703<br /><span className="guest-label">K.Marc</span></div>
                  <div className="r3 room type-condo">704<br /><span className="guest-label">Mr.Lim</span></div>
                  <div className="r4 room type-sps">705<br />SPS</div>
                  <div className="r5 room type-condo">706<br /><span className="guest-label">K.Peter</span></div>
                  <div className="r6 room type-sps">707<br />SPS</div>
                  <div className="r7 room type-condo">708<br /><span className="guest-label">Mr.Terbuyken</span></div>
                  <div className="r8 room type-sps">709<br />SPS</div>
                  <div className="r9 room type-sps">710<br />SPS</div>
                  <div className="r10 room type-condo">711<br /><span className="guest-label">K.Bernard</span></div>
                  <div className="r11 room type-condo">712<br /><span className="guest-label">Mr.Kemenade</span></div>
                  <div className="r12 room type-fam">714 715<br />FAM</div>
                </div>

                {/* Floor 6 */}
                <div className="floor level6">
                  <div className="r1 room type-fam">601 602<br />FAM</div>
                  <div className="r2 room type-condo">603<br /><span className="guest-label">Mr.Taret</span></div>
                  <div className="r3 room type-sps">604<br />SPS</div>
                  <div className="r4 room type-sps">605<br />SPS</div>
                  <div className="r5 room type-sps">606<br />SPS</div>
                  <div className="r6 room type-sps">607<br />SPS</div>
                  <div className="r7 room type-condo">608<br /><span className="guest-label">BYD (K.Hans)</span></div>
                  <div className="r8 room type-sps">609<br />SPS</div>
                  <div className="r9 room type-sps">610<br />SPS</div>
                  <div className="r10 room type-sps">611<br />SPS</div>
                  <div className="r11 room type-sdl">612<br />SDL</div>
                  <div className="r12 room type-fam">614 615<br />FAM</div>
                </div>

                {/* Floor 5 */}
                <div className="floor level5">
                  <div className="r1 room type-fam">501 502<br />FAM</div>
                  <div className="r2 room type-sdl">503<br />SDL</div>
                  <div className="r3 room type-sps">504<br />SPS</div>
                  <div className="r4 room type-sps">505<br />SPS</div>
                  <div className="r5 room type-sps">506<br />SPS</div>
                  <div className="r6 room type-sps">507<br />SPS</div>
                  <div className="r7 room type-sps">508<br />SPS</div>
                  <div className="r8 room type-sps">509<br />SPS</div>
                  <div className="r9 room type-sps">510<br />SPS</div>
                  <div className="r10 room type-sps">511<br />SPS</div>
                  <div className="r11 room type-condo">512<br /><span className="guest-label">Mr.John Ove</span></div>
                  <div className="r12 room type-fam">514 515<br />FAM</div>
                </div>

                {/* Floor 4 */}
                <div className="floor level4">
                  <div className="r1 room type-condo">401-02<br />BAM</div>
                  <div className="r2 room type-sps">403<br />SPS</div>
                  <div className="r3 room type-sps">404<br />SPS</div>
                  <div className="r4 room type-sps">405<br />SPS</div>
                  <div className="r5 room type-sps">406<br />SPS</div>
                  <div className="r6 room type-sps">407<br />SPS</div>
                  <div className="r7 room type-sps">408<br />SPS</div>
                  <div className="r8 room type-sps">409<br />SPS</div>
                  <div className="r9 room type-sps">410<br />SPS</div>
                  <div className="r10 room type-sps">411<br />SPS</div>
                  <div className="r11 room type-sps">412<br /><span className="guest-label">Mr.John Ove</span></div>
                  <div className="r12 room type-fam">414 415<br />FAM</div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ===== MODALS ===== */}
      {/* Edit Modal */}
      <div id="roomEditModal" className="modal-overlay hidden" style={{ position: "fixed", inset: 0, zIndex: 50 }}>
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-6 py-4 flex items-center justify-between bg-gradient-to-br from-orange-500 to-orange-600">
            <h2 id="modalRoomNumber" className="text-xl font-bold text-white tracking-wide">Edit Room 0000</h2>
            <button id="closeIcon" className="p-1 rounded-lg text-white hover:bg-white/20 transition-colors">✕</button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">👤 Guest Name</label>
                  <input type="text" id="editGuestName" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-700 outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🛏️ Room Type</label>
                  <input type="hidden" id="editRoomType" value="" />
                  <div id="roomTypeSelect" className="room-type-select">
                    <button type="button" id="roomTypeSelectBtn" className="room-type-select__btn">
                      <span id="roomTypeSelectColor" className="room-type-select__color"></span>
                      <span id="roomTypeSelectLabel">Select Room Type</span>
                      <span className="room-type-select__chev">▾</span>
                    </button>
                    <div id="roomTypeSelectList" className="room-type-select__list hidden"></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">🛠️ Maintenance Category</label>
                  <select id="editMaintStatus" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-700 bg-white outline-none">
                    <option value="">(None)</option>
                    <option value="wifi">📶 WiFi Install / Network Repair</option>
                    <option value="air">❄️ Aircon Cleaning / Repair</option>
                    <option value="clean">🧹 Housekeeping</option>
                    <option value="fix">🔧 General Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Maintenance Note</label>
                  <textarea id="maintNote" rows={3} placeholder="e.g., install date / assigned staff / details" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-700 bg-white outline-none" />
                  <p className="text-xs text-gray-400 mt-1">This note appears when hovering the maintenance icon.</p>
                </div>
                <div id="resolve-maint-container" className="hidden">
                  <button type="button" id="btn-resolve-maint" className="w-full py-2.5 rounded-lg bg-green-500 text-white font-bold cursor-pointer border-none text-sm">✓ Mark as Resolved</button>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <label className="block text-sm font-semibold text-blue-500 mb-2">📡 Access Point (AP)</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input type="checkbox" id="hasAP" className="w-4 h-4 cursor-pointer accent-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">AP Installed</span>
                  </div>
                  <div id="apDateGroup" className="hidden pl-6">
                    <label className="block text-xs text-gray-400 mb-1">Install Date</label>
                    <input type="date" id="apInstallDate" className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
            <button id="closeModal" className="px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 font-semibold cursor-pointer text-sm">Cancel</button>
            <button id="saveRoomInfo" className="px-5 py-2.5 rounded-lg bg-green-500 text-white font-bold cursor-pointer border-none text-sm shadow-lg shadow-green-500/30">Save Changes</button>
          </div>
        </div>
      </div>

      {/* Room Info Modal */}
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
              /* Empty State */
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

            {/* Room Note Panel */}
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

      {/* Add Item Modal */}
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
                <div id="image-dropzone" className="image-preview relative w-full h-40 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 cursor-pointer">
                  <div id="image-placeholder" className="text-center">
                    <span className="text-4xl mb-2 block">📷</span>
                    <span className="text-slate-500 text-sm">{t("addItem.dragHint")}</span>
                    <button type="button" id="image-pick-btn" className="mt-3 px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition border-none cursor-pointer">{t("addItem.chooseImage")}</button>
                  </div>
                  <img id="preview-img" className="hidden absolute inset-0 w-full h-full object-cover" alt="Preview" />
                  <input type="file" id="item-image-file" accept="image/*" className="hidden" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.name")} <span className="text-red-500">*</span></label>
                <input type="text" id="item-name-input" placeholder="e.g., Bed" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.width")}</label>
                  <input type="text" id="item-width-input" placeholder="55" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.length")}</label>
                  <input type="text" id="item-height-input" placeholder="55" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.note")}</label>
                <textarea id="item-note-input" rows={3} placeholder="เช่น ห้องกว้าง 4 เมตร, หัวเตียงชิดผนังด้านซ้าย" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{t("addItem.category")}</label>
                <select id="item-category-input" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition bg-white">
                  <option value="เฟอร์นิเจอร์">🛋️ {t("cat.furniture")}</option>
                  <option value="เครื่องใช้ไฟฟ้า">💡 {t("cat.appliances")}</option>
                  <option value="ของตกแต่ง">🖼️ {t("cat.decor")}</option>
                  <option value="อื่นๆ">📦 {t("cat.other")}</option>
                </select>
              </div>
            </div>

            <button onClick={() => {
              const nameEl = document.getElementById("item-name-input") as HTMLInputElement;
              const widthEl = document.getElementById("item-width-input") as HTMLInputElement;
              const heightEl = document.getElementById("item-height-input") as HTMLInputElement;
              const noteEl = document.getElementById("item-note-input") as HTMLTextAreaElement;
              const catEl = document.getElementById("item-category-input") as HTMLSelectElement;
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

      {/* Admin settings modal */}
      <div id="admin-modal-canva" className="hidden fixed inset-0 z-[9999]">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" id="modal-backdrop-canva"></div>
        <div className="absolute inset-4 md:inset-10 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-[slideIn_0.3s_ease_forwards]">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-2xl">⚙️</div>
              <div>
                <h2 className="text-xl font-bold text-white m-0">Admin Panel</h2>
                <p className="text-violet-200 text-sm m-0">Manage room types and maintenance categories (saved)</p>
              </div>
            </div>
            <button id="close-modal-canva" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white text-xl border-none cursor-pointer">×</button>
          </div>
          <div className="flex-1 overflow-auto p-6 bg-slate-50">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">📝 Add New Room Type</h3>
                <form id="room-type-form" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Type Name</label>
                    <input type="text" id="room-type-name" placeholder="e.g., Executive Suite" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type Color</label>
                    <div className="flex gap-2">
                      <input type="color" id="room-type-color" defaultValue="#c4b5fd" className="w-12 h-10 rounded cursor-pointer border border-gray-300" />
                      <input type="text" id="room-type-color-text" defaultValue="#c4b5fd" className="flex-1 px-4 py-2 border border-gray-200 rounded-xl uppercase" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold shadow hover:shadow-lg transition-all border-none cursor-pointer">Save</button>
                </form>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-3 border-b pb-2">Existing Room Types</h4>
                  <div className="space-y-2 h-64 overflow-y-auto pr-2" id="room-types-list"></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">🔧 Add Maintenance Category</h3>
                <form id="maintenance-form" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                    <input type="text" id="maintenance-name" placeholder="e.g., Electrical System" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Icon</label>
                    <div className="grid grid-cols-6 gap-2" id="icon-selector">
                      {["📶","❄️","🧹","🔧","⚡","💡","💧","🚿","🛏️","🧯","🔑","🛁"].map(icon => (
                        <button key={icon} type="button" className="icon-btn w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:bg-violet-50 cursor-pointer text-xl" data-icon={icon}>{icon}</button>
                      ))}
                    </div>
                    <input type="hidden" id="selected-icon" defaultValue="📶" />
                  </div>
                  <button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold shadow hover:shadow-lg transition-all border-none cursor-pointer">Add Category</button>
                </form>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-600 mb-3 border-b pb-2">Existing Categories</h4>
                  <div className="space-y-2 h-64 overflow-y-auto pr-2" id="maintenance-list"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div id="toast-canva" className="hidden fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-lg z-[10000]">
        <span id="toast-message-canva">Saved successfully!</span>
      </div>

      {/* Login modal */}
      <div id="adminModal" className="modal-overlay hidden">
        <div className="modal-box bg-white p-8 rounded-2xl shadow-2xl w-[360px] text-center">
          <div className="mb-6">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              🔒
            </div>
            <h2 className="text-xl font-bold text-slate-800">Staff Login</h2>
            <p className="text-sm text-slate-500 mt-1">Please enter passcode to access</p>
          </div>
          <input type="password" id="adminPassword" placeholder="Passcode (1234)" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl mb-5 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-center text-lg tracking-widest transition-all" />
          <div className="flex gap-3">
            <button id="loginCancel" className="flex-1 bg-white border border-slate-200 text-slate-600 px-4 py-3 rounded-xl hover:bg-slate-50 font-semibold transition-colors cursor-pointer">Cancel</button>
            <button id="loginConfirm" className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95 cursor-pointer border-none">Confirm</button>
          </div>
        </div>
      </div>

      {/* Dashboard modal */}
      <div id="dashboardModal" className="dashboard-modal hidden">
        <div className="dashboard-modal__panel">
          <div className="dashboard-modal__header">
            <div>
              <h3 className="dashboard-modal__title">Summary (Building A)</h3>
              <p className="dashboard-modal__subtitle">Maintenance categories and room types with print support</p>
            </div>
            <div className="dashboard-modal__actions">
              <button id="dashboardPrint" className="dashboard-btn dashboard-btn--primary" aria-label="Print report">🖨️</button>
              <button id="dashboardClose" className="dashboard-btn">Close</button>
            </div>
          </div>
          <div id="dashboardContent" className="dashboard-modal__content">
            <div className="dashboard-analytics">
              <div id="dynamicSummaryRow" className="dashboard-summary-row"></div>
              <div className="dashboard-grid mt-6">
                <div className="dashboard-analytic-card">
                  <div className="dashboard-card__header">Room Occupancy</div>
                  <div className="dashboard-chart-wrap"><canvas id="occupancyChart" className="dashboard-chart"></canvas></div>
                </div>
                <div className="dashboard-analytic-card">
                  <div className="dashboard-card__header">Maintenance Issues</div>
                  <div className="dashboard-chart-wrap"><canvas id="maintenanceChart" className="dashboard-chart"></canvas></div>
                </div>
                <div className="dashboard-analytic-card dashboard-analytic-card--wide">
                  <div className="dashboard-card__header">Room Type Summary</div>
                  <div id="roomTypeSummary" className="dashboard-table-wrap"></div>
                </div>
              </div>
            </div>
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

      {/* Date Picker Modal */}
      <DatePickerModal
        open={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(date) => { setSelectedDate(date); setShowDatePicker(false); }}
        selectedDate={selectedDate}
      />

      {/* JS helper */}
      <script dangerouslySetInnerHTML={{ __html: `
        function toggleAPDate() {
          var hasAP = document.getElementById('hasAP');
          var dateInput = document.getElementById('apDateGroup');
          if (!hasAP || !dateInput) return;
          if (hasAP.checked) dateInput.classList.remove('hidden'); else dateInput.classList.add('hidden');
        }
      `}} />
    </div>
  );
}

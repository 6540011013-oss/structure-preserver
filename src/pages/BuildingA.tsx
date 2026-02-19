import { useState, useCallback } from "react";

/* ================================================================
   Building A – Floor Plan (React port)
   Layout / room sizes preserved exactly from original HTML/CSS
================================================================ */

export default function BuildingA() {
  const [isAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showRoomInfoModal, setShowRoomInfoModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");

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

  const goHome = () => { window.location.href = "/"; };
  const goB = () => { window.location.href = "/building-b"; };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "hsl(220 22% 96%)", minHeight: "100vh" }}>
      {/* ===== NAVBAR ===== */}
      <header className="hotel-navbar">
        <div className="nav-left">
          <button onClick={goHome} className="back-link" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
            ← Back to Home
          </button>
          <div style={{ width: 1, height: 24, background: "hsla(40,85%,45%,0.25)" }} />
          <div className="nav-title">
            <h1>Building A – ABSH</h1>
            <span>Andaman Beach Suites Hotel</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Edit mode */}
          <button className="edit-mode-base" id="edit-mode-btn">
            <span id="edit-icon"></span>
            <span id="edit-mode-text" style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}>LOCK MODE</span>
          </button>

          {/* Admin settings */}
          <button id="admin-btn-canva" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 8,
            background: "linear-gradient(135deg, hsl(255,55%,45%), hsl(280,60%,55%))",
            color: "#fff", border: "none", cursor: "pointer",
            fontSize: 11, fontWeight: 900, letterSpacing: "0.04em", textTransform: "uppercase"
          }}>
            ⚙️ SYSTEM SETTINGS
          </button>

          {/* Go to Building B */}
          <button onClick={goB} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 8,
            background: "linear-gradient(135deg, hsl(340,70%,45%), hsl(15,80%,55%))",
            color: "#fff", border: "none", cursor: "pointer",
            fontSize: 11, fontWeight: 900, letterSpacing: "0.04em", textTransform: "uppercase"
          }}>
            🏢 BUILDING B
          </button>

          {/* Staff login */}
          <button id="adminBtn" style={{
            display: "flex", alignItems: "center", gap: 8, padding: "8px 18px",
            borderRadius: 8, border: isAdmin ? "1.5px solid #22c55e" : "1.5px solid hsl(42,90%,68%)",
            background: isAdmin ? "rgba(34,197,94,0.1)" : "transparent",
            color: isAdmin ? "#22c55e" : "hsl(42,90%,68%)",
            fontSize: 11, fontWeight: 900, letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer"
          }}>
            <span id="btnText">{isAdmin ? "✓ ADMIN ACTIVE" : "STAFF LOGIN"}</span>
          </button>

          <button className="dashboard-fab dashboard-fab-inline" id="dashboardBtn">Dashboard</button>
          <button id="open-date-picker-btn" className="date-picker-btn" title="Select Date">📅</button>
        </div>
      </header>

      {/* ===== PLAN WRAPPER ===== */}
      <div className="plan-wrapper">
        <div className="building-plan" style={{ position: "relative" }}>

          {/* Legend panels (positioned via CSS) */}
          <div id="Acontent">
            <div className="legend-block main-legend">
              <h4 className="text-sm font-bold mb-2 border-b pb-1" style={{ color: "hsl(42,90%,68%)", fontFamily: "'Playfair Display',serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Room Types</h4>
              <div id="room-type-legend" className="legend-grid"></div>
            </div>
          </div>

          <div className="legend-block left-info-panel">
            <h4 style={{ color: "hsl(42,90%,68%)", fontFamily: "'Playfair Display',serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, borderBottom: "1px solid hsla(40,85%,45%,0.2)", paddingBottom: 6 }}>Service Status</h4>
            <div id="service-sidebar-list" style={{ display: "flex", flexDirection: "column", gap: 8 }}></div>
          </div>

          {/* ===== BUILDING STRUCTURE (exact dimensions preserved) ===== */}
          <div className="room two-line">
            <div className="floor-section">
              <div className="building" onClick={(e) => {
                const target = e.target as HTMLElement;
                const roomEl = target.closest('.room') as HTMLElement | null;
                if (roomEl) {
                  const text = roomEl.textContent?.split('\n')[0]?.trim() || "Room";
                  openRoom(text);
                }
              }} style={{ cursor: "pointer" }}>

                {/* Floor 21 (small 770px) */}
                <div className="floor small">
                  <div className="room type-condo half" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>2101 Floor 2</div>
                  <div className="room type-condo half" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>2102 Floor 2</div>
                </div>

                <div className="floor small">
                  <div className="room type-condo half" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    2101 Floor 1<br /><span className="guest-label">Mrs.Mizuki</span>
                  </div>
                  <div className="room type-condo half" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    2102 Floor 1<br /><span className="guest-label">Dr.Gerhard</span>
                  </div>
                </div>

                {/* Floor 20 large */}
                <div className="floor large">
                  <div className="room type-condo" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
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

      {/* ===== MODALS – kept from original structure ===== */}
      {/* Edit Modal */}
      <div id="roomEditModal" className="modal-overlay hidden" style={{ position: "fixed", inset: 0, zIndex: 50 }}>
        <div style={{ width: "100%", maxWidth: 640, background: "#fff", borderRadius: 16, boxShadow: "0 30px 80px rgba(0,0,0,0.25)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg, hsl(25,85%,50%), hsl(35,90%,60%))" }}>
            <h2 id="modalRoomNumber" style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Edit Room</h2>
            <button id="closeIcon" style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16 }}>✕</button>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 6 }}>👤 Guest Name</label>
                  <input type="text" id="editGuestName" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 6 }}>🛏️ Room Type</label>
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
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 6 }}>🛠️ Maintenance Category</label>
                  <select id="editMaintStatus" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 14, background: "#fff", outline: "none" }}>
                    <option value="">(None)</option>
                    <option value="wifi">📶 WiFi Install / Network Repair</option>
                    <option value="air">❄️ Aircon Cleaning / Repair</option>
                    <option value="clean">🧹 Housekeeping</option>
                    <option value="fix">🔧 General Maintenance</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 6 }}>📝 Maintenance Note</label>
                  <textarea id="maintNote" rows={3} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} placeholder="e.g., install date / assigned staff" />
                  <p style={{ fontSize: 11, color: "hsl(220 15% 55%)", marginTop: 4 }}>This note appears when hovering the maintenance icon.</p>
                </div>
                <div id="resolve-maint-container" className="hidden">
                  <button type="button" id="btn-resolve-maint" style={{ width: "100%", padding: "10px", borderRadius: 10, border: "none", background: "#22c55e", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>✓ Mark as Resolved</button>
                </div>
                <div style={{ borderTop: "1px solid hsl(220 20% 90%)", paddingTop: 12 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#3b82f6", marginBottom: 6 }}>📡 Access Point (AP)</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <input type="checkbox" id="hasAP" style={{ width: 16, height: 16, cursor: "pointer" }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "hsl(220 25% 30%)" }}>AP Installed</span>
                  </div>
                  <div id="apDateGroup" className="hidden" style={{ paddingLeft: 24 }}>
                    <label style={{ display: "block", fontSize: 11, color: "hsl(220 15% 55%)", marginBottom: 4 }}>Install Date</label>
                    <input type="date" id="apInstallDate" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid hsl(220 20% 85%)", fontSize: 13 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: "12px 24px 16px", background: "hsl(220 20% 97%)", borderTop: "1px solid hsl(220 20% 90%)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button id="closeModal" style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid hsl(220 20% 80%)", background: "#fff", color: "hsl(220 25% 35%)", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Cancel</button>
            <button id="saveRoomInfo" style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: "#22c55e", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 13, boxShadow: "0 4px 12px rgba(34,197,94,0.35)" }}>Save Changes</button>
          </div>
        </div>
      </div>

      {/* Room Info Modal */}
      <div id="roomInfoModal" style={{ display: showRoomInfoModal ? "flex" : "none", position: "fixed", inset: 0, alignItems: "center", justifyContent: "center", padding: 16, zIndex: 20000 }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }} onClick={closeInfoModal}></div>
        <div className="modal-content-box" style={{ background: "#fff", borderRadius: 24, boxShadow: "0 30px 80px rgba(0,0,0,0.25)", width: "100%", maxWidth: 900, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>
          <div style={{ padding: "16px 20px 0" }}>
            <div style={{ background: "linear-gradient(135deg, hsl(235,65%,50%), hsl(260,65%,58%))", borderRadius: 16, padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 28 }}>🏠</span>
                    <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Room {selectedRoom}</h1>
                  </div>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontSize: 13 }}>Room <span id="infoRoomIdDisplay">#000</span></p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={openAddItemModal} style={{ background: "#10b981", border: "none", color: "#fff", padding: "10px 18px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Add Item</button>
                  <button onClick={closeInfoModal} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "10px 12px", borderRadius: 10, cursor: "pointer", fontSize: 16 }}>✕</button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 20px" }}>
            <div id="items-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}></div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <div id="addItemModal" style={{ display: showAddItemModal ? "flex" : "none", position: "fixed", inset: 0, alignItems: "center", justifyContent: "center", padding: 16, zIndex: 21000 }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }} onClick={closeAddItemModal}></div>
        <div className="modal-content-box" style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 480, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.25)", position: "relative", zIndex: 10 }}>
          <div style={{ background: "linear-gradient(135deg, hsl(235,65%,50%), hsl(260,65%,58%))", padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Add New Item</h2>
            <button onClick={closeAddItemModal} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16 }}>✕</button>
          </div>
          <div style={{ padding: 24, maxHeight: "75vh", overflowY: "auto" }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 6 }}>Image</label>
              <div id="image-dropzone" style={{ width: "100%", height: 140, borderRadius: 12, border: "2px dashed hsl(220 20% 80%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: "hsl(220 20% 97%)", cursor: "pointer" }}>
                <div id="image-placeholder" style={{ textAlign: "center" }}>
                  <span style={{ fontSize: 36, display: "block", marginBottom: 6 }}>📷</span>
                  <span style={{ fontSize: 12, color: "hsl(220 15% 55%)" }}>Drag image here or click to choose</span>
                  <button type="button" id="image-pick-btn" style={{ marginTop: 10, padding: "6px 16px", fontSize: 12, fontWeight: 700, borderRadius: 8, background: "#10b981", color: "#fff", border: "none", cursor: "pointer" }}>Choose Image</button>
                </div>
                <img id="preview-img" className="hidden" alt="Preview" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <input type="file" id="item-image-file" accept="image/*" className="hidden" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 4 }}>Item Name *</label>
                <input type="text" id="item-name-input" placeholder="e.g., Bed" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 4 }}>Width (cm)</label>
                  <input type="text" id="item-width-input" placeholder="55" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 4 }}>Length (cm)</label>
                  <input type="text" id="item-height-input" placeholder="55" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 4 }}>Note</label>
                <textarea id="item-note-input" rows={3} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 4 }}>Category</label>
                <select id="item-category-input" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 14, background: "#fff", outline: "none" }}>
                  <option value="เฟอร์นิเจอร์">🛋️ Furniture</option>
                  <option value="เครื่องใช้ไฟฟ้า">💡 Appliances</option>
                  <option value="ของตกแต่ง">🖼️ Decor</option>
                  <option value="อื่นๆ">📦 Other</option>
                </select>
              </div>
            </div>
            <button onClick={() => { if (typeof (window as any).saveCanvaItem === "function") (window as any).saveCanvaItem(); }} style={{ width: "100%", padding: "14px", marginTop: 20, borderRadius: 12, border: "none", background: "#10b981", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 16px rgba(16,185,129,0.35)" }}>Save Item</button>
          </div>
        </div>
      </div>

      {/* Admin settings modal */}
      <div id="admin-modal-canva" className="hidden" style={{ position: "fixed", inset: 0, zIndex: 9999 }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }} id="modal-backdrop-canva"></div>
        <div className="animate-slide-in" style={{ position: "absolute", inset: "20px 40px", background: "#fff", borderRadius: 24, boxShadow: "0 30px 80px rgba(0,0,0,0.3)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "linear-gradient(135deg, hsl(255,55%,40%), hsl(280,60%,50%))", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, background: "rgba(255,255,255,0.2)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>⚙️</div>
              <div>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Admin Panel</h2>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Manage room types and maintenance categories</p>
              </div>
            </div>
            <button id="close-modal-canva" style={{ width: 36, height: 36, background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, color: "#fff", fontSize: 18, cursor: "pointer" }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 24, background: "hsl(220 20% 97%)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid hsl(220 20% 90%)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "hsl(222 40% 12%)", marginTop: 0, marginBottom: 16 }}>📝 Add New Room Type</h3>
                <form id="room-type-form" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "hsl(220 20% 35%)", marginBottom: 4 }}>Room Type Name</label>
                    <input type="text" id="new-room-type-name" placeholder="e.g., Deluxe Sea View" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid hsl(220 20% 85%)", fontSize: 13, boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "hsl(220 20% 35%)", marginBottom: 4 }}>Type ID (short code)</label>
                    <input type="text" id="new-room-type-id" placeholder="e.g., dlx" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid hsl(220 20% 85%)", fontSize: 13, boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "hsl(220 20% 35%)", marginBottom: 4 }}>Color</label>
                    <input type="color" id="new-room-type-color" defaultValue="#cccccc" style={{ width: "100%", height: 40, borderRadius: 8, border: "1px solid hsl(220 20% 85%)", cursor: "pointer" }} />
                  </div>
                  <button type="button" id="add-room-type-btn" style={{ padding: "10px", borderRadius: 8, border: "none", background: "hsl(255,55%,48%)", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>+ Add Room Type</button>
                </form>
              </div>
              <div style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid hsl(220 20% 90%)" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "hsl(222 40% 12%)", marginTop: 0, marginBottom: 16 }}>🏷️ Current Room Types</h3>
                <div id="room-types-list" style={{ display: "flex", flexDirection: "column", gap: 6 }}></div>
              </div>
            </div>
            <div style={{ marginTop: 20, background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid hsl(220 20% 90%)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "hsl(222 40% 12%)", marginTop: 0, marginBottom: 16 }}>🔧 Maintenance Categories</h3>
              <div id="maint-categories-list" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard modal */}
      <div id="dashboardModal" className="dashboard-modal hidden">
        <div className="dashboard-modal__panel">
          <div className="dashboard-modal__header">
            <div>
              <h2 className="dashboard-modal__title">📊 Dashboard</h2>
              <p className="dashboard-modal__subtitle">Building A — Occupancy Overview</p>
            </div>
            <div className="dashboard-modal__actions">
              <button className="dashboard-btn" id="dash-export-btn">📥 Export</button>
              <button className="dashboard-btn" id="dash-close-btn">✕ Close</button>
            </div>
          </div>
          <div className="dashboard-modal__content">
            <div className="dashboard-grid">
              <div className="dashboard-analytic-card">
                <div className="dashboard-card__header">🏠 Occupancy Rate</div>
                <div className="dashboard-chart-wrap"><canvas className="dashboard-chart" id="occupancyChart"></canvas></div>
              </div>
              <div className="dashboard-analytic-card">
                <div className="dashboard-card__header">🔧 Maintenance Status</div>
                <div className="dashboard-chart-wrap"><canvas className="dashboard-chart" id="maintenanceChart"></canvas></div>
              </div>
              <div className="dashboard-analytic-card">
                <div className="dashboard-card__header">📋 Room Types</div>
                <div id="room-type-progress" className="dashboard-progress"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login modal (for Building A) */}
      <div id="adminModal" className="modal-overlay hidden">
        <div className="modal-box">
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "hsla(40,85%,45%,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 22, border: "1px solid hsla(40,85%,45%,0.3)" }}>🔑</div>
          <h2>Staff Login</h2>
          <p>Please enter passcode to access</p>
          <input type="password" id="adminPassword" placeholder="Passcode" />
          <div className="modal-actions" style={{ display: "flex", gap: 8 }}>
            <button id="loginCancel" style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid hsl(220 20% 30%)", background: "transparent", color: "hsl(220 15% 60%)", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
            <button id="loginConfirm" style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, hsl(38,85%,42%), hsl(44,90%,60%))", color: "#fff", fontWeight: 800, cursor: "pointer" }}>Confirm</button>
          </div>
        </div>
      </div>

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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditRoomModal from "@/components/index/EditRoomModal";

/* ================================================================
   Building B – Floor Plan (React port)
   Layout / room sizes preserved exactly from original HTML/CSS
================================================================ */

export default function BuildingB() {
  const [isAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [editMode, setEditMode] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();
  const goHome = () => { navigate("/"); };
  const goA = () => { navigate("/building-a"); };

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
            <h1>Building B – ABSC</h1>
            <span>Andaman Beach Suites Hotel</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => {
              if (!isAdmin) { alert("Admin only."); return; }
              setEditMode(!editMode);
            }}
            className="edit-mode-base"
            id="edit-mode-btn"
            style={{
              background: editMode ? "hsl(25,90%,55%)" : undefined,
              borderColor: editMode ? "hsl(25,90%,55%)" : undefined,
              color: editMode ? "#fff" : undefined,
            }}
          >
            <span id="edit-icon">{editMode ? "🔓" : "🔒"}</span>
            <span id="edit-mode-text" style={{ fontSize: 11, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}>{editMode ? "EDIT MODE: ON" : "LOCK MODE"}</span>
          </button>

          <button onClick={goA} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 8,
            background: "linear-gradient(135deg, hsl(220,65%,42%), hsl(235,70%,55%))",
            color: "#fff", border: "none", cursor: "pointer",
            fontSize: 11, fontWeight: 900, letterSpacing: "0.04em", textTransform: "uppercase"
          }}>🏢 BUILDING A</button>

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
      <div className="plan-wrapper" style={{
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        padding: "40px 20px", gap: 32, overflowX: "auto", background: "hsl(220 22% 96%)"
      }}>
        {/* Left Panel – Service Status */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{
            background: "hsl(222 40% 14%)", padding: 16, borderRadius: 14,
            border: "1px solid hsla(40,85%,45%,0.2)",
            boxShadow: "0 8px 32px hsla(222,50%,5%,0.35)",
            position: "sticky", top: 80
          }}>
            <h4 style={{ color: "hsl(42,90%,68%)", fontFamily: "'Playfair Display',serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px", borderBottom: "1px solid hsla(40,85%,45%,0.2)", paddingBottom: 8 }}>Service Status</h4>
            <div id="service-sidebar-list" style={{ display: "flex", flexDirection: "column", gap: 8 }}></div>
          </div>
        </div>

        {/* Building B grid */}
        <div className="building-b-container" style={{ cursor: "pointer" }} onClick={(e) => {
          const target = e.target as HTMLElement;
          const roomEl = target.closest('.room-b') as HTMLElement | null;
          if (roomEl) {
            const rid = roomEl.getAttribute('data-room-id') || roomEl.textContent?.trim() || "Room";
            setSelectedRoom(rid);
            if (editMode && isAdmin) {
              setShowEditModal(true);
            } else {
              // Info modal (view only) - TODO
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
          <div style={{
            background: "hsl(222 40% 14%)", padding: 16, borderRadius: 14,
            border: "1px solid hsla(40,85%,45%,0.2)",
            boxShadow: "0 8px 32px hsla(222,50%,5%,0.35)",
            position: "sticky", top: 80
          }}>
            <h4 style={{ color: "hsl(42,90%,68%)", fontFamily: "'Playfair Display',serif", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 10px", borderBottom: "1px solid hsla(40,85%,45%,0.2)", paddingBottom: 8 }}>Room Types</h4>
            <div id="room-types-list-mini" style={{ fontSize: 12, display: "flex", flexDirection: "column", gap: 6 }}></div>
          </div>
        </div>
      </div>

      {/* ===== MODALS ===== */}
      {/* Edit Modal */}
      <div id="roomEditModal" className="modal-overlay hidden" style={{ position: "fixed", inset: 0, zIndex: 50 }}>
        <div style={{ width: "100%", maxWidth: 640, background: "#fff", borderRadius: 16, boxShadow: "0 30px 80px rgba(0,0,0,0.25)", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg, hsl(25,85%,50%), hsl(35,90%,60%))" }}>
            <h2 id="modalRoomNumber" style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Edit Room</h2>
            <button id="closeIcon" style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 16 }}>✕</button>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 5 }}>👤 Guest Name</label>
                  <input type="text" id="editGuestName" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 5 }}>🛏️ Room Type</label>
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
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 5 }}>🛠️ Maintenance</label>
                  <select id="editMaintStatus" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 14, background: "#fff", outline: "none" }}>
                    <option value="">(None)</option>
                    <option value="wifi">📶 WiFi / Network</option>
                    <option value="air">❄️ Aircon</option>
                    <option value="clean">🧹 Housekeeping</option>
                    <option value="fix">🔧 General</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "hsl(220 25% 25%)", marginBottom: 5 }}>📝 Maintenance Note</label>
                  <textarea id="maintNote" rows={4} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid hsl(220 20% 85%)", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <div id="resolve-maint-container" className="hidden">
                  <button type="button" id="btn-resolve-maint" style={{ width: "100%", padding: 10, borderRadius: 10, border: "none", background: "#22c55e", color: "#fff", fontWeight: 800, cursor: "pointer" }}>✓ Mark as Resolved</button>
                </div>
                <div style={{ borderTop: "1px solid hsl(220 20% 90%)", paddingTop: 10 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#3b82f6", marginBottom: 5 }}>📡 Access Point (AP)</label>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" id="hasAP" />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>AP Installed</span>
                  </div>
                  <div id="apDateGroup" className="hidden" style={{ paddingLeft: 22, marginTop: 6 }}>
                    <input type="date" id="apInstallDate" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid hsl(220 20% 85%)", fontSize: 13 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: "12px 24px 16px", background: "hsl(220 20% 97%)", borderTop: "1px solid hsl(220 20% 90%)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button id="closeModal" style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid hsl(220 20% 80%)", background: "#fff", color: "hsl(220 25% 35%)", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
            <button id="saveRoomInfo" style={{ padding: "10px 22px", borderRadius: 10, border: "none", background: "#22c55e", color: "#fff", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 12px rgba(34,197,94,0.35)" }}>Save Changes</button>
          </div>
        </div>
      </div>

      {/* Room Info Modal */}
      <div id="roomInfoModal" className="hidden" style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 20000 }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }} onClick={() => { if (typeof (window as any).closeInfoModal === "function") (window as any).closeInfoModal(); }}></div>
        <div className="modal-content-box" style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 900, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>
          <div style={{ padding: "16px 20px 0" }}>
            <div style={{ background: "linear-gradient(135deg, hsl(235,65%,50%), hsl(260,65%,58%))", borderRadius: 16, padding: "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 28 }}>🏠</span>
                    <h1 id="infoRoomTitle" style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Room</h1>
                  </div>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontSize: 12 }}>Room <span id="infoRoomIdDisplay">#000</span> • <span id="itemCount">0</span> items</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { if (typeof (window as any).openAddItemModal === "function") (window as any).openAddItemModal(); }} style={{ background: "#10b981", border: "none", color: "#fff", padding: "9px 16px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Add Item</button>
                  <button onClick={() => { if (typeof (window as any).closeInfoModal === "function") (window as any).closeInfoModal(); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", padding: "9px 12px", borderRadius: 10, cursor: "pointer" }}>✕</button>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 20px", position: "relative" }}>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10 }} id="category-filters"></div>
            <div id="items-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}></div>
            <div id="empty-state" className="hidden" style={{ textAlign: "center", padding: "50px 0" }}>
              <div style={{ fontSize: 50, marginBottom: 10 }}>📭</div>
              <h3 style={{ color: "hsl(220 25% 40%)", fontWeight: 700 }}>No items yet</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <div id="addItemModal" className="hidden" style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, zIndex: 21000 }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }} onClick={() => { if (typeof (window as any).closeAddItemModal === "function") (window as any).closeAddItemModal(); }}></div>
        <div className="modal-content-box" style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 460, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.25)", position: "relative", zIndex: 10 }}>
          <div style={{ background: "linear-gradient(135deg, hsl(235,65%,50%), hsl(260,65%,58%))", padding: "16px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display',serif" }}>Add New Item</h2>
            <button onClick={() => { if (typeof (window as any).closeAddItemModal === "function") (window as any).closeAddItemModal(); }} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 30, height: 30, borderRadius: 8, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ padding: 22, maxHeight: "75vh", overflowY: "auto" }}>
            <div style={{ marginBottom: 14 }}>
              <div id="image-dropzone" style={{ width: "100%", height: 130, borderRadius: 10, border: "2px dashed hsl(220 20% 80%)", display: "flex", alignItems: "center", justifyContent: "center", background: "hsl(220 20% 97%)", cursor: "pointer", position: "relative", overflow: "hidden" }}>
                <div id="image-placeholder" style={{ textAlign: "center" }}>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 6 }}>📷</span>
                  <button type="button" id="image-pick-btn" style={{ padding: "6px 14px", fontSize: 12, fontWeight: 700, borderRadius: 8, background: "#10b981", color: "#fff", border: "none", cursor: "pointer" }}>Choose Image</button>
                </div>
                <img id="preview-img" className="hidden" alt="Preview" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <input type="file" id="item-image-file" accept="image/*" className="hidden" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "hsl(220 25% 30%)", marginBottom: 4 }}>Item Name *</label>
                <input type="text" id="item-name-input" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid hsl(220 20% 85%)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "hsl(220 25% 30%)", marginBottom: 4 }}>Width (cm)</label>
                  <input type="text" id="item-width-input" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid hsl(220 20% 85%)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "hsl(220 25% 30%)", marginBottom: 4 }}>Length (cm)</label>
                  <input type="text" id="item-height-input" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid hsl(220 20% 85%)", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "hsl(220 25% 30%)", marginBottom: 4 }}>Note</label>
                <textarea id="item-note-input" rows={3} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid hsl(220 20% 85%)", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "hsl(220 25% 30%)", marginBottom: 4 }}>Category</label>
                <select id="item-category-input" style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid hsl(220 20% 85%)", fontSize: 13, background: "#fff", outline: "none" }}>
                  <option value="เฟอร์นิเจอร์">🛋️ Furniture</option>
                  <option value="เครื่องใช้ไฟฟ้า">💡 Appliances</option>
                  <option value="ของตกแต่ง">🖼️ Decor</option>
                  <option value="อื่นๆ">📦 Other</option>
                </select>
              </div>
            </div>
            <button onClick={() => { if (typeof (window as any).saveCanvaItem === "function") (window as any).saveCanvaItem(); }} style={{ width: "100%", padding: "13px", marginTop: 16, borderRadius: 10, border: "none", background: "#10b981", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>Save Item</button>
          </div>
        </div>
      </div>

      {/* Dashboard modal */}
      <div id="dashboardModal" className="dashboard-modal hidden">
        <div className="dashboard-modal__panel">
          <div className="dashboard-modal__header">
            <div>
              <h2 className="dashboard-modal__title">📊 Dashboard</h2>
              <p className="dashboard-modal__subtitle">Building B — Occupancy Overview</p>
            </div>
            <div className="dashboard-modal__actions">
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

      {/* Login modal */}
      <div id="adminModal" className="modal-overlay hidden">
        <div className="modal-box">
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "hsla(40,85%,45%,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 22, border: "1px solid hsla(40,85%,45%,0.3)" }}>🔑</div>
          <h2>Staff Login</h2>
          <p>Please enter passcode to access</p>
          <input type="password" id="adminPassword" placeholder="Passcode" />
          <div style={{ display: "flex", gap: 8 }}>
            <button id="loginCancel" style={{ flex: 1, padding: "10px", borderRadius: 10, border: "1px solid hsl(220 20% 30%)", background: "transparent", color: "hsl(220 15% 60%)", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
            <button id="loginConfirm" style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, hsl(38,85%,42%), hsl(44,90%,60%))", color: "#fff", fontWeight: 800, cursor: "pointer" }}>Confirm</button>
          </div>
        </div>
      </div>
      {/* Edit Room Modal */}
      {showEditModal && selectedRoom && (
        <EditRoomModal
          roomId={selectedRoom}
          onClose={() => { setShowEditModal(false); setSelectedRoom(""); }}
          onSave={(data) => {
            console.log("Save room:", selectedRoom, data);
            setShowEditModal(false);
            setSelectedRoom("");
          }}
        />
      )}
    </div>
  );
}

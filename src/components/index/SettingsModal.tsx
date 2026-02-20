import { useState } from "react";
import { X, Palette, Package, KeyRound, SlidersHorizontal, Plus, Trash2, GripVertical } from "lucide-react";

interface SettingsModalProps {
  onClose: () => void;
}

type Tab = "room-types" | "item-categories" | "admin" | "general";

interface RoomTypeItem {
  id: string;
  label: string;
  color: string;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

const DEFAULT_ROOM_TYPES: RoomTypeItem[] = [
  { id: "condo", label: "Condo / Owner", color: "hsl(220,70%,55%)" },
  { id: "sus", label: "Superior Suite", color: "hsl(160,60%,45%)" },
  { id: "dls", label: "Deluxe Suite", color: "hsl(35,85%,55%)" },
  { id: "sdl", label: "Studio Deluxe", color: "hsl(280,55%,55%)" },
  { id: "sps", label: "Superior", color: "hsl(190,65%,45%)" },
  { id: "fam", label: "Family", color: "hsl(340,65%,55%)" },
  { id: "lux", label: "Luxury / Royal", color: "hsl(45,90%,50%)" },
];

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: "furniture", name: "เฟอร์นิเจอร์", icon: "🛋️" },
  { id: "appliances", name: "เครื่องใช้ไฟฟ้า", icon: "💡" },
  { id: "decor", name: "ของตกแต่ง", icon: "🖼️" },
  { id: "other", name: "อื่นๆ", icon: "📦" },
];

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "room-types", label: "Room Types", icon: <Palette className="h-4 w-4" /> },
  { id: "item-categories", label: "Item Categories", icon: <Package className="h-4 w-4" /> },
  { id: "admin", label: "Admin Password", icon: <KeyRound className="h-4 w-4" /> },
  { id: "general", label: "General", icon: <SlidersHorizontal className="h-4 w-4" /> },
];

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("room-types");
  const [roomTypes, setRoomTypes] = useState<RoomTypeItem[]>(DEFAULT_ROOM_TYPES);
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [hotelName, setHotelName] = useState("Andaman Beach Suites");
  const [language, setLanguage] = useState("th");

  // Admin password
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // New room type form
  const [newRTLabel, setNewRTLabel] = useState("");
  const [newRTColor, setNewRTColor] = useState("#3b82f6");

  // New category form
  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("📦");

  const addRoomType = () => {
    if (!newRTLabel.trim()) return;
    const id = newRTLabel.trim().toLowerCase().replace(/\s+/g, "-");
    setRoomTypes([...roomTypes, { id, label: newRTLabel.trim(), color: newRTColor }]);
    setNewRTLabel("");
    setNewRTColor("#3b82f6");
  };

  const removeRoomType = (id: string) => {
    setRoomTypes(roomTypes.filter(rt => rt.id !== id));
  };

  const addCategory = () => {
    if (!newCatName.trim()) return;
    const id = newCatName.trim().toLowerCase().replace(/\s+/g, "-");
    setCategories([...categories, { id, name: newCatName.trim(), icon: newCatIcon }]);
    setNewCatName("");
    setNewCatIcon("📦");
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const handleChangePassword = () => {
    if (!newPass || newPass.length < 4) {
      alert("รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร");
      return;
    }
    if (newPass !== confirmPass) {
      alert("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }
    alert("เปลี่ยนรหัสผ่านสำเร็จ ✅");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-[780px] max-h-[85vh] bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col animate-[popIn_0.25s_cubic-bezier(0.175,0.885,0.32,1.275)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-800 to-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <SlidersHorizontal className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-wide">Settings</h2>
              <p className="text-xs text-slate-400">Manage system configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors border-none cursor-pointer bg-transparent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar tabs */}
          <div className="w-[200px] bg-slate-50 border-r border-slate-200 py-3 flex-shrink-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-semibold text-left border-none cursor-pointer transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-slate-800 shadow-sm border-r-2 border-r-blue-500"
                    : "bg-transparent text-slate-500 hover:bg-white/60 hover:text-slate-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Room Types Tab */}
            {activeTab === "room-types" && (
              <div>
                <h3 className="text-base font-extrabold text-slate-800 mb-1">Room Types</h3>
                <p className="text-sm text-slate-500 mb-5">จัดการประเภทห้องพัก เลือกสีและชื่อได้ตามต้องการ</p>

                {/* List */}
                <div className="space-y-2 mb-5">
                  {roomTypes.map(rt => (
                    <div key={rt.id} className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
                      <GripVertical className="h-4 w-4 text-slate-300" />
                      <span className="w-5 h-5 rounded-full flex-shrink-0 shadow-inner" style={{ background: rt.color }} />
                      <span className="flex-1 text-sm font-semibold text-slate-700">{rt.label}</span>
                      <code className="text-xs text-slate-400 font-mono">{rt.id}</code>
                      <button
                        onClick={() => removeRoomType(rt.id)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-all border-none bg-transparent cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new */}
                <div className="flex items-end gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Label</label>
                    <input
                      type="text"
                      value={newRTLabel}
                      onChange={(e) => setNewRTLabel(e.target.value)}
                      maxLength={50}
                      placeholder="e.g. Penthouse"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                  <div className="w-20">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Color</label>
                    <input
                      type="color"
                      value={newRTColor}
                      onChange={(e) => setNewRTColor(e.target.value)}
                      className="w-full h-9 rounded-lg border border-slate-200 cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={addRoomType}
                    className="h-9 px-4 rounded-lg bg-blue-600 text-white text-sm font-bold border-none cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                </div>
              </div>
            )}

            {/* Item Categories Tab */}
            {activeTab === "item-categories" && (
              <div>
                <h3 className="text-base font-extrabold text-slate-800 mb-1">Item Categories</h3>
                <p className="text-sm text-slate-500 mb-5">จัดการหมวดหมู่ของในห้อง (เฟอร์นิเจอร์, เครื่องใช้ไฟฟ้า ฯลฯ)</p>

                <div className="space-y-2 mb-5">
                  {categories.map(cat => (
                    <div key={cat.id} className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
                      <GripVertical className="h-4 w-4 text-slate-300" />
                      <span className="text-xl">{cat.icon}</span>
                      <span className="flex-1 text-sm font-semibold text-slate-700">{cat.name}</span>
                      <button
                        onClick={() => removeCategory(cat.id)}
                        className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-all border-none bg-transparent cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-end gap-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <div className="w-16">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Icon</label>
                    <input
                      type="text"
                      value={newCatIcon}
                      onChange={(e) => setNewCatIcon(e.target.value)}
                      maxLength={4}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-center text-lg outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      maxLength={50}
                      placeholder="e.g. ผ้าปูที่นอน"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-emerald-400"
                    />
                  </div>
                  <button
                    onClick={addCategory}
                    className="h-9 px-4 rounded-lg bg-emerald-600 text-white text-sm font-bold border-none cursor-pointer hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                </div>
              </div>
            )}

            {/* Admin Password Tab */}
            {activeTab === "admin" && (
              <div>
                <h3 className="text-base font-extrabold text-slate-800 mb-1">Admin Password</h3>
                <p className="text-sm text-slate-500 mb-5">เปลี่ยนรหัสผ่านสำหรับ Staff Login</p>

                <div className="max-w-sm space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">🔑 รหัสปัจจุบัน</label>
                    <input
                      type="password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      maxLength={50}
                      placeholder="••••"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">🔐 รหัสใหม่</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      maxLength={50}
                      placeholder="อย่างน้อย 4 ตัว"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">🔐 ยืนยันรหัสใหม่</label>
                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      maxLength={50}
                      placeholder="••••"
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className="w-full py-3 rounded-xl border-none text-white font-extrabold text-sm cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25"
                  >
                    เปลี่ยนรหัสผ่าน
                  </button>
                </div>
              </div>
            )}

            {/* General Tab */}
            {activeTab === "general" && (
              <div>
                <h3 className="text-base font-extrabold text-slate-800 mb-1">General Settings</h3>
                <p className="text-sm text-slate-500 mb-5">ตั้งค่าทั่วไปของระบบ</p>

                <div className="max-w-sm space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">🏨 Hotel Name</label>
                    <input
                      type="text"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">🌐 Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm bg-white outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="th">🇹🇭 ภาษาไทย</option>
                      <option value="en">🇬🇧 English</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">ℹ️ System Info</h4>
                    <div className="space-y-2 text-sm text-slate-500">
                      <div className="flex justify-between">
                        <span>Version</span>
                        <span className="font-mono font-bold text-slate-700">2.0.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Buildings</span>
                        <span className="font-bold text-slate-700">A, B</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Framework</span>
                        <span className="font-mono font-bold text-slate-700">React + Vite</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { MaintenanceCategory, getIconComponent } from "@/data/maintenanceCategories";

interface EditRoomModalProps {
  roomId: string;
  onClose: () => void;
  onSave: (data: RoomEditData) => void;
  categories: MaintenanceCategory[];
  activeServices?: string[]; // currently assigned category ids
}

export interface RoomEditData {
  guestName: string;
  roomType: string;
  maintNote: string;
  hasAP: boolean;
  apInstallDate: string;
  services: string[]; // selected category ids
}

const ROOM_TYPES = [
  { value: "condo", label: "Condo / Owner", color: "hsl(220,70%,55%)" },
  { value: "sus", label: "Superior Suite", color: "hsl(160,60%,45%)" },
  { value: "dls", label: "Deluxe Suite", color: "hsl(35,85%,55%)" },
  { value: "sdl", label: "Studio Deluxe", color: "hsl(280,55%,55%)" },
  { value: "sps", label: "Superior", color: "hsl(190,65%,45%)" },
  { value: "fam", label: "Family", color: "hsl(340,65%,55%)" },
  { value: "lux", label: "Luxury / Royal", color: "hsl(45,90%,50%)" },
];

export default function EditRoomModal({ roomId, onClose, onSave, categories, activeServices = [] }: EditRoomModalProps) {
  const [guestName, setGuestName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [maintNote, setMaintNote] = useState("");
  const [hasAP, setHasAP] = useState(false);
  const [apInstallDate, setApInstallDate] = useState("");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(activeServices);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const selectedType = ROOM_TYPES.find(t => t.value === roomType);

  const toggleService = (catId: string) => {
    setSelectedServices(prev =>
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  const handleSave = () => {
    onSave({ guestName: guestName.trim(), roomType, maintNote: maintNote.trim(), hasAP, apInstallDate, services: selectedServices });
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-[640px] bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.25)] overflow-hidden animate-[popIn_0.25s_cubic-bezier(0.175,0.885,0.32,1.275)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, hsl(25,85%,50%), hsl(35,90%,60%))" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">✏️</span>
            <div>
              <h2 className="text-lg font-extrabold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Edit Room {roomId}
              </h2>
              <p className="text-xs text-white/80">Update room details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white border-none cursor-pointer text-base"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >✕</button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {/* Guest Name */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">👤 Guest Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  maxLength={100}
                  placeholder="e.g. Mr. Smith"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm text-slate-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Room Type */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">🛏️ Room Type</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm text-left flex items-center gap-3 cursor-pointer bg-white hover:border-slate-300 transition-colors"
                  >
                    {selectedType ? (
                      <>
                        <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: selectedType.color }} />
                        <span className="font-semibold text-slate-700">{selectedType.label}</span>
                      </>
                    ) : (
                      <span className="text-slate-400">Select Room Type</span>
                    )}
                    <span className="ml-auto text-slate-400">▾</span>
                  </button>
                  {showTypeDropdown && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 overflow-hidden">
                      {ROOM_TYPES.map(t => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => { setRoomType(t.value); setShowTypeDropdown(false); }}
                          className={`w-full px-4 py-2.5 flex items-center gap-3 text-sm text-left hover:bg-slate-50 transition-colors cursor-pointer border-none bg-transparent ${roomType === t.value ? "bg-blue-50 font-bold" : ""}`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
                          <span>{t.label}</span>
                          {roomType === t.value && <span className="ml-auto text-blue-500">✓</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
              {/* Maintenance Note */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">📝 Maintenance Note</label>
                <textarea
                  value={maintNote}
                  onChange={(e) => setMaintNote(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder="e.g., install date / assigned staff / details"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm text-slate-700 outline-none resize-vertical focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Access Point */}
              <div className="pt-3 border-t border-slate-200">
                <label className="block text-sm font-bold text-blue-600 mb-2">📡 Access Point (AP)</label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAP}
                    onChange={(e) => setHasAP(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-slate-700">AP Installed</span>
                </label>
                {hasAP && (
                  <div className="pl-7 mt-2">
                    <label className="block text-xs text-slate-500 mb-1">Install Date</label>
                    <input
                      type="date"
                      value={apInstallDate}
                      onChange={(e) => setApInstallDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Service Icons - full width below the grid */}
          {categories.length > 0 && (
            <div className="mt-5 pt-5 border-t border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-3">🛠️ Service Icons (เลือกได้หลายอัน)</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => {
                  const IconComp = getIconComponent(cat.icon);
                  const isSelected = selectedServices.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleService(cat.id)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 text-sm font-semibold cursor-pointer transition-all ${
                        isSelected
                          ? "shadow-md scale-105"
                          : "bg-white hover:bg-slate-50 border-slate-200 text-slate-500"
                      }`}
                      style={isSelected ? {
                        borderColor: cat.color,
                        background: `${cat.color}18`,
                        color: "hsl(220,20%,30%)",
                      } : undefined}
                    >
                      {IconComp && (
                        <IconComp
                          size={16}
                          style={{ color: isSelected ? cat.color : undefined }}
                        />
                      )}
                      {cat.name}
                      {isSelected && <span className="text-green-500 text-xs">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-sm cursor-pointer hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl border-none text-white font-extrabold text-sm cursor-pointer shadow-lg transition-all active:scale-95"
            style={{ background: "#22c55e", boxShadow: "0 4px 12px rgba(34,197,94,0.35)" }}
          >
            Save Changes
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}

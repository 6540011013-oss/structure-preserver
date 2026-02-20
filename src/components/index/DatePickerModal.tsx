import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DatePickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  selectedDate?: Date;
}

const TH_MONTHS = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
];
const EN_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const TH_DAYS = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
const EN_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function DatePickerModal({ open, onClose, onSelect, selectedDate }: DatePickerModalProps) {
  const { lang, t } = useLanguage();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [picked, setPicked] = useState<Date | null>(selectedDate || null);

  const minDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 30);
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setHours(23, 59, 59, 999);
    return d;
  }, []);

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const rows: (number | null)[][] = [];
    let row: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) row.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      row.push(d);
      if (row.length === 7) {
        rows.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      while (row.length < 7) row.push(null);
      rows.push(row);
    }
    return rows;
  }, [viewYear, viewMonth]);

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(12, 0, 0, 0);
    return d < minDate || d > maxDate;
  };

  const isToday = (day: number) =>
    day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  const isSelected = (day: number) =>
    picked && day === picked.getDate() && viewMonth === picked.getMonth() && viewYear === picked.getFullYear();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const goToToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setPicked(today);
  };

  const handleConfirm = () => {
    if (picked) onSelect(picked);
    onClose();
  };

  if (!open) return null;

  const displayYear = lang === "th" ? viewYear + 543 : viewYear;
  const monthNames = lang === "th" ? TH_MONTHS : EN_MONTHS;
  const dayNames = lang === "th" ? TH_DAYS : EN_DAYS;

  return (
    <div className="fixed inset-0 z-[30000] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 text-center">
          <div className="flex items-center justify-center gap-2 text-white font-bold text-lg">
            <Calendar className="h-5 w-5" />
            {lang === "th" ? "เลือกวันที่ (30 วัน)" : "Select Date (30 days)"}
          </div>
          <p className="text-white/80 text-xs mt-1">
            {lang === "th" ? "✓ เลือกได้วันนี้และย้อนหลัง 30 วัน" : "✓ Select today or up to 30 days back"}
          </p>
        </div>

        {/* Date display */}
        <div className="px-6 pt-5 pb-3">
          <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-200">
            <span className="text-lg font-bold text-slate-700">
              {picked
                ? lang === "th"
                  ? `${picked.getDate()} ${TH_MONTHS[picked.getMonth()]} ${picked.getFullYear() + 543}`
                  : picked.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
                : lang === "th" ? "กรุณาเลือกวันที่" : "Please select a date"}
            </span>
          </div>
        </div>

        {/* Calendar */}
        <div className="px-6 pb-2">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-slate-100 border-none bg-transparent cursor-pointer transition-colors">
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </button>
            <span className="font-bold text-slate-800">
              {monthNames[viewMonth]} {displayYear}
            </span>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-slate-100 border-none bg-transparent cursor-pointer transition-colors">
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {dayNames.map((d, i) => (
              <div key={d} className={`text-center text-xs font-bold py-1 ${i === 0 ? "text-red-500" : i === 6 ? "text-blue-500" : "text-slate-500"}`}>
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          {calendarDays.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => {
                if (day === null) return <div key={di} className="h-10" />;
                const disabled = isDisabled(day);
                const sel = isSelected(day);
                const tod = isToday(day);
                return (
                  <button
                    key={di}
                    disabled={disabled}
                    onClick={() => setPicked(new Date(viewYear, viewMonth, day))}
                    className={`h-10 w-full rounded-full text-sm font-semibold border-none cursor-pointer transition-all
                      ${disabled ? "text-slate-300 cursor-not-allowed bg-transparent" : "hover:bg-emerald-50"}
                      ${sel ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md" : ""}
                      ${tod && !sel ? "ring-2 ring-emerald-400 bg-emerald-50 text-emerald-700" : ""}
                      ${!sel && !tod && !disabled ? "bg-transparent text-slate-700" : ""}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Go to today */}
          <div className="text-center py-3">
            <button onClick={goToToday} className="text-sm font-bold text-rose-500 hover:text-rose-600 bg-transparent border-none cursor-pointer flex items-center gap-1 mx-auto transition-colors">
              <MapPin className="h-3.5 w-3.5" />
              {lang === "th" ? "ไปยังวันนี้" : "Go to today"}
            </button>
          </div>
        </div>

        {/* Confirm button */}
        <div className="px-6 pb-6">
          <button
            onClick={handleConfirm}
            disabled={!picked}
            className={`w-full py-3.5 rounded-2xl font-bold text-base border-none cursor-pointer transition-all shadow-lg
              ${picked
                ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700"
                : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
          >
            {lang === "th" ? "เลือกวันที่" : "Select Date"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Lang = "en" | "th";

const translations = {
  // ===== INDEX PAGE =====
  "hotel.name": { en: "ANDAMAN BEACH SUITES HOTEL", th: "โรงแรมอันดามัน บีช สวีท" },
  "hotel.subtitle": { en: "Room Status System", th: "ระบบสถานะห้องพัก" },
  "time.label": { en: "Local Time :", th: "เวลาท้องถิ่น :" },
  "server.label": { en: "Server Status :", th: "สถานะเซิร์ฟเวอร์ :" },
  "server.active": { en: "Active", th: "ออนไลน์" },
  "btn.staffLogin": { en: "STAFF LOGIN", th: "เข้าสู่ระบบ" },
  "btn.adminActive": { en: "ADMIN ACTIVE", th: "แอดมินเปิดใช้งาน" },
  "hero.title": { en: "Room Status System", th: "ระบบสถานะห้องพัก" },
  "hero.subtitle": { en: "Internal Room Management System", th: "ระบบจัดการห้องพักภายใน" },
  "building.a.name": { en: "ABSH", th: "ABSH" },
  "building.a.desc": { en: "Building A • 104 Rooms", th: "อาคาร A • 104 ห้อง" },
  "building.a.floors": { en: "9 Floors", th: "9 ชั้น" },
  "building.a.roomsFloor": { en: "8 Rooms", th: "8 ห้อง" },
  "building.b.name": { en: "ABSC", th: "ABSC" },
  "building.b.desc": { en: "Building B • 40 Rooms", th: "อาคาร B • 40 ห้อง" },
  "building.b.floors": { en: "4 Floors", th: "4 ชั้น" },
  "building.b.roomsFloor": { en: "10 Rooms", th: "10 ห้อง" },
  "label.totalFloors": { en: "Total Floors", th: "จำนวนชั้น" },
  "label.roomsPerFloor": { en: "Rooms/Floor", th: "ห้อง/ชั้น" },
  "btn.viewFloorPlan": { en: "View Floor Plan →", th: "ดูผังชั้น →" },
  "footer.copyright": { en: "© Andaman Beach Suites Hotel", th: "© โรงแรมอันดามัน บีช สวีท" },

  // ===== BUILDING PAGES =====
  "nav.home": { en: "HOME", th: "หน้าหลัก" },
  "nav.lockMode": { en: "Lock Mode", th: "ล็อค" },
  "nav.editModeOn": { en: "Edit Mode: ON", th: "แก้ไข: เปิด" },
  "nav.settings": { en: "Settings", th: "ตั้งค่า" },
  "nav.dashboard": { en: "Dashboard", th: "แดชบอร์ด" },
  "nav.date": { en: "Date", th: "วันที่" },
  "nav.buildingB": { en: "Building B", th: "อาคาร B" },
  "nav.buildingA": { en: "Building A", th: "อาคาร A" },
  "buildingA.title": { en: "Building A — ABSH", th: "อาคาร A — ABSH" },
  "buildingA.sub": { en: "Ocean View • Main Building", th: "วิวทะเล • อาคารหลัก" },
  "buildingB.title": { en: "Building B — ABSC", th: "อาคาร B — ABSC" },
  "buildingB.sub": { en: "City View • Condo Wing", th: "วิวเมือง • ปีกคอนโด" },

  // ===== LEGEND =====
  "legend.roomType": { en: "Room Type", th: "ประเภทห้อง" },
  "legend.serviceStatus": { en: "Service Status", th: "สถานะบริการ" },

  // ===== ROOM INFO MODAL =====
  "room.title": { en: "Room", th: "ห้อง" },
  "room.items": { en: "items", th: "รายการ" },
  "room.addItem": { en: "+ Add Item", th: "+ เพิ่มรายการ" },
  "room.noItems": { en: "No items yet", th: "ยังไม่มีรายการ" },
  "room.noItemsSub": { en: "Start adding items for this room.", th: "เริ่มเพิ่มรายการสำหรับห้องนี้" },
  "room.addFirstItem": { en: "+ Add First Item", th: "+ เพิ่มรายการแรก" },
  "room.addCategory": { en: "+ Add Category", th: "+ เพิ่มหมวดหมู่" },
  "room.all": { en: "All", th: "ทั้งหมด" },
  "room.note": { en: "Room Note", th: "บันทึกห้อง" },
  "room.delete": { en: "Delete", th: "ลบ" },

  // ===== ADD ITEM MODAL =====
  "addItem.title": { en: "Add New Item", th: "เพิ่มรายการใหม่" },
  "addItem.image": { en: "Image", th: "รูปภาพ" },
  "addItem.dragHint": { en: "Drag an image here or click to choose a file.", th: "ลากรูปมาวางหรือคลิกเพื่อเลือกไฟล์" },
  "addItem.chooseImage": { en: "Choose Image", th: "เลือกรูป" },
  "addItem.name": { en: "Item Name", th: "ชื่อรายการ" },
  "addItem.width": { en: "Width (cm)", th: "กว้าง (ซม.)" },
  "addItem.length": { en: "Length (cm)", th: "ยาว (ซม.)" },
  "addItem.note": { en: "Note", th: "หมายเหตุ" },
  "addItem.category": { en: "Category", th: "หมวดหมู่" },
  "addItem.save": { en: "Save Item", th: "บันทึกรายการ" },

  // ===== EDIT MODAL =====
  "edit.guestName": { en: "👤 Guest Name", th: "👤 ชื่อแขก" },
  "edit.roomType": { en: "🛏️ Room Type", th: "🛏️ ประเภทห้อง" },
  "edit.maintCategory": { en: "🛠️ Maintenance Category", th: "🛠️ หมวดหมู่ซ่อมบำรุง" },
  "edit.maintNote": { en: "📝 Maintenance Note", th: "📝 บันทึกการซ่อม" },
  "edit.ap": { en: "📡 Access Point (AP)", th: "📡 จุดเชื่อมต่อ (AP)" },
  "edit.apInstalled": { en: "AP Installed", th: "ติดตั้ง AP แล้ว" },
  "edit.apDate": { en: "Install Date", th: "วันที่ติดตั้ง" },
  "edit.cancel": { en: "Cancel", th: "ยกเลิก" },
  "edit.save": { en: "Save Changes", th: "บันทึก" },
  "edit.none": { en: "(None)", th: "(ไม่มี)" },

  // ===== SETTINGS MODAL =====
  "settings.title": { en: "Settings", th: "ตั้งค่า" },
  "settings.subtitle": { en: "Manage system configuration", th: "จัดการการตั้งค่าระบบ" },
  "settings.roomTypes": { en: "Room Types", th: "ประเภทห้อง" },
  "settings.maintenance": { en: "Maintenance", th: "ซ่อมบำรุง" },
  "settings.adminPassword": { en: "Admin Password", th: "รหัสแอดมิน" },
  "settings.general": { en: "General", th: "ทั่วไป" },
  "settings.language": { en: "🌐 Language", th: "🌐 ภาษา" },
  "settings.hotelName": { en: "🏨 Hotel Name", th: "🏨 ชื่อโรงแรม" },

  // ===== LOGIN MODAL =====
  "login.title": { en: "Staff Login", th: "เข้าสู่ระบบพนักงาน" },
  "login.subtitle": { en: "Please enter passcode to access", th: "กรุณาใส่รหัสผ่านเพื่อเข้าใช้งาน" },
  "login.cancel": { en: "Cancel", th: "ยกเลิก" },
  "login.confirm": { en: "Confirm", th: "ยืนยัน" },
  "login.logoutConfirm": { en: "Log out of Admin?", th: "ออกจากระบบแอดมิน?" },

  // ===== CATEGORIES =====
  "cat.furniture": { en: "Furniture", th: "เฟอร์นิเจอร์" },
  "cat.appliances": { en: "Appliances", th: "เครื่องใช้ไฟฟ้า" },
  "cat.decor": { en: "Decor", th: "ของตกแต่ง" },
  "cat.other": { en: "Other", th: "อื่นๆ" },
} as const;

type TranslationKey = keyof typeof translations;

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("appLang") as Lang) || "en";
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("appLang", newLang);
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry["en"] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export interface RoomTypeItem {
  id: string;
  label: string;
  color: string;
  borderColor: string;
}

export const DEFAULT_ROOM_TYPES: RoomTypeItem[] = [
  { id: "condo", label: "Condo / Owner", color: "#FFFF00", borderColor: "#e6e600" },
  { id: "sus", label: "Superior Suite", color: "#FFCC99", borderColor: "#f2b379" },
  { id: "dls", label: "Deluxe Suite", color: "#9ACD32", borderColor: "#86b32b" },
  { id: "sdl", label: "Studio Deluxe", color: "#b18cd3", borderColor: "#9a73bd" },
  { id: "sps", label: "Superior", color: "#f8f8b8", borderColor: "#e1e1a2" },
  { id: "fam", label: "Family", color: "#97bce4", borderColor: "#7ea5cf" },
  { id: "lux", label: "Luxury / Royal", color: "#FF9900", borderColor: "#e68a00" },
];

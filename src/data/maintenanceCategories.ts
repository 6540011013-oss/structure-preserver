import {
  Snowflake, Zap, PaintBucket, ShowerHead, Wrench, Lightbulb, Droplets,
  Wifi, Fan, Tv, DoorOpen, Lock, Flame, Bug, Waves, Hammer
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MaintenanceCategory {
  id: string;
  name: string;
  icon: string; // lucide icon name key
  color: string; // border/accent color
}

// Map of available icons for the picker
export const AVAILABLE_ICONS: { key: string; icon: LucideIcon; label: string }[] = [
  { key: "snowflake", icon: Snowflake, label: "แอร์" },
  { key: "zap", icon: Zap, label: "ไฟฟ้า" },
  { key: "paint-bucket", icon: PaintBucket, label: "แม่บ้าน" },
  { key: "shower-head", icon: ShowerHead, label: "ฝักบัว" },
  { key: "wrench", icon: Wrench, label: "ซ่อม" },
  { key: "lightbulb", icon: Lightbulb, label: "หลอดไฟ" },
  { key: "droplets", icon: Droplets, label: "น้ำ" },
  { key: "wifi", icon: Wifi, label: "WiFi" },
  { key: "fan", icon: Fan, label: "พัดลม" },
  { key: "tv", icon: Tv, label: "ทีวี" },
  { key: "door-open", icon: DoorOpen, label: "ประตู" },
  { key: "lock", icon: Lock, label: "กุญแจ" },
  { key: "flame", icon: Flame, label: "แก๊ส" },
  { key: "bug", icon: Bug, label: "แมลง" },
  { key: "waves", icon: Waves, label: "สระน้ำ" },
  { key: "hammer", icon: Hammer, label: "ก่อสร้าง" },
];

export const CATEGORY_COLORS = [
  "hsl(270,80%,75%)", // purple / lavender
  "hsl(45,90%,60%)",  // gold
  "hsl(350,75%,75%)", // pink
  "hsl(210,15%,70%)", // grey
  "hsl(200,80%,60%)", // sky blue
  "hsl(140,60%,55%)", // green
  "hsl(25,85%,60%)",  // orange
  "hsl(0,70%,60%)",   // red
];

export const DEFAULT_CATEGORIES: MaintenanceCategory[] = [
  { id: "air", name: "แอร์", icon: "snowflake", color: "hsl(270,80%,75%)" },
  { id: "electric", name: "ไฟฟ้า", icon: "zap", color: "hsl(45,90%,60%)" },
  { id: "housekeeping", name: "แม่บ้าน", icon: "paint-bucket", color: "hsl(350,75%,75%)" },
  { id: "shower", name: "ฝักบัว", icon: "shower-head", color: "hsl(210,15%,70%)" },
];

export function getIconComponent(iconKey: string): LucideIcon | null {
  return AVAILABLE_ICONS.find(i => i.key === iconKey)?.icon ?? null;
}

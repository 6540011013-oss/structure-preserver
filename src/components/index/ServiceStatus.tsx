import { MaintenanceCategory, getIconComponent } from "@/data/maintenanceCategories";

interface ServiceStatusProps {
  categories: MaintenanceCategory[];
  roomServices: Record<string, string[]>; // roomId -> array of category ids
}

export default function ServiceStatus({ categories, roomServices }: ServiceStatusProps) {
  // Count rooms per category
  const counts: Record<string, number> = {};
  for (const cat of categories) {
    counts[cat.id] = 0;
  }
  for (const services of Object.values(roomServices)) {
    for (const catId of services) {
      if (counts[catId] !== undefined) counts[catId]++;
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {categories.map(cat => {
        const IconComp = getIconComponent(cat.icon);
        const count = counts[cat.id] || 0;
        const isActive = count > 0;

        return (
          <div
            key={cat.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
            style={{
              border: `2px solid ${isActive ? cat.color : "hsl(220,10%,85%)"}`,
              background: isActive ? `${cat.color}15` : "hsl(220,10%,97%)",
            }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: isActive ? `${cat.color}30` : "hsl(220,10%,90%)",
              }}
            >
              {IconComp && (
                <IconComp
                  className="h-4.5 w-4.5"
                  style={{ color: isActive ? cat.color : "hsl(220,10%,60%)" }}
                  size={18}
                />
              )}
            </span>
            <span
              className="flex-1 text-sm font-semibold"
              style={{ color: isActive ? "hsl(220,20%,30%)" : "hsl(220,10%,55%)" }}
            >
              {cat.name}
            </span>
            <span
              className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold text-white min-w-[28px] text-center"
              style={{
                background: isActive ? cat.color : "hsl(220,10%,70%)",
              }}
            >
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

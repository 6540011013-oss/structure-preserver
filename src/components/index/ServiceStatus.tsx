import { MaintenanceCategory, getIconComponent } from "@/data/maintenanceCategories";

interface ServiceStatusProps {
  categories: MaintenanceCategory[];
  roomServices: Record<string, string[]>;
  activeFilter: string | null;
  onFilterChange: (catId: string) => void;
}

export default function ServiceStatus({ categories, roomServices, activeFilter, onFilterChange }: ServiceStatusProps) {
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
        const isActive = activeFilter === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onFilterChange(cat.id)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer border-none text-left"
            style={{
              border: `2px solid ${isActive ? "hsl(45,90%,55%)" : "hsl(220,10%,85%)"}`,
              background: isActive ? "hsl(45,90%,88%)" : "hsl(220,10%,97%)",
              boxShadow: isActive ? "0 2px 12px hsla(45,90%,50%,0.25)" : "none",
            }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: isActive ? `${cat.color}40` : "hsl(220,10%,90%)",
              }}
            >
              {IconComp && (
                <IconComp
                  size={18}
                  style={{ color: isActive ? cat.color : "hsl(220,10%,60%)" }}
                />
              )}
            </span>
            <span
              className="flex-1 text-sm font-semibold"
              style={{ color: isActive ? "hsl(220,20%,20%)" : "hsl(220,10%,55%)" }}
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
          </button>
        );
      })}
    </div>
  );
}

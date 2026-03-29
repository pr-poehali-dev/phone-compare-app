import { brands } from "@/data/phones";
import Icon from "@/components/ui/icon";

export interface Filters {
  brand: string;
  priceMin: number;
  priceMax: number;
  perfMin: number;
  sortBy: "price_asc" | "price_desc" | "performance" | "value" | "camera";
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (f: Filters) => void;
}

const sortOptions = [
  { value: "price_asc", label: "Цена ↑" },
  { value: "price_desc", label: "Цена ↓" },
  { value: "performance", label: "Мощность" },
  { value: "camera", label: "Камера" },
  { value: "value", label: "Ценность" },
];

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div
      className="rounded-xl border p-4 space-y-5"
      style={{ background: "rgba(0,245,255,0.02)", borderColor: "rgba(0,245,255,0.12)" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon name="SlidersHorizontal" size={14} style={{ color: "var(--neon-cyan)" }} />
        <span className="tag text-xs font-semibold" style={{ color: "var(--neon-cyan)" }}>Фильтры</span>
      </div>

      {/* Brand */}
      <div>
        <div className="text-xs text-muted-foreground mb-2">Бренд</div>
        <div className="flex flex-wrap gap-1.5">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => set({ brand: b })}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filters.brand === b
                  ? "btn-neon-solid"
                  : "btn-neon opacity-60 hover:opacity-100"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-muted-foreground">Цена</span>
          <span className="mono text-xs" style={{ color: "var(--neon-cyan)" }}>
            {filters.priceMin.toLocaleString("ru-RU")} — {filters.priceMax.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <input
          type="range"
          min={20000}
          max={150000}
          step={5000}
          value={filters.priceMin}
          onChange={(e) => set({ priceMin: +e.target.value })}
          className="w-full h-1 rounded-full appearance-none slider-thumb mb-1"
          style={{ accentColor: "var(--neon-cyan)", background: "rgba(0,245,255,0.15)" }}
        />
        <input
          type="range"
          min={20000}
          max={150000}
          step={5000}
          value={filters.priceMax}
          onChange={(e) => set({ priceMax: +e.target.value })}
          className="w-full h-1 rounded-full appearance-none slider-thumb"
          style={{ accentColor: "var(--neon-cyan)", background: "rgba(0,245,255,0.15)" }}
        />
      </div>

      {/* Performance */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-muted-foreground">Производительность от</span>
          <span className="mono text-xs" style={{ color: "var(--neon-green)" }}>{filters.perfMin}+</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={filters.perfMin}
          onChange={(e) => set({ perfMin: +e.target.value })}
          className="w-full h-1 rounded-full appearance-none"
          style={{ accentColor: "var(--neon-green)", background: "rgba(0,255,136,0.15)" }}
        />
      </div>

      {/* Sort */}
      <div>
        <div className="text-xs text-muted-foreground mb-2">Сортировка</div>
        <div className="flex flex-wrap gap-1.5">
          {sortOptions.map((s) => (
            <button
              key={s.value}
              onClick={() => set({ sortBy: s.value as Filters["sortBy"] })}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                filters.sortBy === s.value
                  ? "bg-white/10 border border-white/30 text-white"
                  : "border border-border text-muted-foreground hover:border-white/20"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

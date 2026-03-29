import { useState, useMemo } from "react";
import { phones, Phone } from "@/data/phones";
import PhoneCard from "@/components/PhoneCard";
import FilterPanel, { Filters } from "@/components/FilterPanel";
import ComparePanel from "@/components/ComparePanel";
import PriceTracker from "@/components/PriceTracker";
import Icon from "@/components/ui/icon";

const defaultFilters: Filters = {
  brand: "Все",
  priceMin: 20000,
  priceMax: 150000,
  perfMin: 0,
  sortBy: "value",
};

export default function Index() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [compared, setCompared] = useState<Phone[]>([]);
  const [tracked, setTracked] = useState<Phone[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = phones.filter((p) => {
      if (filters.brand !== "Все" && p.brand !== filters.brand) return false;
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (p.scores.performance < filters.perfMin) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (filters.sortBy === "price_asc") return a.price - b.price;
      if (filters.sortBy === "price_desc") return b.price - a.price;
      if (filters.sortBy === "performance") return b.scores.performance - a.scores.performance;
      if (filters.sortBy === "camera") return b.scores.camera - a.scores.camera;
      if (filters.sortBy === "value") return b.scores.value - a.scores.value;
      return 0;
    });

    return list;
  }, [filters]);

  const toggleCompare = (phone: Phone) => {
    setCompared((prev) => {
      if (prev.find((p) => p.id === phone.id)) return prev.filter((p) => p.id !== phone.id);
      if (prev.length >= 3) return prev;
      return [...prev, phone];
    });
  };

  const toggleTrack = (phone: Phone) => {
    setTracked((prev) =>
      prev.find((p) => p.id === phone.id) ? prev.filter((p) => p.id !== phone.id) : [...prev, phone]
    );
  };

  return (
    <div className="min-h-screen grid-bg" style={{ background: "hsl(var(--background))" }}>
      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="scan-line w-full h-32 absolute" />
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(4,8,16,0.85)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(0,245,255,0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)" }}
            >
              <Icon name="Zap" size={13} style={{ color: "var(--neon-cyan)" }} />
            </div>
            <span className="font-black text-lg tracking-tight" style={{ color: "var(--neon-cyan)" }}>
              PHONE<span className="text-white">X</span>
            </span>
            <span className="mono text-xs text-muted-foreground hidden sm:block">// сравниваем телефоны</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {compared.length > 0 && (
              <button
                onClick={() => setShowCompare(true)}
                className="btn-neon-solid flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
              >
                <Icon name="GitCompare" size={13} />
                Сравнить {compared.length}
              </button>
            )}
            <button
              onClick={() => setShowTracker(true)}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all ${
                tracked.length > 0
                  ? "border-purple-500/50 text-purple-400 bg-purple-500/10"
                  : "btn-neon opacity-70"
              }`}
            >
              <Icon name="BellRing" size={13} />
              {tracked.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ background: "var(--neon-purple)", color: "white", fontSize: "0.6rem" }}
                >
                  {tracked.length}
                </span>
              )}
              Цены
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sm:hidden btn-neon p-1.5 rounded-lg"
            >
              <Icon name="SlidersHorizontal" size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside
            className={`w-64 shrink-0 ${sidebarOpen ? "block" : "hidden"} sm:block`}
          >
            <div className="sticky top-20 space-y-4">
              <FilterPanel filters={filters} onChange={setFilters} />

              {/* Compare hint */}
              {compared.length > 0 && (
                <div
                  className="rounded-xl p-3 animate-fade-in"
                  style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.2)" }}
                >
                  <div className="tag text-xs mb-2" style={{ color: "var(--neon-cyan)" }}>
                    Выбрано для сравнения
                  </div>
                  <div className="space-y-1.5">
                    {compared.map((p) => (
                      <div key={p.id} className="flex items-center justify-between">
                        <span className="text-xs text-foreground truncate">{p.name}</span>
                        <button
                          onClick={() => toggleCompare(p)}
                          className="text-muted-foreground hover:text-white ml-2"
                        >
                          <Icon name="X" size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {compared.length >= 2 && (
                    <button
                      onClick={() => setShowCompare(true)}
                      className="btn-neon-solid w-full mt-3 py-1.5 rounded-lg text-xs"
                    >
                      Открыть сравнение
                    </button>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* Phones grid */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Найдено:</span>
                <span className="mono font-bold" style={{ color: "var(--neon-cyan)" }}>
                  {filtered.length}
                </span>
                <span className="text-sm text-muted-foreground">телефонов</span>
              </div>
              {compared.length > 0 && (
                <span className="mono text-xs text-muted-foreground">
                  {compared.length}/3 для сравнения
                </span>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Icon name="SearchX" size={32} className="text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Нет телефонов по заданным фильтрам</p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="btn-neon px-4 py-2 rounded-lg text-sm mt-3"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((phone) => (
                  <PhoneCard
                    key={phone.id}
                    phone={phone}
                    isCompared={!!compared.find((p) => p.id === phone.id)}
                    isTracked={!!tracked.find((p) => p.id === phone.id)}
                    onToggleCompare={toggleCompare}
                    onToggleTrack={toggleTrack}
                    compareCount={compared.length}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Compare overlay */}
      {showCompare && (
        <ComparePanel
          phones={compared}
          onRemove={(id) => setCompared((prev) => prev.filter((p) => p.id !== id))}
          onClose={() => setShowCompare(false)}
        />
      )}

      {/* Price tracker overlay */}
      {showTracker && (
        <PriceTracker
          trackedPhones={tracked}
          onRemove={(id) => setTracked((prev) => prev.filter((p) => p.id !== id))}
          onClose={() => setShowTracker(false)}
        />
      )}
    </div>
  );
}

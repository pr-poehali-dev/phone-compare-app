import { Phone } from "@/data/phones";
import Icon from "@/components/ui/icon";

interface PriceTrackerProps {
  trackedPhones: Phone[];
  onRemove: (id: number) => void;
  onClose: () => void;
}

export default function PriceTracker({ trackedPhones, onRemove, onClose }: PriceTrackerProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(4, 8, 16, 0.97)", backdropFilter: "blur(16px)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "rgba(168,85,247,0.2)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}
          >
            <Icon name="BellRing" size={14} style={{ color: "var(--neon-purple)" }} />
          </div>
          <div>
            <h2 className="font-bold text-base text-foreground">Отслеживание цен</h2>
            <p className="tag text-xs text-muted-foreground">{trackedPhones.length} моделей отслеживается</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:border-white/30 hover:text-white transition-all"
        >
          <Icon name="X" size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {trackedPhones.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}
              >
                <Icon name="Bell" size={24} style={{ color: "var(--neon-purple)" }} />
              </div>
              <p className="text-muted-foreground text-sm mb-1">Нет отслеживаемых телефонов</p>
              <p className="text-xs text-muted-foreground opacity-60">
                Нажми 🔔 на карточке телефона, чтобы добавить
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {trackedPhones.map((phone) => {
                const history = phone.priceHistory;
                const latest = history[history.length - 1].price;
                const prev = history[history.length - 2]?.price ?? latest;
                const diff = latest - prev;
                const diffPct = ((diff / prev) * 100).toFixed(1);
                const isDown = diff < 0;
                const allMin = Math.min(...history.map((h) => h.price));
                const allMax = Math.max(...history.map((h) => h.price));

                return (
                  <div
                    key={phone.id}
                    className="rounded-xl p-4 animate-fade-in"
                    style={{ background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.2)" }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                          style={{ background: "rgba(168,85,247,0.1)" }}
                        >
                          {phone.image}
                        </div>
                        <div>
                          <div className="mono text-xs text-muted-foreground">{phone.brand}</div>
                          <div className="font-bold text-sm text-foreground">{phone.name}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemove(phone.id)}
                        className="text-muted-foreground hover:text-white transition-colors"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>

                    {/* Price stats */}
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div
                        className="rounded-lg p-2.5 text-center"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <div className="mono text-xs text-muted-foreground mb-0.5">Сейчас</div>
                        <div className="font-bold text-sm" style={{ color: "var(--neon-cyan)" }}>
                          {latest.toLocaleString("ru-RU")} ₽
                        </div>
                      </div>
                      <div
                        className="rounded-lg p-2.5 text-center"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <div className="mono text-xs text-muted-foreground mb-0.5">Минимум</div>
                        <div className="font-bold text-sm" style={{ color: "var(--neon-green)" }}>
                          {allMin.toLocaleString("ru-RU")} ₽
                        </div>
                      </div>
                      <div
                        className="rounded-lg p-2.5 text-center"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <div className="mono text-xs text-muted-foreground mb-0.5">Изменение</div>
                        <div
                          className="font-bold text-sm"
                          style={{ color: isDown ? "var(--neon-green)" : "#ef4444" }}
                        >
                          {isDown ? "▼" : "▲"} {Math.abs(Number(diffPct))}%
                        </div>
                      </div>
                    </div>

                    {/* Price history chart (simple bars) */}
                    <div>
                      <div className="tag text-xs text-muted-foreground mb-2">История цен</div>
                      <div className="flex items-end gap-1.5 h-12">
                        {history.map((h, i) => {
                          const heightPct = ((h.price - allMin) / (allMax - allMin + 1)) * 80 + 20;
                          const isLatest = i === history.length - 1;
                          return (
                            <div key={h.date} className="flex flex-col items-center gap-1 flex-1">
                              <div
                                className="w-full rounded-sm transition-all"
                                style={{
                                  height: `${heightPct}%`,
                                  background: isLatest
                                    ? "var(--neon-cyan)"
                                    : "rgba(0,245,255,0.25)",
                                  minHeight: 4,
                                }}
                                title={`${h.date}: ${h.price.toLocaleString("ru-RU")} ₽`}
                              />
                              <div className="mono text-xs text-muted-foreground" style={{ fontSize: "0.55rem" }}>
                                {h.date.slice(2, 7)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Alert hint */}
                    <div
                      className="mt-3 rounded-lg px-3 py-2 flex items-center gap-2"
                      style={{
                        background: isDown ? "rgba(0,255,136,0.06)" : "rgba(168,85,247,0.06)",
                        border: `1px solid ${isDown ? "rgba(0,255,136,0.2)" : "rgba(168,85,247,0.2)"}`,
                      }}
                    >
                      <Icon
                        name={isDown ? "TrendingDown" : "BellRing"}
                        size={12}
                        style={{ color: isDown ? "var(--neon-green)" : "var(--neon-purple)" }}
                      />
                      <span className="text-xs" style={{ color: isDown ? "var(--neon-green)" : "var(--neon-purple)" }}>
                        {isDown
                          ? `Цена снизилась на ${Math.abs(diff).toLocaleString("ru-RU")} ₽ — хороший момент для покупки!`
                          : `Мин. цена была ${allMin.toLocaleString("ru-RU")} ₽ — сейчас выше на ${(latest - allMin).toLocaleString("ru-RU")} ₽`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

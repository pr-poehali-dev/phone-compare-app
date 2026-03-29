import { Phone } from "@/data/phones";
import Icon from "@/components/ui/icon";

interface ComparePanelProps {
  phones: Phone[];
  onRemove: (id: number) => void;
  onClose: () => void;
}

const scoreColor = (score: number) => {
  if (score >= 90) return "#00ff88";
  if (score >= 75) return "#00f5ff";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
};

const rows: { label: string; key: keyof Phone | string; format?: (v: unknown) => string }[] = [
  { label: "Цена", key: "price", format: (v) => `${Number(v).toLocaleString("ru-RU")} ₽` },
  { label: "Чипсет", key: "chip" },
  { label: "RAM", key: "ram", format: (v) => `${v} ГБ` },
  { label: "Хранилище", key: "storage", format: (v) => `${v} ГБ` },
  { label: "Батарея", key: "battery", format: (v) => `${v} мАч` },
  { label: "Камера", key: "camera", format: (v) => `${v} Мп` },
  { label: "Экран", key: "screen", format: (v) => `${v}"` },
  { label: "ОС", key: "os" },
  { label: "Год", key: "year" },
];

const scoreRows = [
  { label: "Производительность", key: "performance" as const },
  { label: "Камера", key: "camera" as const },
  { label: "Батарея", key: "battery" as const },
  { label: "Ценность", key: "value" as const },
];

function getBest(phones: Phone[], key: keyof Phone): number {
  const vals = phones.map((p) => Number(p[key]));
  return Math.max(...vals);
}

function getScoreBest(phones: Phone[], key: keyof Phone["scores"]): number {
  return Math.max(...phones.map((p) => p.scores[key]));
}

export default function ComparePanel({ phones, onRemove, onClose }: ComparePanelProps) {
  if (phones.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(4, 8, 16, 0.97)", backdropFilter: "blur(16px)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: "rgba(0,245,255,0.15)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)" }}
          >
            <Icon name="GitCompare" size={14} style={{ color: "var(--neon-cyan)" }} />
          </div>
          <div>
            <h2 className="font-bold text-base text-foreground">Сравнение телефонов</h2>
            <p className="tag text-xs text-muted-foreground">{phones.length} из 3 выбрано</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:border-white/30 hover:text-white transition-all"
        >
          <Icon name="X" size={14} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="max-w-5xl mx-auto">
          {/* Phone headers */}
          <div
            className="grid gap-3 mb-4"
            style={{ gridTemplateColumns: `160px repeat(${phones.length}, 1fr)` }}
          >
            <div />
            {phones.map((phone) => (
              <div
                key={phone.id}
                className="rounded-xl p-3 text-center relative"
                style={{ background: "rgba(0,245,255,0.04)", border: "1px solid rgba(0,245,255,0.2)" }}
              >
                <button
                  onClick={() => onRemove(phone.id)}
                  className="absolute top-2 right-2 w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-white transition-colors"
                >
                  <Icon name="X" size={10} />
                </button>
                <div className="text-3xl mb-1">{phone.image}</div>
                <div className="mono text-xs text-muted-foreground">{phone.brand}</div>
                <div className="font-bold text-sm text-foreground leading-tight">{phone.name}</div>
                <div className="font-bold text-base mt-1" style={{ color: "var(--neon-cyan)" }}>
                  {phone.price.toLocaleString("ru-RU")} ₽
                </div>
              </div>
            ))}
          </div>

          {/* Score bars */}
          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="tag text-xs text-muted-foreground mb-3">Оценки</div>
            {scoreRows.map(({ label, key }) => {
              const best = getScoreBest(phones, key);
              return (
                <div
                  key={key}
                  className="grid items-center gap-3 mb-3"
                  style={{ gridTemplateColumns: `160px repeat(${phones.length}, 1fr)` }}
                >
                  <div className="text-xs text-muted-foreground">{label}</div>
                  {phones.map((phone) => {
                    const val = phone.scores[key];
                    const isBest = val === best;
                    return (
                      <div key={phone.id}>
                        <div className="flex justify-between mb-1">
                          <span
                            className="mono text-xs font-bold"
                            style={{ color: isBest ? "var(--neon-green)" : scoreColor(val) }}
                          >
                            {val}
                            {isBest && " ★"}
                          </span>
                        </div>
                        <div className="score-bar">
                          <div
                            className="score-fill"
                            style={{
                              width: `${val}%`,
                              background: isBest
                                ? "linear-gradient(90deg, #00ff8888, #00ff88)"
                                : `linear-gradient(90deg, ${scoreColor(val)}55, ${scoreColor(val)})`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Specs table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="tag text-xs text-muted-foreground px-4 pt-4 pb-2">Характеристики</div>
            {rows.map((row, i) => {
              const bestNum =
                ["price", "ram", "storage", "battery", "camera"].includes(row.key as string)
                  ? getBest(phones, row.key as keyof Phone)
                  : null;

              return (
                <div
                  key={row.key as string}
                  className="grid items-center gap-3 px-4 py-2.5"
                  style={{
                    gridTemplateColumns: `160px repeat(${phones.length}, 1fr)`,
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                  }}
                >
                  <div className="text-xs text-muted-foreground">{row.label}</div>
                  {phones.map((phone) => {
                    const raw = phone[row.key as keyof Phone];
                    const val = row.format ? row.format(raw) : String(raw);
                    const isBest = bestNum !== null && Number(raw) === bestNum && row.key !== "price";
                    return (
                      <div
                        key={phone.id}
                        className="mono text-xs font-medium"
                        style={{ color: isBest ? "var(--neon-green)" : "hsl(var(--foreground))" }}
                      >
                        {val}
                        {isBest && " ★"}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

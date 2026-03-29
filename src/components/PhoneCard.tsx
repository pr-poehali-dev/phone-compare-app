import Icon from "@/components/ui/icon";
import { Phone } from "@/data/phones";

interface PhoneCardProps {
  phone: Phone;
  isCompared: boolean;
  isTracked: boolean;
  onToggleCompare: (phone: Phone) => void;
  onToggleTrack: (phone: Phone) => void;
  compareCount: number;
}

const scoreColor = (score: number) => {
  if (score >= 90) return "#00ff88";
  if (score >= 75) return "#00f5ff";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
};

export default function PhoneCard({
  phone,
  isCompared,
  isTracked,
  onToggleCompare,
  onToggleTrack,
  compareCount,
}: PhoneCardProps) {
  const canCompare = isCompared || compareCount < 3;

  return (
    <div
      className={`relative rounded-xl border bg-card p-4 card-hover cursor-default animate-fade-in ${
        isCompared ? "compare-selected border-2" : "border"
      } ${isTracked && !isCompared ? "tracked" : ""}`}
    >
      {phone.tag && (
        <span
          className="tag absolute top-3 right-3 px-2 py-0.5 rounded"
          style={{
            background: "rgba(0,245,255,0.1)",
            color: "var(--neon-cyan)",
            border: "1px solid rgba(0,245,255,0.3)",
          }}
        >
          {phone.tag}
        </span>
      )}

      {/* Phone visual */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
          style={{ background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.15)" }}
        >
          {phone.image}
        </div>
        <div>
          <div className="mono text-xs text-muted-foreground mb-0.5">{phone.brand}</div>
          <div className="font-bold text-sm leading-tight text-foreground">{phone.name}</div>
          <div className="font-bold text-lg mt-0.5" style={{ color: "var(--neon-cyan)" }}>
            {phone.price.toLocaleString("ru-RU")} ₽
          </div>
        </div>
      </div>

      {/* Scores */}
      <div className="space-y-1.5 mb-4">
        {[
          { label: "Производительность", key: "performance" as const },
          { label: "Камера", key: "camera" as const },
          { label: "Батарея", key: "battery" as const },
          { label: "Ценность", key: "value" as const },
        ].map(({ label, key }) => (
          <div key={key}>
            <div className="flex justify-between mb-0.5">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="mono text-xs font-medium" style={{ color: scoreColor(phone.scores[key]) }}>
                {phone.scores[key]}
              </span>
            </div>
            <div className="score-bar">
              <div
                className="score-fill"
                style={{
                  width: `${phone.scores[key]}%`,
                  background: `linear-gradient(90deg, ${scoreColor(phone.scores[key])}88, ${scoreColor(phone.scores[key])})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {[
          { icon: "Cpu", label: phone.chip },
          { icon: "MemoryStick", label: `${phone.ram} ГБ RAM` },
          { icon: "HardDrive", label: `${phone.storage} ГБ` },
          { icon: "Battery", label: `${phone.battery} мАч` },
        ].map((spec) => (
          <div
            key={spec.label}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Icon name={spec.icon as any} size={12} className="text-muted-foreground shrink-0" />
            <span className="mono text-xs text-muted-foreground truncate">{spec.label}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => canCompare && onToggleCompare(phone)}
          disabled={!canCompare}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            isCompared
              ? "btn-neon-solid"
              : canCompare
              ? "btn-neon"
              : "opacity-30 cursor-not-allowed border border-border text-muted-foreground"
          }`}
        >
          {isCompared ? "✓ Сравниваю" : "Сравнить"}
        </button>
        <button
          onClick={() => onToggleTrack(phone)}
          title={isTracked ? "Убрать из отслеживаемых" : "Отслеживать цену"}
          className={`px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
            isTracked
              ? "border-purple-500 bg-purple-500/10 text-purple-400"
              : "border-border text-muted-foreground hover:border-purple-500/50 hover:text-purple-400"
          }`}
        >
          <Icon name={isTracked ? "BellRing" : "Bell"} size={14} />
        </button>
      </div>
    </div>
  );
}

interface StatItem {
  label: string;
  value: string;
  color: string;
}

interface StatsBarProps {
  stats: StatItem[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="bg-green-soft border-y border-border">
      <div className="max-w-content mx-auto px-5 py-12 md2:py-16 grid grid-cols-2 md2:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            <div
              className="font-display font-extrabold text-3xl md2:text-4xl mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-text-secondary font-display font-bold text-sm md2:text-base">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

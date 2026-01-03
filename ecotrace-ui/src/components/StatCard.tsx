interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  trend: number;
  color: "emerald" | "blue" | "orange";
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  trend,
  color,
}) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white p-8 rounded-4xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow group">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${colors[color]}`}
      >
        {label.includes("Carbon")
          ? "🌱"
          : label.includes("Target")
          ? "🎯"
          : "🌳"}
      </div>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <div className="flex items-baseline gap-2 mt-2">
        <h2 className="text-5xl font-black text-slate-900">{value}</h2>
        <span className="text-lg font-medium text-slate-500">{unit}</span>
      </div>
      {trend !== 0 && (
        <div
          className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
            trend < 0
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last month
        </div>
      )}
    </div>
  );
};

export default StatCard;

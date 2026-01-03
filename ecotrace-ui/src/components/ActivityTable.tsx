import React from "react";

const ActivityTable: React.FC = () => {
  const activities = [
    {
      id: "1",
      category: "Transport",
      label: "Commute (EV)",
      value: "1.2 kg",
      date: "Oct 24",
      icon: "🚗",
      color: "blue",
      impact: "low",
    },
    {
      id: "2",
      category: "Food",
      label: "Vegan Lunch",
      value: "0.4 kg",
      date: "Oct 24",
      icon: "🥗",
      color: "green",
      impact: "low",
    },
    {
      id: "3",
      category: "Energy",
      label: "AC usage (4h)",
      value: "4.8 kg",
      date: "Oct 23",
      icon: "⚡",
      color: "yellow",
      impact: "high",
    },
  ];

  const getCategoryStyles = (category: string) => {
    const styles = {
      Transport: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-200",
      },
      Food: {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-200",
      },
      Energy: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        border: "border-yellow-200",
      },
    };
    return styles[category as keyof typeof styles] || styles.Transport;
  };

  const getImpactBadge = (impact: string) => {
    if (impact === "high") {
      return (
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-red-600">High</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-xs font-bold text-green-600">Low</span>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto -mx-8 px-8">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="pb-4 pt-2 font-bold text-slate-700 text-sm uppercase tracking-wider pl-4">
              Activity
            </th>
            <th className="pb-4 pt-2 font-bold text-slate-700 text-sm uppercase tracking-wider">
              Category
            </th>
            <th className="pb-4 pt-2 font-bold text-slate-700 text-sm uppercase tracking-wider">
              Impact
            </th>
            <th className="pb-4 pt-2 font-bold text-slate-700 text-sm uppercase tracking-wider text-right pr-4">
              CO₂e
            </th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item, index) => {
            const categoryStyle = getCategoryStyles(item.category);
            return (
              <tr
                key={item.id}
                className="group"
                style={{
                  animation: `fadeIn 0.3s ease-in-out ${index * 0.1}s both`,
                }}
              >
                {/* Activity Column */}
                <td className="py-5 pl-4 relative">
                  <div className="absolute inset-0 bg-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-l-2xl"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div
                      className={`
                      w-12 h-12 rounded-2xl ${categoryStyle.bg} border ${categoryStyle.border}
                      flex items-center justify-center text-xl
                      group-hover:scale-110 transition-transform duration-300 shadow-sm
                    `}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {item.date}
                      </div>
                    </div>
                  </div>
                  {index < activities.length - 1 && (
                    <div className="absolute bottom-0 left-4 right-0 h-px bg-slate-100"></div>
                  )}
                </td>

                {/* Category Column */}
                <td className="py-5 relative">
                  <div className="absolute inset-0 bg-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span
                    className={`
                    relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide
                    ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}
                    shadow-sm group-hover:shadow-md transition-all duration-200
                  `}
                  >
                    {item.category}
                  </span>
                  {index < activities.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100"></div>
                  )}
                </td>

                {/* Impact Column */}
                <td className="py-5 relative">
                  <div className="absolute inset-0 bg-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative z-10">
                    {getImpactBadge(item.impact)}
                  </div>
                  {index < activities.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100"></div>
                  )}
                </td>

                {/* CO2e Column */}
                <td className="py-5 text-right pr-4 relative">
                  <div className="absolute inset-0 bg-slate-50/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-r-2xl"></div>
                  <div className="inline-flex flex-col items-end relative z-10">
                    <span className="font-bold text-slate-900 text-lg">
                      {item.value}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      Carbon
                    </span>
                  </div>
                  {index < activities.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-4 h-px bg-slate-100"></div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Empty State (optional - can be shown when no activities) */}
      {activities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-4">
            <span className="text-4xl">📊</span>
          </div>
          <p className="text-slate-600 font-semibold text-lg mb-2">
            No activities yet
          </p>
          <p className="text-slate-500 text-sm">
            Start tracking your carbon footprint by adding an activity
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ActivityTable;

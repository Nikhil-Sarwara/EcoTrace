const ActivityTable: React.FC = () => {
  const activities = [
    {
      id: "1",
      category: "Transport",
      label: "Commute (EV)",
      value: "1.2 kg",
      date: "Oct 24",
    },
    {
      id: "2",
      category: "Food",
      label: "Vegan Lunch",
      value: "0.4 kg",
      date: "Oct 24",
    },
    {
      id: "3",
      category: "Energy",
      label: "AC usage (4h)",
      value: "4.8 kg",
      date: "Oct 23",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="pb-3 font-semibold text-slate-600">Activity</th>
            <th className="pb-3 font-semibold text-slate-600">Category</th>
            <th className="pb-3 font-semibold text-slate-600 text-right">
              CO2e
            </th>
          </tr>
        </thead>
        <tbody>
          {activities.map((item) => (
            <tr
              key={item.id}
              className="border-b border-slate-50 last:border-0"
            >
              <td className="py-4 text-slate-800">{item.label}</td>
              <td className="py-4">
                <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 uppercase">
                  {item.category}
                </span>
              </td>
              <td className="py-4 text-right font-medium text-slate-900">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;

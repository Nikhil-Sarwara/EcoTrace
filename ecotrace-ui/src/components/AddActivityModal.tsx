import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
}

const AddActivityModal: React.FC<ModalProps> = ({ onClose }) => {
  const [category, setCategory] = useState<"transport" | "energy" | "food">(
    "transport"
  );

  // Common State
  const [label, setLabel] = useState("");

  // Transport State
  const [distance, setDistance] = useState("");
  const [vehicleType, setVehicleType] = useState("petrol-car");

  // Energy State
  const [energyType, setEnergyType] = useState("electricity");
  const [usageValue, setUsageValue] = useState(""); // kWh or units

  // Food State
  const [dietType, setDietType] = useState("omnivore");
  const [servings, setServings] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This object contains all data needed for your .NET backend calculation
    const payload = {
      category,
      label,
      details: {
        transport:
          category === "transport"
            ? { distance: Number(distance), vehicleType }
            : null,
        energy:
          category === "energy"
            ? { usageValue: Number(usageValue), energyType }
            : null,
        food:
          category === "food" ? { dietType, servings: Number(servings) } : null,
      },
    };
    console.log("Activity Submitted:", payload);
    onClose();
  };

  const categoryInfo = {
    transport: { emoji: "🚗", color: "blue", label: "Transport" },
    energy: { emoji: "⚡", color: "yellow", label: "Energy" },
    food: { emoji: "🥗", color: "green", label: "Food" },
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200/60 animate-in zoom-in-95 duration-300">
        {/* Header with Gradient */}
        <div className="relative p-8 border-b border-slate-100 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-2xl -ml-12 -mb-12"></div>

          <div className="relative flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                Add New Activity
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Track your environmental impact
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-white/80 hover:bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all text-2xl font-light flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-7">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Select Category
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["transport", "energy", "food"] as const).map((cat) => {
                const info = categoryInfo[cat];
                const isActive = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`
                      relative py-4 px-3 rounded-2xl border-2 text-sm font-bold transition-all duration-300 overflow-hidden group
                      ${
                        isActive
                          ? "bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-500 text-white shadow-xl shadow-emerald-500/30 scale-105"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-lg hover:scale-102"
                      }
                    `}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                    <span
                      className={`text-3xl block mb-2 transform group-hover:scale-110 transition-transform duration-300 ${
                        isActive ? "animate-bounce" : ""
                      }`}
                    >
                      {info.emoji}
                    </span>
                    <span className="block capitalize relative">
                      {info.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
              <span className="text-lg">📝</span>
              What did you do?
            </label>
            <input
              type="text"
              placeholder="e.g. Flight to Mumbai, Monthly Gas Bill..."
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 text-slate-900 placeholder:text-slate-400 font-medium"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>

          {/* Transport Fields */}
          {category === "transport" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <span className="text-base">🚘</span>
                    Vehicle Type
                  </label>
                  <select
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-slate-900 font-medium cursor-pointer appearance-none bg-no-repeat bg-right pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: "1.5rem",
                      backgroundPosition: "right 0.75rem center",
                    }}
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="petrol-car">🚗 Petrol Car</option>
                    <option value="ev">⚡ Electric Car</option>
                    <option value="bus">🚌 Public Bus</option>
                    <option value="flight">✈️ Flight</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <span className="text-base">📏</span>
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-slate-900 font-medium"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Energy Fields */}
          {category === "energy" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <span className="text-base">💡</span>
                    Energy Source
                  </label>
                  <select
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all duration-300 text-slate-900 font-medium cursor-pointer appearance-none bg-no-repeat bg-right pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: "1.5rem",
                      backgroundPosition: "right 0.75rem center",
                    }}
                    value={energyType}
                    onChange={(e) => setEnergyType(e.target.value)}
                  >
                    <option value="electricity">⚡ Electricity</option>
                    <option value="gas">🔥 Natural Gas</option>
                    <option value="solar">☀️ Solar</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <span className="text-base">📊</span>
                    Usage (kWh)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all duration-300 text-slate-900 font-medium"
                    value={usageValue}
                    onChange={(e) => setUsageValue(e.target.value)}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Food Fields */}
          {category === "food" && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <span className="text-base">🍽️</span>
                    Diet Type
                  </label>
                  <select
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300 text-slate-900 font-medium cursor-pointer appearance-none bg-no-repeat bg-right pr-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: "1.5rem",
                      backgroundPosition: "right 0.75rem center",
                    }}
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                  >
                    <option value="vegan">🌱 Vegan</option>
                    <option value="vegetarian">🥬 Vegetarian</option>
                    <option value="omnivore">🍖 Meat (Average)</option>
                    <option value="heavy-meat">🥩 Meat (High)</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-3">
                    <span className="text-base">🍴</span>
                    Servings
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all duration-300 text-slate-900 font-medium"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    placeholder="1"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-5 rounded-2xl mt-6 transition-all duration-300 shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <span className="relative text-lg">Calculate & Log Activity</span>
            <svg
              className="relative w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;

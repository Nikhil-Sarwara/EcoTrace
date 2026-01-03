import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
}

const AddActivityModal: React.FC<ModalProps> = ({ onClose }) => {
  const [category, setCategory] = useState<"transport" | "energy" | "food">("transport");

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
        transport: category === "transport" ? { distance: Number(distance), vehicleType } : null,
        energy: category === "energy" ? { usageValue: Number(usageValue), energyType } : null,
        food: category === "food" ? { dietType, servings: Number(servings) } : null,
      }
    };

    console.log("Activity Submitted:", payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden border border-slate-100">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Add New Activity</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Select Category</label>
            <div className="grid grid-cols-3 gap-3">
              {(["transport", "energy", "food"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-3 px-2 rounded-2xl border-2 text-sm font-bold capitalize transition-all ${
                    category === cat
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100"
                      : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                  }`}
                >
                  {cat === 'transport' ? '🚗' : cat === 'energy' ? '⚡' : '🥗'} 
                  <span className="block mt-1">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Name */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">What did you do?</label>
            <input
              type="text"
              placeholder="e.g. Flight to Mumbai, Monthly Gas Bill..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 border border-slate-100 outline-none transition-all"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>

          {/* Transport Fields */}
          {category === "transport" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Vehicle</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="petrol-car">Petrol Car</option>
                    <option value="ev">EV</option>
                    <option value="bus">Public Bus</option>
                    <option value="flight">Flight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Distance (km)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Energy Fields */}
          {category === "energy" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
               <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Energy Source</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none"
                    value={energyType}
                    onChange={(e) => setEnergyType(e.target.value)}
                  >
                    <option value="electricity">Electricity</option>
                    <option value="gas">Natural Gas</option>
                    <option value="solar">Solar (Low Impact)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Usage (kWh)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none"
                    value={usageValue}
                    onChange={(e) => setUsageValue(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Food Fields */}
          {category === "food" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Diet Type</label>
                  <select
                    className="w-100 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none"
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value)}
                  >
                    <option value="vegan">Vegan</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="omnivore">Meat (Average)</option>
                    <option value="heavy-meat">Meat (High)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Servings</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl mt-4 transition-all shadow-xl shadow-emerald-200 active:scale-95"
          >
            Calculate & Log Activity
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;
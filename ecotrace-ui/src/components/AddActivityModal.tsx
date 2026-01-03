import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
}

const AddActivityModal: React.FC<ModalProps> = ({ onClose }) => {
  const [category, setCategory] = useState<"transport" | "energy" | "food">(
    "transport"
  );

  // Form State
  const [label, setLabel] = useState("");
  const [distance, setDistance] = useState("");
  const [vehicleType, setVehicleType] = useState("petrol-car");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to calculate emission based on constants will go here
    console.log({ category, label, distance, vehicleType });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Add New Activity</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["transport", "energy", "food"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium capitalize transition-all ${
                    category === cat
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Common Field: Label */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Activity Name
            </label>
            <input
              type="text"
              placeholder="e.g. Morning Commute"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>

          {/* Conditional Fields: Transport */}
          {category === "transport" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-1">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option value="petrol-car">Petrol Car</option>
                  <option value="ev">Electric Vehicle</option>
                  <option value="bus">Public Bus</option>
                  <option value="bike">Motorcycle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Distance (km)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Conditional Fields: Food (Placeholder for now) */}
          {category === "food" && (
            <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-center text-slate-500 text-sm">
              Food specific inputs (Meal type, servings) coming soon...
            </div>
          )}

          {/* Conditional Fields: Energy (Placeholder for now) */}
          {category === "energy" && (
            <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-center text-slate-500 text-sm">
              Energy specific inputs (kWh, bill amount) coming soon...
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl mt-4 transition-colors shadow-lg shadow-emerald-100"
          >
            Calculate & Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddActivityModal;

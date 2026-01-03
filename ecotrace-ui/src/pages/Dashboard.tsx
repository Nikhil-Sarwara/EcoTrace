import React, { useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import ActivityTable from "../components/ActivityTable";
import AddActivityModal from "../components/AddActivityModal";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Impact
          </h1>
          <p className="text-slate-500 mt-1 text-lg">
            Every small action counts towards a greener planet.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-200 flex items-center gap-2"
        >
          <span className="text-xl">+</span> Add Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          label="Total Carbon"
          value="420"
          unit="kg"
          trend={-12}
          color="emerald"
        />
        <StatCard
          label="Monthly Target"
          value="500"
          unit="kg"
          trend={5}
          color="blue"
        />
        <StatCard
          label="Offset Progress"
          value="21"
          unit="Trees"
          trend={0}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-slate-800">
              Activity Log
            </h3>
            <ActivityTable />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm h-full">
            <h3 className="text-xl font-bold mb-6 text-slate-800">
              Quick Analytics
            </h3>
            <div className="aspect-square flex items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 relative overflow-hidden">
              <div className="text-center p-6">
                <p className="text-slate-400 font-medium">Coming Soon</p>
                <p className="text-xs text-slate-400 mt-1">
                  Dynamic charts with Recharts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddActivityModal onClose={() => setIsModalOpen(false)} />
      )}
    </Layout>
  );
};

export default Dashboard;

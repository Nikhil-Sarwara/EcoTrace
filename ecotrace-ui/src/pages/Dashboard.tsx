import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import ActivityTable from "../components/ActivityTable";
import AddActivityModal from "../components/AddActivityModal";
import { activityService } from "../services/api";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const mapActivitiesToUI = (backendData: any[]) => {
    return backendData.map((item) => ({
      id: item.id.toString(),
      category: item.category,
      label: item.name, 
      value: `${item.totalCO2.toFixed(1)} kg`, 
      // Format date to "Oct 24"
      date: new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      // Assign icon based on category
      icon:
        item.category === "Transport"
          ? "🚗"
          : item.category === "Food"
          ? "🥗"
          : "⚡",
      // Determine impact (e.g., if > 5kg, it's high)
      impact: item.totalCO2 > 5 ? "high" : "low",
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch both simultaneously for speed
        const [summaryData, rawActivities] = await Promise.all([
          activityService.getSummary(),
          activityService.getActivities(),
        ]);

        setSummary(summaryData);

        const formattedActivities = mapActivitiesToUI(rawActivities);
        setActivityLog(formattedActivities);
      } catch (err) {
        console.error("Integration Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  if (loading)
    return (
      <div className="p-10 text-center text-slate-500">Loading Impact...</div>
    );

  return (
    <Layout>
      {/* Hero Section with Gradient Background */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl -z-10 opacity-60"></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-8 md:p-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-700">
                Live Tracking
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Your Impact
            </h1>
            <p className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl">
              Every small action counts towards a greener planet.
              <span className="text-emerald-600 font-semibold">
                {" "}
                Track, analyze, and reduce
              </span>{" "}
              your carbon footprint.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-300/50 hover:shadow-emerald-400/60 flex items-center justify-center gap-3 min-w-fit overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <span className="text-2xl font-bold">+</span>
            <span className="text-base">Add Activity</span>
          </button>
        </div>
      </div>

      {/* Stats Grid with Enhanced Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          label="Total Carbon"
          value={summary?.totalEmissions.toString() || "0"}
          unit="kg"
          trend={-12}
          color="emerald"
        />
        <StatCard
          label="Monthly Target"
          value="0"
          unit="kg"
          trend={5}
          color="blue"
        />
        <StatCard
          label="Offset Progress"
          value={summary?.treeEquivalent.toString() || "0"}
          unit="Trees"
          trend={0}
          color="orange"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Activity Log Section */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-4xl border border-slate-200/80 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  Activity Log
                </h3>
                <p className="text-sm text-slate-500">
                  Your recent environmental activities
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-2xl">
                <svg
                  className="w-6 h-6 text-emerald-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <ActivityTable activities={activityLog} />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-4xl border border-slate-200/80 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 h-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  Quick Analytics
                </h3>
                <p className="text-sm text-slate-500">
                  Visual insights at a glance
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-2xl">
                <svg
                  className="w-6 h-6 text-blue-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>

            <div className="relative aspect-square flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 rounded-3xl border-2 border-dashed border-slate-300/60 overflow-hidden group hover:border-emerald-300/60 transition-colors duration-300">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/0 via-teal-100/20 to-cyan-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating decorative circles */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-12 left-12 w-32 h-32 bg-gradient-to-br from-blue-200/40 to-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>

              <div className="relative text-center p-8 z-10">
                <div className="mb-6 inline-flex p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg">
                  <svg
                    className="w-16 h-16 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <p className="text-slate-700 font-bold text-xl mb-2">
                  Coming Soon
                </p>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Dynamic charts and visualizations
                  <br />
                  powered by{" "}
                  <span className="text-emerald-600 font-semibold">
                    Recharts
                  </span>
                </p>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddActivityModal onClose={() => setIsModalOpen(false)} />
      )}
    </Layout>
  );
};

export default Dashboard;

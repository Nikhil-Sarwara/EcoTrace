import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/40">
      {/* Sidebar */}
      <aside className="w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200/80 hidden md:flex flex-col fixed h-full shadow-2xl shadow-slate-200/50">
        {/* Logo Section */}
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-emerald-500/30 transform hover:scale-105 transition-transform duration-300">
                E
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <div className="text-emerald-600 font-black text-2xl tracking-tight leading-none">
                EcoTrace
              </div>
              <div className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                Carbon Tracker
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-6 space-y-2 overflow-y-auto">
          <div className="mb-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-3">
              Menu
            </p>
            <NavItem label="Dashboard" icon="📊" active />
            <NavItem label="History" icon="🕒" />
            <NavItem label="Analytics" icon="📈" />
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-3">
              Account
            </p>
            <NavItem label="Settings" icon="⚙️" />
          </div>
        </nav>

        {/* Pro Tip Card */}
        <div className="p-5 border-t border-slate-100">
          <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-5 rounded-2xl border border-emerald-200/50 shadow-lg shadow-emerald-100/50 overflow-hidden group hover:shadow-xl hover:shadow-emerald-200/50 transition-all duration-300">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200/40 to-teal-200/40 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-cyan-200/40 to-blue-200/40 rounded-full blur-2xl -ml-8 -mb-8"></div>

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">💡</span>
                </div>
                <p className="text-xs font-black text-emerald-900 uppercase tracking-wide">
                  Pro Tip
                </p>
              </div>
              <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                Switching to LED bulbs can save up to{" "}
                <span className="font-bold text-emerald-900">75% energy</span>!
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 transition-all duration-300">
        {/* Header */}
        <header className="h-20 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm font-medium text-slate-500">
                Welcome back,{" "}
                <span className="text-slate-900 font-bold">Kanishq</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors duration-200 group">
              <svg
                className="w-5 h-5 text-slate-600 group-hover:text-slate-900 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Search Button */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors duration-200 text-slate-600 text-sm font-medium">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Search</span>
            </button>

            {/* Avatar */}
            <div className="relative group cursor-pointer">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white overflow-hidden shadow-lg shadow-emerald-200/50 ring-2 ring-emerald-100 group-hover:ring-4 transition-all duration-300 transform group-hover:scale-105">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kanishq"
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

const NavItem = ({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: string;
  active?: boolean;
}) => (
  <a
    href="#"
    className={`
      relative flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group overflow-hidden
      ${
        active
          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/30"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
      }
    `}
  >
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    )}

    <span
      className={`text-xl transform group-hover:scale-110 transition-transform duration-300 ${
        active ? "drop-shadow-lg" : ""
      }`}
    >
      {icon}
    </span>

    <span className="relative">{label}</span>

    {active && (
      <div className="absolute right-4 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
    )}
  </a>
);

export default Layout;

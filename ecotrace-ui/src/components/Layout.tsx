import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-2xl tracking-tight">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-lg">E</div>
            EcoTrace
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <NavItem label="Dashboard" icon="📊" active />
          <NavItem label="History" icon="🕒" />
          <NavItem label="Analytics" icon="📈" />
          <NavItem label="Settings" icon="⚙️" />
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <div className="bg-emerald-50 p-4 rounded-xl">
            <p className="text-xs font-semibold text-emerald-800 uppercase">Pro Tip</p>
            <p className="text-xs text-emerald-600 mt-1">Switching to LED bulbs can save up to 75% energy!</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 transition-all duration-300">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-8">
          <div className="text-sm font-medium text-slate-500">Welcome back, <span className="text-slate-900">Kanishq!</span></div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kanishq" alt="avatar" />
            </div>
          </div>
        </header>
        
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ label, icon, active = false }: { label: string; icon: string; active?: boolean }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
    active ? 'bg-emerald-50 text-emerald-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
  }`}>
    <span className="text-lg">{icon}</span>
    {label}
  </a>
);

export default Layout;
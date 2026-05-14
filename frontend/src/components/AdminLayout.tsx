import { ClipboardList, LayoutDashboard, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-navy'}`;

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4 pb-4 pt-2 lg:block lg:pb-3 lg:pt-1">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Staff Workspace</p>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 lg:hidden" onClick={() => setDrawerOpen(false)} aria-label="Close navigation">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="grid gap-2 px-2">
        <NavLink to="/admin/dashboard" className={linkClass} onClick={() => setDrawerOpen(false)}><LayoutDashboard className="h-4 w-4" />Dashboard</NavLink>
        <NavLink to="/admin/applications" className={linkClass} onClick={() => setDrawerOpen(false)}><ClipboardList className="h-4 w-4" />Applications</NavLink>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onMenuClick={() => setDrawerOpen(true)} />
      {drawerOpen && <div className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden" onClick={() => setDrawerOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[82vw] max-w-[320px] border-r border-slate-200 bg-white p-3 shadow-2xl transition-transform duration-300 lg:hidden ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebar}
      </aside>
      <div className="page-shell flex w-full gap-6 py-4 sm:py-6 lg:py-8">
        <aside className="hidden h-fit w-[250px] shrink-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_55px_rgba(15,37,68,0.08)] lg:block">
          {sidebar}
        </aside>
        <main className="min-w-0 flex-1">
          <div className="pb-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

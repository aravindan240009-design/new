import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AdminLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-navy'}`;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-50">
      <Navbar />
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col overflow-hidden px-4 py-4 sm:px-6 sm:py-6 lg:flex-row lg:gap-8">
        <aside className="mb-4 h-fit shrink-0 rounded-lg border border-slate-200 bg-white p-3 shadow-[0_18px_55px_rgba(15,37,68,0.08)] lg:mb-0 lg:w-[240px]">
          <p className="hidden px-4 pb-3 pt-1 text-xs font-bold uppercase tracking-wide text-slate-400 lg:block">Admin</p>
          <nav className="flex gap-1 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-1">
            <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/admin/applications" className={linkClass}>Applications</NavLink>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <div className="pb-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

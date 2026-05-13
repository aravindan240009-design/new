import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AdminLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-navy'}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-3 shadow-[0_18px_55px_rgba(15,37,68,0.08)]">
          <p className="px-4 pb-3 pt-1 text-xs font-bold uppercase tracking-wide text-slate-400">Admin</p>
          <nav className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
            <NavLink to="/admin/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/admin/applications" className={linkClass}>Applications</NavLink>
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

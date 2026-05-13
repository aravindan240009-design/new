import { ClipboardList, LayoutDashboard } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AdminLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold ${isActive ? 'bg-blue-50 text-royal' : 'text-slate-600 hover:bg-slate-100'}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside className="panel h-fit p-3">
          <nav className="space-y-1">
            <NavLink to="/admin/dashboard" className={linkClass}><LayoutDashboard className="h-4 w-4" />Dashboard</NavLink>
            <NavLink to="/admin/applications" className={linkClass}><ClipboardList className="h-4 w-4" />Applications</NavLink>
          </nav>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

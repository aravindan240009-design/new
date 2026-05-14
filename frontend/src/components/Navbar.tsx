import { Building2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken, isAuthenticated } from '../utils/auth';

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate();
  const logout = () => {
    clearToken();
    navigate('/admin/login');
  };
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="page-shell flex min-h-[64px] items-center justify-between gap-3 py-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {onMenuClick && (
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-navy shadow-sm lg:hidden"
              onClick={onMenuClick}
              aria-label="Open navigation"
            >
              <span className="h-4 w-5 border-y-2 border-current before:mt-[5px] before:block before:border-t-2 before:border-current" />
            </button>
          )}
          <Link to="/" className="flex min-w-0 items-center gap-2 font-bold text-navy sm:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
              <Building2 className="h-5 w-5 text-royal sm:h-6 sm:w-6" />
            </span>
            <span className="truncate text-sm sm:text-base">Hostel Joining System</span>
          </Link>
        </div>
        {isAuthenticated() ? (
          <button className="btn-secondary shrink-0 px-3 sm:px-4" onClick={logout}><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Logout</span></button>
        ) : (
          <Link className="shrink-0 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-royal sm:px-4" to="/admin/login">Staff Login</Link>
        )}
      </div>
    </header>
  );
}

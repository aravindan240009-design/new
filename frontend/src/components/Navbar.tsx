import { Building2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { clearToken, isAuthenticated } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    clearToken();
    navigate('/admin/login');
  };
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-navy sm:gap-3">
          <Building2 className="h-6 w-6 text-royal sm:h-7 sm:w-7" />
          <span className="text-sm sm:text-base">Hostel Detail Submission</span>
        </Link>
        {isAuthenticated() ? (
          <button className="btn-secondary" onClick={logout}><LogOut className="h-4 w-4" />Logout</button>
        ) : (
          <Link className="text-sm font-semibold text-slate-500 hover:text-royal" to="/admin/login">Staff Login</Link>
        )}
      </div>
    </header>
  );
}

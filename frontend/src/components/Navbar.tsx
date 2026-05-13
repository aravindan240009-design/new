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
        <Link to="/" className="flex items-center gap-3 font-bold text-navy">
          <Building2 className="h-7 w-7 text-royal" />
          <span>Hostel Joining System</span>
        </Link>
        {isAuthenticated() ? (
          <button className="btn-secondary" onClick={logout}><LogOut className="h-4 w-4" />Logout</button>
        ) : (
          <Link className="btn-secondary" to="/admin/login">Admin Login</Link>
        )}
      </div>
    </header>
  );
}

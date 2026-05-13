import { Building2, LockKeyhole } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { saveToken } from '../utils/auth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await login(username, password);
      saveToken(response.token);
      toast.success('Welcome back');
      navigate('/admin/dashboard');
    } catch (error: any) {
      const message = error.code === 'ERR_NETWORK'
        ? 'Backend is not running. Start the Spring Boot server on port 8080.'
        : error.response?.data?.message || 'Invalid username or password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
        <form onSubmit={submit} className="panel w-full p-6 sm:p-8">
          <Link to="/" className="mb-6 flex items-center gap-3 font-bold text-navy">
            <Building2 className="h-7 w-7 text-royal" />
            <span>Hostel Joining System</span>
          </Link>
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-royal">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-navy">Staff Login</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">For hostel office staff to view saved joining details.</p>
          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="username">Username</label>
              <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
          <p className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">Default local login: admin / admin123. Backend must be running.</p>
          <Link to="/" className="mt-4 block text-center text-sm font-semibold text-royal">Back to home</Link>
        </form>
      </main>
    </div>
  );
}

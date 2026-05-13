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
        ? 'Unable to reach the server. Please try again in a minute.'
        : error.response?.data?.message || 'Invalid username or password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#eef4fb_100%)]">
      <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-4 py-10">
        <form onSubmit={submit} className="w-full rounded-lg border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,37,68,0.14)] sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wide text-royal">Hostel Joining System</p>
          <h1 className="mt-3 text-3xl font-bold text-navy">Staff Login</h1>
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
          <Link to="/" className="mt-4 block text-center text-sm font-semibold text-royal">Back to home</Link>
        </form>
      </main>
    </div>
  );
}

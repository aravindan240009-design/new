import { LockKeyhole } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import Navbar from '../components/Navbar';
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
      <Navbar />
      <main className="mx-auto flex max-w-md items-center justify-center px-4 py-16">
        <form onSubmit={submit} className="panel w-full p-8">
          <LockKeyhole className="h-10 w-10 text-royal" />
          <h1 className="mt-4 text-2xl font-bold text-navy">Staff Login</h1>
          <p className="mt-2 text-sm text-slate-600">For hostel office staff to view saved joining details.</p>
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

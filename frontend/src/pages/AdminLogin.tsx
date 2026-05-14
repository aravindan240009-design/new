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
        ? 'Unable to reach the backend server'
        : error.response?.data?.message || 'Invalid username or password';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="grid min-h-screen lg:grid-cols-[1fr_520px]">
        <section className="relative hidden overflow-hidden bg-navy p-12 text-white lg:flex lg:flex-col lg:justify-center">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-100">Hostel office access</p>
            <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-tight tracking-tight xl:text-6xl">Staff Record Dashboard</h1>
            <p className="mt-5 max-w-md text-base leading-7 text-blue-100/80">Secure sign-in for hostel office staff to view and manage saved student joining details.</p>
          </div>
          <div className="absolute bottom-10 left-12 right-12 z-10 flex items-center gap-4 text-sm font-semibold text-blue-100/55">
            <span>College Hostel Office</span>
            <span>/</span>
            <span>Secure access only</span>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-8 sm:px-6">
          <form onSubmit={submit} className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-[0_24px_75px_rgba(15,37,68,0.10)] sm:p-8 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
            <p className="text-xs font-bold uppercase tracking-widest text-royal">Hostel Joining System</p>
            <h1 className="mt-3 text-3xl font-bold text-navy">Staff Login</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">Enter your staff credentials to access saved hostel records.</p>

            <div className="mt-8 space-y-5">
              <div>
                <label htmlFor="username">Staff Username</label>
                <div className="mt-1.5">
                  <input id="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Username" required />
                </div>
              </div>
              <div>
                <label htmlFor="password">Security Password</label>
                <div className="mt-1.5">
                  <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required />
                </div>
              </div>
            </div>

            <button className="btn-primary mt-8 h-11 w-full text-base" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <Link to="/" className="text-sm font-bold text-slate-400 hover:text-royal">Back to Home</Link>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

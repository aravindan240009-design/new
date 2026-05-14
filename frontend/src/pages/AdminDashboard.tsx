import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApplications, getStats } from '../api/applicationApi';
import Loading from '../components/Loading';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { HostelApplication, Stats } from '../types/application';

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<HostelApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStats(), getApplications()])
      .then(([s, apps]) => {
        setStats(s);
        setRecent(apps.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return <Loading />;

  return (
    <div className="space-y-5 page-fade">
      <section className="relative overflow-hidden rounded-2xl bg-navy p-5 text-white shadow-[0_24px_70px_rgba(15,37,68,0.22)] sm:p-6">
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-100">Hostel Office</p>
          <h1 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">Records Dashboard</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">View saved detail submission records, manage approval status, and keep hostel office data organized.</p>
        </div>
        <div className="relative mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Records" value={stats.totalApplications} accent="bg-blue-300" />
          <StatCard title="Pending" value={stats.pendingApplications} accent="bg-yellow-300" />
          <StatCard title="Approved" value={stats.approvedApplications} accent="bg-green-300" />
          <StatCard title="Rejected" value={stats.rejectedApplications} accent="bg-red-300" />
        </div>
      </section>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,37,68,0.10)]">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <h2 className="text-lg font-bold text-navy">Recent Records</h2>
          <Link to="/admin/applications" className="btn-secondary w-full sm:w-auto">View All</Link>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-[680px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-2.5">Student</th>
                <th className="px-5 py-2.5">Register No</th>
                <th className="px-5 py-2.5">Course</th>
                <th className="px-5 py-2.5">Status</th>
                <th className="px-5 py-2.5">Action</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((app) => (
                <tr key={app.id} className="border-t border-slate-100">
                  <td className="px-5 py-2.5 font-semibold text-navy">{app.studentName}</td>
                  <td className="px-5 py-2.5">{app.registerNumber}</td>
                  <td className="px-5 py-2.5">{app.course}</td>
                  <td className="px-5 py-2.5"><StatusBadge status={app.status} /></td>
                  <td className="px-5 py-2.5"><Link className="font-semibold text-royal" to={`/admin/applications/${app.id}`}>Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

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
        setRecent(apps.slice(0, 6));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return <Loading />;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-lg bg-navy p-6 text-white shadow-[0_30px_90px_rgba(15,37,68,0.25)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_8%,rgba(37,99,235,0.32),transparent_32%)]" />
        <div className="relative">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-100">Hostel Office</p>
          <h1 className="mt-2 text-3xl font-bold">Records Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">View saved joining records and manage hostel office entries from one professional workspace.</p>
        </div>
        <div className="relative mt-6 grid gap-4 md:grid-cols-4">
          <StatCard title="Total Records" value={stats.totalApplications} accent="bg-blue-300" />
          <StatCard title="Pending" value={stats.pendingApplications} accent="bg-yellow-300" />
          <StatCard title="Approved" value={stats.approvedApplications} accent="bg-green-300" />
          <StatCard title="Rejected" value={stats.rejectedApplications} accent="bg-red-300" />
        </div>
      </section>
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,37,68,0.10)]">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <h2 className="text-lg font-bold text-navy">Recent Records</h2>
          <Link to="/admin/applications" className="btn-secondary">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Register No</th>
                <th className="px-5 py-3">Course</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((app) => (
                <tr key={app.id} className="border-t border-slate-100">
                  <td className="px-5 py-3 font-semibold text-navy">{app.studentName}</td>
                  <td className="px-5 py-3">{app.registerNumber}</td>
                  <td className="px-5 py-3">{app.course}</td>
                  <td className="px-5 py-3"><StatusBadge status={app.status} /></td>
                  <td className="px-5 py-3"><Link className="font-semibold text-royal" to={`/admin/applications/${app.id}`}>Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

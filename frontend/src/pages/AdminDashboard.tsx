import { CheckCircle, Clock3, FileText, XCircle } from 'lucide-react';
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
      <div>
        <h1 className="text-3xl font-bold text-navy">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Monitor hostel joining requests and pending actions.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="Total Applications" value={stats.totalApplications} icon={FileText} />
        <StatCard title="Pending" value={stats.pendingApplications} icon={Clock3} />
        <StatCard title="Approved" value={stats.approvedApplications} icon={CheckCircle} />
        <StatCard title="Rejected" value={stats.rejectedApplications} icon={XCircle} />
      </div>
      <section className="panel overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <h2 className="text-lg font-bold text-navy">Recent Applications</h2>
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

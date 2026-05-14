import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApplications, getStats } from '../api/applicationApi';
import Loading from '../components/Loading';
import StatCard from '../components/StatCard';
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
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-xl bg-navy p-4 text-white shadow-[0_24px_70px_rgba(15,37,68,0.22)] sm:p-6">
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100 sm:text-xs">Institution Hostel Office</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Student Details Register</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100/80">View and update saved hostel student details. Each register number is stored as one unique record.</p>
        </div>
        <div className="relative mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard title="Total Records" value={stats.totalApplications} accent="bg-blue-300" />
          <StatCard title="Male Students" value={stats.totalMale} accent="bg-blue-300" />
          <StatCard title="Female Students" value={stats.totalFemale} accent="bg-green-300" />
          <StatCard title="Other Students" value={stats.totalOther} accent="bg-yellow-300" />
        </div>
      </section>
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,37,68,0.10)]">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-5">
          <h2 className="text-lg font-bold text-navy">Recent Records</h2>
          <Link to="/admin/applications" className="btn-secondary">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-5 py-2.5">Student</th>
                <th className="hidden px-5 py-2.5 sm:table-cell">Register No</th>
                <th className="hidden px-5 py-2.5 sm:table-cell">Course</th>
                <th className="px-5 py-2.5">Hostel</th>
                <th className="px-5 py-2.5">Action</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((app) => (
                <tr key={app.id} className="border-t border-slate-100">
                  <td className="px-5 py-2.5 font-semibold text-navy">{app.studentName}</td>
                  <td className="hidden px-5 py-2.5 sm:table-cell">{app.registerNumber}</td>
                  <td className="hidden px-5 py-2.5 sm:table-cell">{app.course}</td>
                  <td className="px-5 py-2.5 font-semibold text-slate-700">{app.hostelName || 'Not provided'}</td>
                  <td className="px-5 py-2.5"><Link className="font-semibold text-royal" to={`/admin/applications/${app.id}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

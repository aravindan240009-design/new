import { Building2, ClipboardCheck, DoorOpen, FileDown, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const features = [
  { title: 'Online Application', icon: ClipboardCheck, text: 'Students submit complete hostel joining details through a validated digital form.' },
  { title: 'Secure Admin Review', icon: ShieldCheck, text: 'Warden access is protected with JWT authentication and role-based admin controls.' },
  { title: 'Room Allotment', icon: DoorOpen, text: 'Approve applications and assign rooms without maintaining paper registers.' },
  { title: 'PDF/Print Support', icon: FileDown, text: 'Print applications, download PDF copies, and export table data for reports.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <Building2 className="h-4 w-4" /> College Hostel Administration
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Hostel Joining Application Management System</h1>
            <p className="mt-5 max-w-2xl text-lg text-blue-100">A professional full-stack portal for student hostel applications, review workflows, room allotment, reporting, and paperless records.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/apply" className="btn-primary bg-white text-navy hover:bg-blue-50">Apply for Hostel</Link>
              <Link to="/admin/login" className="btn-secondary border-white/30 bg-transparent text-white hover:bg-white/10">Admin Login</Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-6 shadow-soft">
            <div className="grid gap-4">
              {['Application Intake', 'Warden Approval', 'Room Assignment', 'Export Records'].map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-md bg-white p-4 text-navy">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 font-bold text-royal">{index + 1}</span>
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          {features.map(({ title, text, icon: Icon }) => (
            <article key={title} className="panel p-5">
              <Icon className="h-8 w-8 text-royal" />
              <h2 className="mt-4 text-lg font-bold text-navy">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

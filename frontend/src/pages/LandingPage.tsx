import { Building2, ClipboardCheck, FileText, ShieldCheck, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const features = [
  { title: 'Structured Details', icon: ClipboardCheck, text: 'Collect student, parent, address, guardian, and joining information in one clear form.' },
  { title: 'Required Validation', icon: UserCheck, text: 'Mobile numbers, dates, register number, and required fields are checked before submission.' },
  { title: 'Secure Storage', icon: ShieldCheck, text: 'Submitted records are saved in the college hostel database for office use.' },
  { title: 'Office Records', icon: FileText, text: 'Applications remain available as clean digital records whenever the hostel office needs them.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:min-h-[640px] md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15">
              <Building2 className="h-4 w-4" /> College Hostel Office
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Hostel Joining Details Submission</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">Submit your hostel joining information online. The form saves the details required by the hostel office without paper forms or repeated manual entry.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/apply" className="btn-primary bg-white px-6 py-3 text-navy hover:bg-blue-50">Submit Joining Details</Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.08] p-6 shadow-soft">
            <div className="mb-5 border-b border-white/10 pb-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Record Checklist</p>
              <h2 className="mt-1 text-2xl font-bold">Details saved for office records</h2>
            </div>
            <div className="grid gap-4">
              {['Student information', 'Parent contact details', 'Permanent and residence address', 'Local guardian and health notes'].map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-md bg-white p-5 text-navy">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 font-bold text-royal">{index + 1}</span>
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-navy">Simple, accurate record collection</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">This portal is focused on saving hostel joining details cleanly and securely for the college hostel office.</p>
        </div>
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

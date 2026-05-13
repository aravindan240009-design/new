import { ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-navy text-white">
      <section className="relative isolate flex min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(37,99,235,0.28),transparent_32%),linear-gradient(135deg,#0f2544_0%,#102f57_48%,#0b1b33_100%)]" />
        <div className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
            <Link to="/" className="flex min-w-0 items-center gap-3 text-base font-bold tracking-tight text-white sm:text-lg">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10 ring-1 ring-white/15">
                <Building2 className="h-5 w-5" />
              </span>
              <span className="truncate">Hostel Joining System</span>
            </Link>
            <Link
              to="/admin/login"
              className="shrink-0 rounded-md px-3 py-2 text-sm font-semibold text-blue-100 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Staff Login
            </Link>
          </div>
        </div>
        <div className="relative mx-auto flex w-full max-w-7xl items-center px-5 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50 ring-1 ring-white/15">
              <Building2 className="h-4 w-4" /> College Hostel Office
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">Hostel Joining Details Submission</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">Submit your hostel joining information online. Your details are saved securely for hostel office records without paper forms or repeated manual entry.</p>
            <Link
              to="/apply"
              className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-bold text-navy shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-royal hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70 sm:w-fit"
            >
              Fill Hostel Form
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-16 md:min-h-[720px]">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15">
              <Building2 className="h-4 w-4" /> College Hostel Office
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Hostel Joining Details Submission</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">Submit your hostel joining information online. The form saves the details required by the hostel office without paper forms or repeated manual entry.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/apply"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-navy shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-royal hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                Fill Hostel Form
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

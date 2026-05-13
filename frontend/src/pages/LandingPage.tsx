import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-navy text-white">
      <section className="relative isolate flex min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f2544_0%,#143a68_52%,#0b1b33_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-6 lg:px-8">
            <Link to="/" className="min-w-0 text-base font-bold tracking-tight text-white sm:text-lg">
              <span className="truncate">Hostel Joining System</span>
            </Link>
            <Link
              to="/admin/login"
              className="shrink-0 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50 transition hover:border-white/40 hover:bg-white hover:text-navy focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Staff Login
            </Link>
          </div>
        </div>
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-12 pt-28 sm:px-6 lg:min-h-screen lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-24">
          <div>
            <div className="mb-7 inline-flex rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50 ring-1 ring-white/15">
              College Hostel Office
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Hostel Joining Details Submission</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">Submit hostel joining information online and save it securely for hostel office records without paper forms or repeated manual entry.</p>
            <Link
              to="/apply"
              className="mt-9 inline-flex w-full items-center justify-center rounded-md bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-[0_22px_55px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-royal hover:shadow-[0_28px_70px_rgba(0,0,0,0.28)] focus:outline-none focus:ring-2 focus:ring-white/70 sm:w-fit"
            >
              Fill Hostel Form
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="rotate-[-2deg] rounded-lg border border-white/15 bg-white/10 p-5 shadow-[0_35px_95px_rgba(0,0,0,0.28)] backdrop-blur">
              <div className="rotate-[2deg] rounded-md bg-white p-6 text-navy shadow-[0_20px_55px_rgba(0,0,0,0.18)]">
                <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-royal">Digital Record</p>
                    <p className="mt-1 text-xl font-bold">Joining Details</p>
                  </div>
                  <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-royal">Secure</span>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 rounded-md bg-slate-100" />
                    <div className="h-12 rounded-md bg-slate-100" />
                  </div>
                  <div className="h-12 rounded-md bg-slate-100" />
                  <div className="h-24 rounded-md bg-slate-100" />
                  <div className="ml-auto h-11 w-36 rounded-md bg-royal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

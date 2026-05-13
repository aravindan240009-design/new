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
            <div className="record-card-float group relative rounded-xl border border-white/15 bg-white/10 p-5 shadow-[0_35px_95px_rgba(0,0,0,0.28)] backdrop-blur transition duration-500 hover:-translate-y-2 hover:bg-white/14 hover:shadow-[0_45px_120px_rgba(0,0,0,0.34)]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <div className="record-card-shine absolute inset-y-0 -left-2/3 w-1/2 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
              </div>
              <div className="relative overflow-hidden rounded-lg bg-white p-6 text-navy shadow-[0_22px_65px_rgba(0,0,0,0.20)] transition duration-500 group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.26)]">
                <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-royal">Digital Record</p>
                    <p className="mt-1 text-2xl font-bold">Joining Details</p>
                  </div>
                  <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-royal ring-1 ring-blue-100">Secure</span>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <PreviewField label="Student name" width="w-4/5" />
                    <PreviewField label="Register no" width="w-3/4" />
                  </div>
                  <PreviewField label="Course and joining date" width="w-2/3" />
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Record sections</span>
                      <span className="text-xs font-bold text-royal">4 steps</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {['Student', 'Parent', 'Address', 'Guardian'].map((item, index) => (
                        <div key={item} className="rounded-md bg-white px-3 py-3 shadow-sm transition duration-300 group-hover:-translate-y-0.5">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-sm font-bold text-royal">{index + 1}</span>
                            <span className="text-sm font-bold text-slate-700">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-navy p-4 text-white">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-100">Submission state</p>
                      <p className="mt-1 text-lg font-bold">Ready for office records</p>
                    </div>
                    <div className="h-3 w-24 overflow-hidden rounded-full bg-white/15">
                      <div className="record-progress h-full rounded-full bg-blue-300" />
                    </div>
                  </div>
                  <div className="ml-auto h-11 w-36 rounded-md bg-royal shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition group-hover:bg-blue-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PreviewField({ label, width }: { label: string; width: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 transition duration-300 hover:border-blue-200 hover:bg-blue-50/30">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <div className={`record-skeleton mt-3 h-3 ${width} rounded-full bg-slate-100`} />
    </div>
  );
}

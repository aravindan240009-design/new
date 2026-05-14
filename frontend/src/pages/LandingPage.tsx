import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-navy text-white lg:h-screen lg:overflow-hidden">
      <section className="relative isolate flex min-h-screen flex-col overflow-hidden px-4 pb-12 sm:px-6 lg:h-full lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f2544_0%,#143a68_52%,#0b1b33_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:64px_64px]" />
        
        <div className="relative z-10 w-full">
          <div className="mx-auto flex max-w-[1400px] items-center justify-end px-5 py-4 sm:px-10 sm:py-6">
            <Link
              to="/admin/login"
              className="shrink-0 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-50 transition hover:border-white/40 hover:bg-white hover:text-navy sm:px-6 sm:py-2.5 sm:text-base"
            >
              Staff Login
            </Link>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-[1400px] flex-1 items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col justify-center text-left">
            <div className="mb-3 inline-flex w-fit rounded-md bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-50 ring-1 ring-white/15 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm sm:normal-case sm:tracking-normal">
              College Hostel Office
            </div>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">Hostel Student Details Submission</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">Submit hostel student, guardian, room, and warden details once for the institution database.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/apply"
                className="inline-flex w-full items-center justify-center rounded-md bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-[0_22px_55px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-royal hover:shadow-[0_28px_70px_rgba(0,0,0,0.28)] sm:w-fit sm:px-8 sm:py-4"
              >
                Fill Hostel Form
              </Link>
            </div>
          </div>

          <div className="flex w-full max-w-[520px] items-center justify-center justify-self-start sm:mt-12 lg:mt-0 lg:justify-self-end">
            <div className="record-card-float group relative w-full origin-left scale-[0.82] rounded-2xl border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.07))] p-1.5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-white/15 sm:p-4 lg:scale-100">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <div className="record-card-shine absolute inset-y-0 -left-2/3 w-1/2 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
              </div>
              
              <div className="relative overflow-hidden rounded-xl bg-white text-navy shadow-[0_22px_65px_rgba(0,0,0,0.20)] transition-shadow duration-500 group-hover:shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-royal via-blue-400 to-navy" />
                
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 pb-3 pt-5 sm:px-6 sm:pb-4 sm:pt-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-royal">Office Record</p>
                    <p className="mt-0.5 text-xl font-bold sm:text-2xl">Hostel Details</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-royal ring-1 ring-blue-100 sm:px-3 sm:text-xs">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-royal" />
                    Verified
                  </span>
                </div>

                <div className="space-y-3 p-4 sm:space-y-4 sm:p-6">
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <PreviewField label="Student name" width="w-4/5" />
                    <PreviewField label="Register no" width="w-3/4" />
                  </div>
                  <PreviewField label="Course and admission date" width="w-2/3" />
                  
                  <div className="hidden rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-inner sm:block sm:p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-royal uppercase tracking-wider">Record Data Modules</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {['Student', 'Parent', 'Address', 'Guardian'].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-slate-200/50 transition-transform duration-300 group-hover:scale-[1.02]">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-50 text-green-600">
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                            </svg>
                          </div>
                          <span className="truncate text-xs font-bold text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-xl bg-navy p-4 text-white shadow-lg sm:p-5">
                    <div className="flex-1">
                    <p className="mt-0.5 text-sm font-bold sm:text-base">Unique Register Record</p>
                    </div>
                    <div className="h-2 w-20 shrink-0 overflow-hidden rounded-full bg-white/10 sm:w-24">
                      <div className="record-progress h-full rounded-full bg-blue-400" />
                    </div>
                  </div>
                  <div className="flex h-10 items-center justify-center rounded-md bg-royal text-xs font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.26)] transition group-hover:bg-blue-700 sm:ml-auto sm:h-11 sm:w-40 sm:text-sm">
                    Submit Details
                  </div>
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
    <div className="rounded-lg border border-slate-200 bg-white p-2.5 transition duration-300 hover:border-blue-200 hover:bg-blue-50/30 sm:p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">{label}</p>
      <div className={`record-skeleton mt-2 h-2.5 ${width} rounded-full bg-slate-100 sm:mt-3 sm:h-3`} />
    </div>
  );
}

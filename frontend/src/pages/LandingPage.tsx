import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0B2545] text-white">
      <section className="relative isolate flex min-h-screen w-full flex-col overflow-hidden pb-8">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f2544_0%,#143a68_52%,#0b1b33_100%)]" />

        <header className="relative z-10 w-full border-b border-white/10">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <p className="min-w-0 truncate text-[15px] font-bold leading-none sm:text-lg">Hostel Joining System</p>
            <Link
              to="/admin/login"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-blue-50 shadow-sm transition hover:border-white/40 hover:bg-white hover:text-navy active:scale-[0.98] sm:h-12 sm:px-6 sm:text-base"
            >
              Staff Login
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-4 pt-8 sm:px-6 sm:pt-10 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-12 xl:gap-16">
          <div className="page-fade flex w-full min-w-0 flex-col justify-center text-left">
            <div className="mb-4 inline-flex w-fit max-w-full rounded-lg bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-50 ring-1 ring-white/15 sm:mb-6 sm:px-4 sm:py-2 sm:text-sm sm:normal-case sm:tracking-normal">
              College Hostel Office
            </div>
            <h1 className="max-w-full text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:max-w-3xl lg:text-5xl xl:text-6xl">Hostel Student Details Submission</h1>
            <p className="mt-4 max-w-full text-base leading-7 text-blue-100 sm:text-lg lg:max-w-2xl lg:leading-8">Submit hostel student, guardian, room, and warden details once for the institution database.</p>
            <div className="mt-6 flex w-full flex-col gap-4 sm:mt-8 sm:w-auto sm:flex-row">
              <Link
                to="/apply"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-white px-6 text-base font-semibold text-navy shadow-[0_18px_45px_rgba(0,0,0,0.20)] transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-royal hover:shadow-[0_24px_60px_rgba(0,0,0,0.24)] active:translate-y-0 active:scale-[0.99] sm:h-14 sm:w-fit sm:px-8"
              >
                Fill Hostel Form
              </Link>
            </div>
          </div>

          <div className="card-rise flex w-full min-w-0 items-center justify-center justify-self-center lg:justify-self-end">
            <div className="hero-card-scale group relative w-full max-w-[360px] rounded-2xl border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.07))] p-2 shadow-[0_22px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/15 sm:max-w-[480px] sm:p-3 lg:max-w-[520px]">
              <div className="pointer-events-none absolute inset-0 hidden overflow-hidden rounded-xl sm:block">
                <div className="record-card-shine absolute inset-y-0 -left-2/3 w-1/2 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
              </div>
              
              <div className="relative overflow-hidden rounded-xl bg-white text-navy shadow-[0_22px_65px_rgba(0,0,0,0.20)] transition-shadow duration-500 group-hover:shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-royal via-blue-400 to-navy" />
                
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 pb-3 pt-5 sm:px-5 sm:pb-4 sm:pt-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-royal">Office Record</p>
                    <p className="mt-0.5 text-lg font-bold sm:text-2xl">Hostel Details</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-royal ring-1 ring-blue-100 sm:px-3 sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-royal sm:animate-pulse" />
                    Verified
                  </span>
                </div>

                <div className="space-y-3 p-3 sm:p-5">
                  <div className="grid gap-3 min-[390px]:grid-cols-2 sm:gap-4">
                    <PreviewField label="Student name" width="w-4/5" />
                    <PreviewField label="Register no" width="w-3/4" />
                  </div>
                  <PreviewField label="Course and admission date" width="w-2/3" />
                  
                  <div className="hidden rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-inner sm:block">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-royal uppercase tracking-wider">Record Data Modules</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {['Student', 'Parent', 'Address', 'Guardian'].map((item) => (
                        <div key={item} className="flex items-center gap-3 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200/50 transition-transform duration-300 group-hover:scale-[1.02]">
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

                  <div className="flex items-center justify-between gap-3 rounded-xl bg-navy p-3 text-white shadow-lg sm:gap-4 sm:p-4">
                    <div className="flex-1">
                      <p className="text-xs font-bold sm:text-base">Unique Register Record</p>
                    </div>
                    <div className="h-2 w-16 shrink-0 overflow-hidden rounded-full bg-white/10 sm:w-24">
                      <div className="record-progress h-full rounded-full bg-blue-400" />
                    </div>
                  </div>
                  <div className="flex h-11 items-center justify-center rounded-xl bg-royal text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.26)] transition group-hover:bg-blue-700 sm:ml-auto sm:w-40">
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
    <div className="rounded-lg border border-slate-200 bg-white p-2.5 transition duration-300 hover:border-blue-200 hover:bg-blue-50/30 sm:p-3.5">
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs">{label}</p>
      <div className={`record-skeleton mt-2 h-2.5 ${width} rounded-full bg-slate-100 sm:mt-3 sm:h-3`} />
    </div>
  );
}

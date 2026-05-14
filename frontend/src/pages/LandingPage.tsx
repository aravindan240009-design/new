
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#0B2545] text-white">
      <section className="relative isolate flex min-h-screen w-full flex-col overflow-hidden pb-10 sm:pb-8">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f2544_0%,#143a68_52%,#0b1b33_100%)]" />

        <header className="relative z-10 w-full border-b border-white/10">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <p className="min-w-0 truncate text-[15px] font-bold leading-none sm:text-lg">Hostel Detail Submission</p>
            <Link
              to="/admin/login"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-blue-50 shadow-sm transition hover:border-white/40 hover:bg-white hover:text-navy active:scale-[0.98] sm:h-12 sm:px-6 sm:text-base"
            >
              Staff Login
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-8 sm:px-6 sm:pt-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-12 xl:gap-16">
          
          {/* Text Container */}
          <div className="page-fade flex w-full min-w-0 flex-col items-start text-left lg:items-start lg:text-left">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md sm:mb-8 sm:px-5 sm:py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 sm:animate-pulse" />
              <span className="text-[11px] font-bold tracking-wide text-blue-200 sm:text-sm">College Hostel Office</span>
            </div>
            
            <h1 className="max-w-full whitespace-nowrap text-[1.3rem] font-extrabold leading-[1.15] tracking-tight text-white min-[390px]:text-[1.45rem] sm:whitespace-normal sm:text-4xl lg:max-w-3xl lg:text-5xl xl:text-6xl">
              Hostel Student Details Submission
            </h1>
            
            <p className="mt-4 max-w-full text-[15px] leading-[1.6] text-blue-100/80 sm:mt-5 sm:max-w-full sm:text-lg lg:max-w-2xl lg:leading-8">
              Submit hostel student, guardian, room, and warden details once for the institution database.
            </p>
            
            {/* Desktop Button (Hidden on Mobile) */}
            <div className="mt-8 hidden w-full lg:flex lg:w-auto lg:items-start">
              <Link
                to="/apply"
                className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 text-[16px] font-bold text-navy shadow-[0_8px_30px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Fill Hostel Form</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ── Dashboard Preview Card ── */}
          <div className="card-rise mt-8 flex w-full min-w-0 justify-end lg:mt-0 lg:justify-self-end">
            <div className="hero-card-scale group relative w-full max-w-[340px] rounded-2xl border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))] p-1.5 shadow-[0_22px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/15 sm:max-w-[480px] sm:p-3 lg:max-w-[520px]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <div className="record-card-shine absolute inset-y-0 -left-2/3 w-1/2 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
              </div>
              
              <div className="relative overflow-hidden rounded-[14px] bg-white text-navy shadow-[0_22px_65px_rgba(0,0,0,0.20)] transition-shadow duration-500 group-hover:shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-royal via-blue-400 to-navy" />
                
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5 sm:pb-4 sm:pt-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-royal sm:text-[10px]">Office Record</p>
                    <p className="text-base font-bold sm:mt-0.5 sm:text-2xl">Hostel Details</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-50/80 px-2 py-1 text-[9px] font-bold text-royal ring-1 ring-blue-100 sm:px-3 sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-royal sm:animate-pulse" />
                    Verified
                  </span>
                </div>

                <div className="space-y-2.5 p-3 sm:space-y-3 sm:p-5">
                  {/* Small cards grid for mobile */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <PreviewField label="Student name" width="w-4/5" />
                    <PreviewField label="Register no" width="w-3/4" />
                  </div>
                  <PreviewField label="Course and admission date" width="w-2/3" />
                  
                  {/* Hidden on mobile, visible on sm+ */}
                  <div className="hidden rounded-xl border border-slate-200 bg-slate-50/50 p-4 shadow-inner sm:block">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-royal">Record Data Modules</span>
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

                  <div className="flex items-center justify-between gap-3 rounded-[10px] bg-navy p-2.5 text-white shadow-lg sm:rounded-xl sm:gap-4 sm:p-4">
                    <div className="flex-1">
                      <p className="text-[10px] font-bold sm:text-base">Unique Register Record</p>
                    </div>
                    <div className="h-1.5 w-12 shrink-0 overflow-hidden rounded-full bg-white/10 sm:h-2 sm:w-24">
                      <div className="record-progress h-full rounded-full bg-blue-400" />
                    </div>
                  </div>
                  
                  <div className="flex h-9 w-full items-center justify-center rounded-lg bg-royal text-xs font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.26)] transition group-hover:bg-blue-700 sm:ml-auto sm:h-11 sm:w-40 sm:rounded-xl sm:text-sm">
                    Submit Details
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Button (Hidden on Desktop) */}
          <div className="mt-8 flex w-full lg:hidden">
            <Link
              to="/apply"
              className="group relative inline-flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 text-[16px] font-bold text-navy shadow-[0_8px_30px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Fill Hostel Form</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
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

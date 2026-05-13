import { Link } from 'react-router-dom';

const recordPoints = ['Student details', 'Parent contact', 'Address record', 'Guardian details'];
const summaryItems = [
  { label: 'Required fields', value: 'Validated' },
  { label: 'Office copy', value: 'Digital' },
  { label: 'Review status', value: 'Tracked' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-navy">
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0b1b33_0%,#12345d_46%,#1d4b86_100%)]" />
        <div className="absolute inset-0 opacity-16 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-x-0 top-0 z-10 border-b border-white/10 bg-navy/10 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 lg:px-8">
            <Link to="/" className="text-base font-bold tracking-tight text-white sm:text-lg">
              Hostel Joining System
            </Link>
            <Link
              to="/admin/login"
              className="rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-blue-50 shadow-[0_16px_40px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:border-white/45 hover:bg-white hover:text-navy focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              Staff Login
            </Link>
          </div>
        </div>

        <div className="relative mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 pb-12 pt-28 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pt-24">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-50 shadow-[0_18px_45px_rgba(0,0,0,0.16)]">
              College Hostel Office
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Hostel Joining Details, Saved Professionally
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              A clean online record form for collecting student joining information, parent contacts, addresses, guardian details, and health notes for hostel office use.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/apply"
                className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-[0_24px_60px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-royal hover:shadow-[0_30px_75px_rgba(0,0,0,0.30)] focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                Fill Hostel Form
              </Link>
              <span className="text-sm font-semibold text-blue-100">Secure digital record collection for hostel office staff.</span>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {summaryItems.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/12 bg-white/8 p-4 shadow-[0_16px_44px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-100">{item.label}</p>
                  <p className="mt-2 text-lg font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[560px] lg:block">
            <div className="absolute right-0 top-12 w-[560px] rotate-[-2deg] rounded-xl border border-white/15 bg-white/10 p-5 shadow-[0_38px_110px_rgba(0,0,0,0.30)] backdrop-blur">
              <div className="rotate-[2deg] overflow-hidden rounded-lg bg-white text-navy shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                <div className="border-b border-slate-200 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-royal">Digital Hostel Record</p>
                      <h2 className="mt-2 text-2xl font-bold">Joining Details</h2>
                    </div>
                    <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-royal">Ready to save</span>
                  </div>
                </div>
                <div className="grid gap-4 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <PreviewField label="Student name" />
                    <PreviewField label="Register no" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <PreviewField label="Mobile number" />
                    <PreviewField label="Course" />
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Record sections</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {recordPoints.map((point, index) => (
                        <div key={point} className="flex items-center gap-3 rounded-md bg-white p-3 shadow-sm">
                          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-50 text-sm font-bold text-royal">{index + 1}</span>
                          <span className="text-sm font-bold text-slate-700">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-navy p-4 text-white">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-100">Submission state</p>
                      <p className="mt-1 text-lg font-bold">Saved for office review</p>
                    </div>
                    <div className="h-3 w-24 overflow-hidden rounded-full bg-white/15">
                      <div className="h-full w-4/5 rounded-full bg-blue-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-14 left-5 w-72 rounded-xl border border-white/14 bg-white/12 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-100">Office checklist</p>
              <div className="mt-4 space-y-3">
                {['Mobile number checked', 'Register number unique', 'Guardian details attached'].map((item) => (
                  <div key={item} className="rounded-md bg-white/90 px-4 py-3 text-sm font-bold text-navy">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-10 px-5 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,37,68,0.12)] md:grid-cols-4">
          {recordPoints.map((point) => (
            <div key={point} className="rounded-lg bg-slate-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-royal">Captured</p>
              <p className="mt-2 text-lg font-bold text-navy">{point}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function PreviewField({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-3 h-3 w-4/5 rounded-full bg-slate-100" />
    </div>
  );
}

import { ArrowLeft, Download, Edit, Printer, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getApplication } from '../api/applicationApi';
import Loading from '../components/Loading';
import StatusBadge from '../components/StatusBadge';
import { HostelApplication } from '../types/application';
import { downloadElementPdf, printApplication } from '../utils/printApplication';

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="grid gap-1 border-b border-slate-100 py-2.5 md:grid-cols-[240px_1fr]">
      <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="break-words text-sm font-bold text-navy">{value || 'Not provided'}</dd>
    </div>
  );
}

export default function ApplicationDetailsPage() {
  const { id } = useParams();
  const [application, setApplication] = useState<HostelApplication | null>(null);

  useEffect(() => {
    if (id) getApplication(id).then(setApplication);
  }, [id]);

  if (!application) return <Loading />;

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <Link to="/admin/applications" className="inline-flex items-center gap-2 text-sm font-semibold text-royal"><ArrowLeft className="h-4 w-4" />Back</Link>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
          <Link className="btn-secondary" to={`/admin/applications/${application.id}/edit`}><Edit className="h-4 w-4" />Edit</Link>
          <button className="btn-secondary" onClick={() => printApplication(application)}><Printer className="h-4 w-4" />Print</button>
          <button className="btn-primary" onClick={() => downloadElementPdf('application-detail', `${application.registerNumber}.pdf`)}><Download className="h-4 w-4" />PDF</button>
        </div>
      </div>
      <section id="application-detail" className="panel p-5 sm:p-8">
        <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-royal ring-1 ring-blue-100">
              <UserRound className="h-3 w-3" /> Student Profile
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-4xl">{application.studentName}</h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
              <span className="rounded-md bg-slate-100 px-2 py-0.5">{application.registerNumber}</span>
              <span>/</span>
              <span>{application.course}</span>
            </p>
          </div>
          <div className="space-y-3 md:text-right">
            <StatusBadge status={application.status} />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Room: <span className="text-navy">{application.roomNo || 'Not allotted'}</span></p>
          </div>
        </div>
        <dl className="mt-5">
          <Row label="Student Mobile" value={application.studentMobileNo} />
          <Row label="Gender" value={application.gender} />
          <Row label="Date of Birth" value={application.dateOfBirth} />
          <Row label="Admission Date" value={application.dateOfJoining} />
          <Row label="Parent Name" value={application.parentName} />
          <Row label="Parent Contact No" value={application.parentContactNo} />
          <Row label="Residence Address" value={application.residenceAddress} />
          <Row label="Permanent Address" value={application.permanentAddress} />
          <Row label="Local Guardian Name" value={application.localGuardianName} />
          <Row label="Local Guardian Contact No" value={application.localGuardianContactNo} />
          <Row label="Local Guardian Address" value={application.localGuardianAddress} />
          <Row label="Personal History / Illness Details" value={application.personalHistory || 'None'} />
        </dl>
      </section>
    </div>
  );
}

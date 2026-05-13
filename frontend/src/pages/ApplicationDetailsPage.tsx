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
    <div className="grid gap-1 border-b border-slate-100 py-3 md:grid-cols-[220px_1fr]">
      <dt className="text-sm font-bold text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold text-slate-800">{value || 'Not provided'}</dd>
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
        <div className="flex flex-wrap gap-2">
          <Link className="btn-secondary" to={`/admin/applications/${application.id}/edit`}><Edit className="h-4 w-4" />Edit</Link>
          <button className="btn-secondary" onClick={() => printApplication(application)}><Printer className="h-4 w-4" />Print</button>
          <button className="btn-primary" onClick={() => downloadElementPdf('application-detail', `${application.registerNumber}.pdf`)}><Download className="h-4 w-4" />PDF</button>
        </div>
      </div>
      <section id="application-detail" className="panel p-6">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy">{application.studentName}</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">{application.registerNumber} · {application.course}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-blue-50 text-royal"><UserRound className="h-10 w-10" /></div>
            <div className="space-y-2">
              <StatusBadge status={application.status} />
              <p className="text-sm font-bold text-navy">Room: {application.roomNo || 'Not allotted'}</p>
            </div>
          </div>
        </div>
        <dl className="mt-5">
          <Row label="Student Mobile" value={application.studentMobileNo} />
          <Row label="Gender" value={application.gender} />
          <Row label="Date of Birth" value={application.dateOfBirth} />
          <Row label="Date of Joining" value={application.dateOfJoining} />
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

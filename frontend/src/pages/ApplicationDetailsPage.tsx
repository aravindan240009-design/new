import { ArrowLeft, Check, Download, Edit, Printer, UserRound, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { approveApplication, getApplication, rejectApplication } from '../api/applicationApi';
import Loading from '../components/Loading';
import StatusBadge from '../components/StatusBadge';
import { HostelApplication } from '../types/application';
import { downloadElementPdf, printApplication } from '../utils/printApplication';

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-slate-100 py-2.5">
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

  const action = async (job: () => Promise<unknown>, message: string) => {
    if (!id) return;
    try {
      await job();
      toast.success(message);
      setApplication(await getApplication(id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  if (!application) return <Loading />;

  return (
    <div className="space-y-5 page-fade">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <Link to="/admin/applications" className="inline-flex items-center gap-2 text-sm font-semibold text-royal"><ArrowLeft className="h-4 w-4" />Back</Link>
        <div className="flex flex-wrap gap-2">
          <Link className="btn-secondary" to={`/admin/applications/${application.id}/edit`}><Edit className="h-4 w-4" />Edit</Link>
          <button className="btn-secondary" onClick={() => printApplication(application)}><Printer className="h-4 w-4" />Print</button>
          <button className="btn-secondary" onClick={() => downloadElementPdf('application-detail', `${application.registerNumber}.pdf`)}><Download className="h-4 w-4" />PDF</button>
          <button className="btn-primary" onClick={() => action(() => approveApplication(application.id), 'Record approved')}><Check className="h-4 w-4" />Approve</button>
          <button className="btn-danger" onClick={() => action(() => rejectApplication(application.id), 'Record rejected')}><X className="h-4 w-4" />Reject</button>
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
          <div className="space-y-2 rounded-lg bg-slate-50 p-4 md:text-right">
            <StatusBadge status={application.status} />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Saved Record</p>
            <p className="text-sm font-bold text-navy">{application.hostelName || 'Hostel not provided'}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Room: <span className="text-navy">{application.roomNo || 'Not provided'}</span></p>
          </div>
        </div>
        <dl className="mt-5 flex flex-col gap-4">
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
          <Row label="Hostel Name" value={application.hostelName} />
          <Row label="Floor No" value={application.floorNo} />
          <Row label="Room No" value={application.roomNo} />
          <Row label="Bed No" value={application.bedNo || 'Not assigned'} />
          <Row label="Warden Name" value={application.wardenName} />
          <Row label="Warden Contact No" value={application.wardenContactNo || 'Not provided'} />
        </dl>
      </section>
    </div>
  );
}

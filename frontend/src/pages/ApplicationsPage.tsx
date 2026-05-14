import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Download, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { approveApplication, assignRoom, deleteApplication, filterApplications, getApplications, rejectApplication, searchApplications } from '../api/applicationApi';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import { ApplicationStatus, Gender, HostelApplication } from '../types/application';
import { exportApplicationsCsv } from '../utils/exportCsv';
import { downloadApplicationPdf, printApplication } from '../utils/printApplication';

export default function ApplicationsPage() {
  const [rows, setRows] = useState<HostelApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<ApplicationStatus | ''>('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [course, setCourse] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      setRows(await getApplications());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const action = async (job: () => Promise<unknown>, message: string) => {
    try {
      await job();
      toast.success(message);
      refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const columns = useMemo<ColumnDef<HostelApplication>[]>(() => [
    { accessorKey: 'studentName', header: 'Student Name', cell: ({ row }) => <span className="font-bold text-navy">{row.original.studentName}</span> },
    { accessorKey: 'registerNumber', header: 'Register No', cell: ({ row }) => <span className="font-mono font-bold text-slate-600">{row.original.registerNumber}</span> },
    { accessorKey: 'course', header: 'Course' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'studentMobileNo', header: 'Student mobile' },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    { accessorKey: 'hostelName', header: 'Hostel', cell: ({ row }) => row.original.hostelName || 'Not provided' },
    { accessorKey: 'floorNo', header: 'Floor', cell: ({ row }) => row.original.floorNo || 'Not provided' },
    { accessorKey: 'roomNo', header: 'Room No', cell: ({ row }) => row.original.roomNo || 'Not provided' },
    { accessorKey: 'dateOfJoining', header: 'Admission Date' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const app = row.original;
        return (
          <div className="flex min-w-[520px] flex-wrap items-center gap-2">
            <Link className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-royal transition hover:bg-blue-100 sm:px-3 sm:py-1.5 sm:text-xs" to={`/admin/applications/${app.id}`}>View</Link>
            <Link className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:px-3 sm:py-1.5 sm:text-xs" to={`/admin/applications/${app.id}/edit`}>Edit</Link>
            <button className="rounded-md border border-green-200 px-2 py-1 text-[10px] font-bold text-green-700 transition hover:bg-green-50 sm:px-3 sm:py-1.5 sm:text-xs" onClick={() => action(() => approveApplication(app.id), 'Record approved')}>Approve</button>
            <button className="rounded-md border border-red-200 px-2 py-1 text-[10px] font-bold text-red-700 transition hover:bg-red-50 sm:px-3 sm:py-1.5 sm:text-xs" onClick={() => action(() => rejectApplication(app.id), 'Record rejected')}>Reject</button>
            <button className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-bold text-navy transition hover:bg-slate-50 sm:px-3 sm:py-1.5 sm:text-xs" onClick={() => {
              const roomNo = window.prompt('Enter room number', app.roomNo || '');
              if (roomNo) action(() => assignRoom(app.id, roomNo), 'Room updated');
            }}>Room</button>
            <button className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-bold text-slate-700 transition hover:bg-slate-50 sm:px-3 sm:py-1.5 sm:text-xs" onClick={() => printApplication(app)}>Print</button>
            <button className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-bold text-slate-700 transition hover:bg-slate-50 sm:px-3 sm:py-1.5 sm:text-xs" onClick={() => downloadApplicationPdf(app)}>PDF</button>
            <button className="rounded-md border border-red-200 px-2 py-1 text-[10px] font-bold text-red-700 transition hover:bg-red-50 sm:px-3 sm:py-1.5 sm:text-xs" onClick={() => setDeleteId(app.id)}>Delete</button>
          </div>
        );
      },
    },
  ], []);

  const table = useReactTable({ data: rows, columns, state: { sorting }, onSortingChange: setSorting, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() });

  const runSearch = async () => {
    setLoading(true);
    try {
      setRows(keyword.trim() ? await searchApplications(keyword) : await getApplications());
    } finally {
      setLoading(false);
    }
  };

  const runFilter = async () => {
    setLoading(true);
    try {
      setRows(await filterApplications({ status, gender, course }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 page-fade">
      <PageHeader
        eyebrow="Hostel Office"
        title="Saved Student Records"
        description="Search, filter, review, edit, approve, reject, print, and export hostel joining records."
        action={<button className="btn-secondary w-full bg-white text-navy sm:w-auto" onClick={() => exportApplicationsCsv(rows)}><Download className="h-4 w-4" />Export CSV</button>}
      />

      <div className="section-card p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1.4fr_0.7fr_0.7fr_0.9fr_auto_auto]">
          <div className="relative sm:col-span-2 xl:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input className="pl-9" placeholder="Search student, register, hostel, room..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value as ApplicationStatus | '')}>
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select value={gender} onChange={(e) => setGender(e.target.value as Gender | '')}>
            <option value="">All Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          <input placeholder="Course filter" value={course} onChange={(e) => setCourse(e.target.value)} />
          <button className="btn-secondary w-full" onClick={runSearch}>Search</button>
          <button className="btn-primary w-full" onClick={runFilter}>Filter</button>
        </div>
      </div>

      <section id="applications-table" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,37,68,0.08)]">
        <div className="flex flex-col justify-between gap-2 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-navy">Record Register</h2>
            <p className="mt-0.5 text-sm font-semibold text-slate-500">{rows.length} saved {rows.length === 1 ? 'record' : 'records'} shown</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-600 ring-1 ring-slate-200">
            <span className="h-1 w-1 rounded-full bg-slate-400" />
            Office Master
          </span>
        </div>
        {loading ? <Loading /> : rows.length === 0 ? <EmptyState /> : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-[1180px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                {table.getHeaderGroups().map((group) => (
                  <tr key={group.id}>
                    {group.headers.map((header) => (
                      <th key={header.id} className="whitespace-nowrap px-5 py-4 text-xs uppercase tracking-wide">
                        <button className="font-bold" onClick={header.column.getToggleSortingHandler()}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </button>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="group border-t border-slate-100 transition duration-200 hover:bg-blue-50/50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-5 py-4 align-middle">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <ConfirmModal
        open={deleteId !== null}
        title="Delete record"
        message="This hostel record will be permanently removed."
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) action(() => deleteApplication(deleteId), 'Record deleted');
          setDeleteId(null);
        }}
      />
    </div>
  );
}

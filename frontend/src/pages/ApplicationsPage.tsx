import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Check, Download, Edit, Eye, FileDown, Printer, Search, Trash2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { approveApplication, assignRoom, deleteApplication, filterApplications, getApplications, rejectApplication, searchApplications } from '../api/applicationApi';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
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
    { accessorKey: 'studentName', header: 'Student name' },
    { accessorKey: 'registerNumber', header: 'Register number' },
    { accessorKey: 'course', header: 'Course' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'studentMobileNo', header: 'Student mobile' },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => <StatusBadge status={row.original.status} /> },
    { accessorKey: 'roomNo', header: 'Room No', cell: ({ row }) => row.original.roomNo || 'Not allotted' },
    { accessorKey: 'dateOfJoining', header: 'Date of joining' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const app = row.original;
        return (
          <div className="flex flex-wrap gap-2">
            <Link title="View" className="rounded-md p-2 text-royal hover:bg-blue-50" to={`/admin/applications/${app.id}`}><Eye className="h-4 w-4" /></Link>
            <Link title="Edit" className="rounded-md p-2 text-slate-700 hover:bg-slate-100" to={`/admin/applications/${app.id}/edit`}><Edit className="h-4 w-4" /></Link>
            <button title="Approve" className="rounded-md p-2 text-green-700 hover:bg-green-50" onClick={() => action(() => approveApplication(app.id), 'Application approved')}><Check className="h-4 w-4" /></button>
            <button title="Reject" className="rounded-md p-2 text-red-700 hover:bg-red-50" onClick={() => action(() => rejectApplication(app.id), 'Application rejected')}><X className="h-4 w-4" /></button>
            <button title="Assign room" className="rounded-md px-2 py-1 text-xs font-bold text-navy hover:bg-slate-100" onClick={() => {
              const roomNo = window.prompt('Enter room number', app.roomNo || '');
              if (roomNo) action(() => assignRoom(app.id, roomNo), 'Room updated');
            }}>Room</button>
            <button title="Print" className="rounded-md p-2 text-slate-700 hover:bg-slate-100" onClick={() => printApplication(app)}><Printer className="h-4 w-4" /></button>
            <button title="PDF" className="rounded-md p-2 text-slate-700 hover:bg-slate-100" onClick={() => downloadApplicationPdf(app)}><FileDown className="h-4 w-4" /></button>
            <button title="Delete" className="rounded-md p-2 text-red-700 hover:bg-red-50" onClick={() => setDeleteId(app.id)}><Trash2 className="h-4 w-4" /></button>
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
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-navy">Applications</h1>
          <p className="mt-1 text-sm text-slate-600">Search, filter, sort, approve, reject, allot rooms, export, and print.</p>
        </div>
        <button className="btn-primary" onClick={() => exportApplicationsCsv(rows)}><Download className="h-4 w-4" />Export CSV</button>
      </div>

      <div className="panel p-4">
        <div className="grid gap-3 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input className="pl-9" placeholder="Search name, register number, course, mobile, parent" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
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
          <button className="btn-secondary" onClick={runSearch}>Search</button>
          <button className="btn-primary" onClick={runFilter}>Filter</button>
        </div>
      </div>

      <section id="applications-table" className="panel overflow-hidden">
        {loading ? <Loading /> : rows.length === 0 ? <EmptyState /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                {table.getHeaderGroups().map((group) => (
                  <tr key={group.id}>
                    {group.headers.map((header) => (
                      <th key={header.id} className="whitespace-nowrap px-4 py-3">
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
                  <tr key={row.id} className="border-t border-slate-100">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-4 py-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
        title="Delete application"
        message="This application will be permanently removed."
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) action(() => deleteApplication(deleteId), 'Application deleted');
          setDeleteId(null);
        }}
      />
    </div>
  );
}

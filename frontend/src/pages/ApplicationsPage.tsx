import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { filterApplications, getApplications, searchApplications } from '../api/applicationApi';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import { Gender, HostelApplication } from '../types/application';

export default function ApplicationsPage() {
  const [rows, setRows] = useState<HostelApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [keyword, setKeyword] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [course, setCourse] = useState('');

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

  const columns = useMemo<ColumnDef<HostelApplication>[]>(() => [
    { accessorKey: 'studentName', header: 'Student Name', cell: ({ row }) => <span className="font-bold text-navy">{row.original.studentName}</span> },
    { accessorKey: 'registerNumber', header: 'Register No', cell: ({ row }) => <span className="font-mono font-bold text-slate-600">{row.original.registerNumber}</span> },
    { accessorKey: 'course', header: 'Course' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'studentMobileNo', header: 'Student mobile' },
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
          <div className="flex flex-wrap items-center gap-1.5 md:min-w-[145px] md:gap-2">
            <Link className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-royal transition hover:bg-blue-100 sm:px-3 sm:py-1.5 sm:text-xs" to={`/admin/applications/${app.id}`}>View</Link>
            <Link className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:px-3 sm:py-1.5 sm:text-xs" to={`/admin/applications/${app.id}/edit`}>Edit</Link>
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
      setRows(await filterApplications({ gender, course }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-lg bg-navy p-5 text-white shadow-[0_24px_70px_rgba(15,37,68,0.18)] md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-100">Institution Hostel Office</p>
          <h1 className="mt-1 text-2xl font-bold">Saved Student Records</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">View, edit, print, and export hostel student details stored in the institution database.</p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(15,37,68,0.08)]">
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-[1.5fr_0.75fr_0.95fr_auto_auto]">
          <div className="relative col-span-2 lg:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input className="pl-9" placeholder="Search student, register, hostel, room..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>
          <select value={gender} onChange={(e) => setGender(e.target.value as Gender | '')}>
            <option value="">All Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          <input className="col-span-2 lg:col-span-1" placeholder="Course filter" value={course} onChange={(e) => setCourse(e.target.value)} />
          <button className="btn-secondary" onClick={runSearch}>Search</button>
          <button className="btn-primary" onClick={runFilter}>Filter</button>
        </div>
      </div>

      <section id="applications-table" className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,37,68,0.08)]">
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
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                {table.getHeaderGroups().map((group) => (
                  <tr key={group.id}>
                    {group.headers.map((header) => (
                      <th key={header.id} className={`whitespace-nowrap px-5 py-4 text-xs uppercase tracking-wide ${['registerNumber', 'course', 'gender', 'studentMobileNo', 'hostelName', 'floorNo', 'dateOfJoining'].includes(header.id) ? 'hidden lg:table-cell' : ''}`}>
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
                      <td key={cell.id} className={`whitespace-nowrap px-5 py-4 align-middle ${['registerNumber', 'course', 'gender', 'studentMobileNo', 'hostelName', 'floorNo', 'dateOfJoining'].includes(cell.column.id) ? 'hidden lg:table-cell' : ''}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  );
}

import { HostelApplication } from '../types/application';

export const exportApplicationsCsv = (rows: HostelApplication[]) => {
  const headers = ['Student Name', 'Register Number', 'Course', 'Gender', 'Student Mobile', 'Parent Name', 'Parent Contact', 'Status', 'Room No', 'Date of Joining'];
  const values = rows.map((row) => [
    row.studentName,
    row.registerNumber,
    row.course,
    row.gender,
    row.studentMobileNo,
    row.parentName,
    row.parentContactNo,
    row.status,
    row.roomNo || '',
    row.dateOfJoining,
  ]);
  const csv = [headers, ...values]
    .map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'hostel-applications.csv';
  link.click();
  URL.revokeObjectURL(url);
};

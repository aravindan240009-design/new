import { HostelApplication } from '../types/application';

export const exportApplicationsCsv = (rows: HostelApplication[]) => {
  const headers = ['Student Name', 'Register Number', 'Course', 'Gender', 'Student Mobile', 'Parent Name', 'Parent Contact', 'Hostel Name', 'Floor No', 'Room No', 'Bed No', 'Warden Name', 'Warden Contact', 'Date of Admission'];
  const values = rows.map((row) => [
    row.studentName,
    row.registerNumber,
    row.course,
    row.gender,
    row.studentMobileNo,
    row.parentName,
    row.parentContactNo,
    row.hostelName || '',
    row.floorNo || '',
    row.roomNo || '',
    row.bedNo || '',
    row.wardenName || '',
    row.wardenContactNo || '',
    row.dateOfJoining,
  ]);
  const csv = [headers, ...values]
    .map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'hostel-student-records.csv';
  link.click();
  URL.revokeObjectURL(url);
};

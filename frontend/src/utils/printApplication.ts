import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { HostelApplication } from '../types/application';

const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');

export const printApplication = (application: HostelApplication) => {
  const html = `
    <html><head><title>${application.registerNumber}</title>
    <style>body{font-family:Arial;padding:28px;color:#111827}h1{color:#0f2544}table{width:100%;border-collapse:collapse}td{border:1px solid #d1d5db;padding:10px;vertical-align:top}td:first-child{font-weight:700;background:#f8fafc;width:32%}</style>
    </head><body><h1>Hostel Detail Submission</h1><table>
      ${Object.entries({
        'Student Name': application.studentName,
        'Register Number': application.registerNumber,
        Course: application.course,
        Gender: application.gender,
        'Date of Birth': application.dateOfBirth,
        'Date of Admission': application.dateOfJoining,
        'Student Mobile': application.studentMobileNo,
        'Parent Name': application.parentName,
        'Parent Contact': application.parentContactNo,
        'Residence Address': application.residenceAddress,
        'Permanent Address': application.permanentAddress,
        'Local Guardian': application.localGuardianName,
        'Guardian Contact': application.localGuardianContactNo,
        'Guardian Address': application.localGuardianAddress,
        'Hostel Name': application.hostelName || 'Not provided',
        'Floor No': application.floorNo || 'Not provided',
        'Room No': application.roomNo || 'Not provided',
        'Bed No': application.bedNo || 'Not assigned',
        'Warden Name': application.wardenName || 'Not provided',
        'Warden Contact': application.wardenContactNo || 'Not provided',
      }).map(([key, value]) => `<tr><td>${escapeHtml(key)}</td><td>${escapeHtml(String(value))}</td></tr>`).join('')}
    </table></body></html>`;
  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    win.print();
  }
};

export const downloadElementPdf = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  const canvas = await html2canvas(element, { scale: 2 });
  const pdf = new jsPDF('p', 'mm', 'a4');
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
  pdf.save(filename);
};

export const downloadApplicationPdf = (application: HostelApplication) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const lines = [
    ['Student Name', application.studentName],
    ['Register Number', application.registerNumber],
    ['Course', application.course],
    ['Gender', application.gender],
    ['Date of Birth', application.dateOfBirth],
    ['Date of Admission', application.dateOfJoining],
    ['Student Mobile', application.studentMobileNo],
    ['Parent Name', application.parentName],
    ['Parent Contact', application.parentContactNo],
    ['Residence Address', application.residenceAddress],
    ['Permanent Address', application.permanentAddress],
    ['Local Guardian', application.localGuardianName],
    ['Guardian Contact', application.localGuardianContactNo],
    ['Guardian Address', application.localGuardianAddress],
    ['Hostel Name', application.hostelName || 'Not provided'],
    ['Floor No', application.floorNo || 'Not provided'],
    ['Room No', application.roomNo || 'Not provided'],
    ['Bed No', application.bedNo || 'Not assigned'],
    ['Warden Name', application.wardenName || 'Not provided'],
    ['Warden Contact', application.wardenContactNo || 'Not provided'],
  ];

  pdf.setFontSize(16);
  pdf.text('Hostel Detail Submission', 14, 18);
  pdf.setFontSize(10);
  let y = 30;
  lines.forEach(([label, value]) => {
    const wrapped = pdf.splitTextToSize(String(value), 120);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${label}:`, 14, y);
    pdf.setFont('helvetica', 'normal');
    pdf.text(wrapped, 62, y);
    y += Math.max(8, wrapped.length * 6);
    if (y > 280) {
      pdf.addPage();
      y = 20;
    }
  });
  pdf.save(`${application.registerNumber}.pdf`);
};

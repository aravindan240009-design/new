import { ApplicationStatus } from '../types/application';

const styles: Record<ApplicationStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
  APPROVED: 'bg-green-100 text-green-800 ring-green-200',
  REJECTED: 'bg-red-100 text-red-800 ring-red-200',
};

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${styles[status]}`}>{status}</span>;
}

import { X } from 'lucide-react';

interface Props {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({ open, title, message, onConfirm, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-soft sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-navy">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
          </div>
          <button className="rounded-xl p-2 hover:bg-slate-100" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 grid gap-3 sm:flex sm:justify-end">
          <button className="btn-secondary w-full sm:w-auto" onClick={onClose}>Cancel</button>
          <button className="btn-danger w-full sm:w-auto" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

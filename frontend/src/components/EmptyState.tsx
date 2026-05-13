import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No records found' }: { title?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
      <Inbox className="h-10 w-10" />
      <p className="font-semibold">{title}</p>
    </div>
  );
}

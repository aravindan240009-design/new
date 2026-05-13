import { LucideIcon } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon }: { title: string; value: number; icon: LucideIcon }) {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-navy">{value}</p>
        </div>
        <div className="rounded-md bg-blue-50 p-3 text-royal">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

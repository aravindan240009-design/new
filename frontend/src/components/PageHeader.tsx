import { ReactNode } from 'react';

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-br from-navy via-[#143a68] to-[#0b1b33] p-5 text-white shadow-[0_24px_70px_rgba(15,37,68,0.18)] sm:p-6 lg:flex-row lg:items-center ${className}`}>
      <div className="min-w-0">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-wide text-blue-100">{eyebrow}</p>}
        <h1 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">{description}</p>}
      </div>
      {action && <div className="w-full shrink-0 sm:w-auto">{action}</div>}
    </div>
  );
}

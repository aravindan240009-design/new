import { ReactNode } from 'react';

export default function PageContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`page-shell page-fade ${className}`}>{children}</div>;
}

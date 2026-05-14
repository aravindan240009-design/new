import { ReactNode } from 'react';

export default function SectionCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`section-card card-rise ${className}`}>{children}</section>;
}

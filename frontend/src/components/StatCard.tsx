export default function StatCard({ title, value, accent = 'bg-royal' }: { title: string; value: number; accent?: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.08] p-5 shadow-[0_26px_70px_rgba(5,18,38,0.28)] backdrop-blur">
      <div className={`absolute right-5 top-5 h-2 w-14 rounded-full ${accent}`} />
      <p className="text-sm font-semibold text-blue-100">{title}</p>
      <p className="mt-4 text-4xl font-bold text-white">{value}</p>
    </div>
  );
}

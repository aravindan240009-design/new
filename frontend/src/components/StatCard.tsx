export default function StatCard({ title, value, accent = 'bg-royal' }: { title: string; value: number; accent?: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.08] p-4 shadow-[0_20px_56px_rgba(5,18,38,0.24)] backdrop-blur">
      <div className={`absolute right-4 top-4 h-2 w-14 rounded-full ${accent}`} />
      <p className="text-sm font-semibold text-blue-100">{title}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export default function StatCard({ title, value, accent = 'bg-royal' }: { title: string; value: number; accent?: string }) {
  return (
    <div className="group relative min-h-[132px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.08] p-5 shadow-[0_20px_56px_rgba(5,18,38,0.24)] backdrop-blur transition duration-300 lg:hover:-translate-y-1 lg:hover:bg-white/[0.12]">
      <div className={`absolute right-5 top-5 h-2 w-16 rounded-full ${accent}`} />
      <p className="max-w-[70%] text-sm font-bold text-blue-100/85">{title}</p>
      <p className="mt-6 text-4xl font-bold leading-none text-white">{value}</p>
    </div>
  );
}

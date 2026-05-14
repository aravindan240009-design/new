export default function StatCard({ title, value, accent = 'bg-royal' }: { title: string; value: number; accent?: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.08] p-3 shadow-[0_20px_56px_rgba(5,18,38,0.24)] backdrop-blur sm:p-4">
      <div className={`absolute right-3 top-3 h-1.5 w-10 rounded-full ${accent} sm:right-4 sm:top-4 sm:h-2 sm:w-14`} />
      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100/80 sm:text-sm sm:normal-case sm:tracking-normal">{title}</p>
      <p className="mt-1 text-xl font-bold text-white sm:mt-3 sm:text-3xl">{value}</p>
    </div>
  );
}

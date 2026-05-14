export default function Loading() {
  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-ping rounded-full bg-royal/20" />
        <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-slate-100 border-t-royal" />
      </div>
      <p className="animate-pulse text-sm font-bold tracking-wide text-slate-500 uppercase">Fetching Records</p>
    </div>
  );
}

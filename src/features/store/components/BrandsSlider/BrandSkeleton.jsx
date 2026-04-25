/**
 * Skeleton loader for a single brand card.
 */
export default function BrandSkeleton() {
  return (
    <div className="w-full bg-slate-100 border border-cz-border rounded-[14px] flex flex-col items-center gap-2 px-2 py-4 animate-pulse pointer-events-none">
      <div className="w-16 h-16 rounded-[10px] bg-slate-200" />
      <div className="w-14 h-2.5 rounded-full bg-slate-200" />
    </div>
  );
}

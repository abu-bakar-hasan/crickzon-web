export default function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden flex flex-col">
      <div className="w-full h-[200px] bg-gray-200 animate-pulse"></div>
      <div className="p-4 flex flex-col gap-4">
        <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 animate-pulse rounded w-2/5 my-2"></div>
        <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-full"></div>
      </div>
    </div>
  );
}

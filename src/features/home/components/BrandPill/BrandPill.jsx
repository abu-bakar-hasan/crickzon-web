import Link from "next/link";

export default function BrandPill({ brand }) {
  return (
    <Link 
      href={`/store/brand/${brand.name}`}
      className="px-8 py-4 bg-[#F5F5F5] rounded-full text-[#374151] font-bold text-lg text-center whitespace-nowrap hover:bg-gray-200 cursor-pointer transition-colors block"
    >
      {brand.name}
    </Link>
  );
}

import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link href={`/store/c/${category.slug || category.name?.toLowerCase()}`} className="group flex flex-col items-center gap-4 p-8 bg-[#F5F5F5] rounded-3xl hover:-translate-y-2 transition-transform duration-300">
      {category.image ? (
        <img src={category.image} alt={category.name} className="w-16 h-16 object-contain" />
      ) : (
        <span className="text-5xl">{category.icon || "🛍️"}</span>
      )}
      <h3 className="text-xl font-bold text-[#0F172A] text-center">{category.name}</h3>
      <span className="text-[#0057A8] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
        Shop Now <span>&rarr;</span>
      </span>
    </Link>
  );
}

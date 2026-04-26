import { useEffect, useState } from "react";
import api from "@/lib/axios";
import CategoryCard from "../components/CategoryCard/CategoryCard";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data.categories || res.data || []))
      .catch((err) => console.error("CategoriesSection error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto w-full py-10">
        <div className="animate-pulse bg-gray-200 h-8 w-48 mb-8 rounded"></div>
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[80vw] sm:w-[45vw] md:w-[200px] shrink-0 h-[220px] bg-gray-100 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (!categories.length) return null;

  return (
    <section className="px-6 md:px-16 max-w-[1440px] mx-auto w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8">Shop by Category</h2>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-4 md:pb-0 md:grid md:grid-cols-4 lg:grid-cols-6 custom-scrollbar">
        {categories.map((cat) => (
          <div key={cat._id || cat.name} className="w-[80vw] sm:w-[45vw] md:w-auto shrink-0 snap-start">
            <CategoryCard category={cat} />
          </div>
        ))}
      </div>
    </section>
  );
}

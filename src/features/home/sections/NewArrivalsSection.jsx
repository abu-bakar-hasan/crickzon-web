import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import ProductCard from "../components/ProductCard/ProductCard";

export default function NewArrivalsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products?limit=8")
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("NewArrivalsSection error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto w-full py-10">
        <div className="animate-pulse bg-gray-200 h-8 w-48 mb-8 rounded"></div>
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[80vw] sm:w-[45vw] md:w-[280px] shrink-0 h-[380px] bg-gray-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="px-6 md:px-16 max-w-[1440px] mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">New Arrivals</h2>
          <p className="text-gray-500 mt-1">Fresh gear, just dropped.</p>
        </div>
        <Link href="/store" className="hidden sm:block text-[#0057A8] font-semibold hover:underline">
          View All &rarr;
        </Link>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-4 md:pb-0 md:grid md:grid-cols-4 custom-scrollbar">
        {products.map((p) => (
          <div key={p._id} className="w-[80vw] sm:w-[45vw] md:w-auto shrink-0 snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <Link href="/store" className="sm:hidden block text-center mt-8 text-[#0057A8] font-semibold hover:underline">
        View All &rarr;
      </Link>
    </section>
  );
}

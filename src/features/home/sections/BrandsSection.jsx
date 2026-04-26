import { useEffect, useState } from "react";
import api from "@/lib/axios";
import BrandPill from "../components/BrandPill/BrandPill";

export default function BrandsSection() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/brands")
      .then((res) => setBrands(res.data.brands || res.data || []))
      .catch((err) => console.error("BrandsSection error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="px-6 md:px-16 max-w-[1440px] mx-auto w-full py-10">
        <div className="animate-pulse bg-gray-200 h-8 w-48 mb-8 rounded"></div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-[60px] w-[140px] bg-gray-100 rounded-full animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (!brands.length) return null;

  return (
    <section className="px-6 md:px-16 max-w-[1440px] mx-auto w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8">Top Brands We Carry</h2>
      <div className="flex flex-wrap gap-4 items-center justify-start md:justify-center">
        {brands.map((brand) => (
          <BrandPill key={brand._id || brand.name} brand={brand} />
        ))}
      </div>
    </section>
  );
}

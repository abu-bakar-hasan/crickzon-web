"use client";
import { useToast } from "@/context/ToastContext";

export default function ShareButton({ product }) {
  const { showToast } = useToast();

  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://crickzon.vercel.app"}/store/${product.slug}`;
  const shareText = `Check out ${product.name} on Crickzon! 🏏`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: productUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") console.error("Share failed:", err);
      }
    } else {
      await navigator.clipboard.writeText(productUrl);
      showToast("Link copied!", "success");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center w-10 h-10 border border-[#E5E7EB] rounded-full text-[#6B7280] hover:border-[#0057A8] hover:text-[#0057A8] hover:bg-blue-50 transition-colors bg-white shadow-sm"
      title="Share"
      aria-label="Share product"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    </button>
  );
}

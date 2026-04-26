import ProductClient from "./ProductClient";

async function fetchProductData(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${baseUrl}/products/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const data = await fetchProductData(slug);

  if (!data || !data.product) {
    return {
      title: "Product Not Found | Crickzon",
    };
  }

  const product = data.product;

  return {
    title: `${product.name} | Crickzon`,
    description: product.description || `Buy ${product.name} at the best price on Crickzon.`,
    openGraph: {
      title: product.name,
      description: product.description || `Buy ${product.name} on Crickzon.`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://crickzon.vercel.app"}/products/${product.slug}`,
      siteName: "Crickzon",
      images: [
        {
          url: product.images?.[0] || "",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.images?.[0] || ""],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const slug = (await params).slug;
  const data = await fetchProductData(slug);

  if (!data || !data.product) {
    return <ProductClient product={null} variants={[]} />;
  }

  return <ProductClient product={data.product} variants={data.variants || []} />;
}

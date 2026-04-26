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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://crickzon.vercel.app";
  const firstImage = product.images?.[0];
  const imageUrl = firstImage 
    ? (firstImage.startsWith('http') ? firstImage : `${siteUrl}${firstImage.startsWith('/') ? '' : '/'}${firstImage}`)
    : "";

  return {
    title: `${product.name} | Crickzon`,
    description: product.description || `Buy ${product.name} at the best price on Crickzon.`,
    openGraph: {
      title: product.name,
      description: product.description || `Buy ${product.name} on Crickzon.`,
      url: `${siteUrl}/store/${product.slug}`,
      siteName: "Crickzon",
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
      }),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      ...(imageUrl && { images: [imageUrl] }),
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

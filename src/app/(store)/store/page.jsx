import ProductGrid from '@/features/store/components/ProductGrid/ProductGrid';

export default function StorePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', padding: '32px 16px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <ProductGrid />
      </div>
    </div>
  );
}

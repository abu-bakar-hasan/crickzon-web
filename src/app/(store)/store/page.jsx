import HeroBanner from '@/components/store/home/HeroBanner';
import BrandsSlider from '@/components/store/home/BrandsSlider';
import CategoryGrid from '@/components/store/home/CategoryGrid';
import TrendingProducts from '@/components/store/home/TrendingProducts';

export default function StoreHome() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '64px' }}>
      <HeroBanner />
      <BrandsSlider />
      <CategoryGrid />
      <TrendingProducts />
    </div>
  );
}

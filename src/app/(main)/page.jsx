import HeroSection from '@/features/store/sections/HeroSection';
import CategorySection from '@/features/store/sections/CategorySection';
import FeaturedProductsSection from '@/features/store/sections/FeaturedProductsSection';
import BannerStrip from '@/features/store/sections/BannerStrip';

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
      <BannerStrip />
    </div>
  );
}

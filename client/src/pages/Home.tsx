import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import RecentItems from '@/components/home/RecentItems';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Parivartana - Sustainable Student Marketplace</title>
        <meta name="description" content="Buy, sell, and exchange used items within your campus community. Save money while reducing waste with Parivartana - the sustainable student marketplace." />
      </Helmet>
      
      <div>
        <HeroSection />
        <CategoriesSection />
        <RecentItems />
        <HowItWorks />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
};

export default Home;

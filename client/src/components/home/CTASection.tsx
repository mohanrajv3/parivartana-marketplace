import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { UserPlus, Search, CheckCircle } from 'lucide-react';
import { FaLeaf, FaClock, FaUniversity } from 'react-icons/fa';

const FeatureItem = ({ icon: Icon, title, description }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="flex">
      <div className="mr-4 flex-shrink-0 text-green-500">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        <p className="text-green-100">{description}</p>
      </div>
    </div>
  );
};

const CTASection = () => {
  const features = [
    {
      icon: FaLeaf,
      title: "Eco-Friendly Exchange",
      description: "Every transaction reduces waste and campus carbon footprint."
    },
    {
      icon: FaClock,
      title: "Quick & Convenient",
      description: "List items in minutes and connect with buyers instantly."
    },
    {
      icon: FaUniversity,
      title: "Campus Community",
      description: "Trade exclusively with verified students from your institution."
    }
  ];
  
  return (
    <section className="bg-gradient-to-br from-green-800 to-green-900 py-16 relative overflow-hidden">
      {/* Background decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">Ready to Join the Sustainable Revolution?</h2>
            
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <FeatureItem 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-lg font-medium">
                  <UserPlus className="mr-2 h-4 w-4" />Sign Up Now
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-green-800 shadow-lg">
                  <Search className="mr-2 h-4 w-4" />Browse Items
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 rounded-xl p-8 backdrop-blur-sm border border-white border-opacity-20 space-y-4">
            <h3 className="text-xl font-semibold text-white mb-4">Students are already saving with Parivartana</h3>
            
            <div className="space-y-4">
              {[
                "Average savings of ₹3,500 per semester on textbooks",
                "Over 5,000 items given second life instead of landfill",
                "92% of users report positive experiences with exchanges",
                "Access to course materials not available elsewhere"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                  <p className="text-white">{item}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-white border-opacity-20">
              <p className="text-green-100 text-sm italic">
                "Parivartana is transforming how students acquire and dispose of campus essentials."
                <span className="block mt-2 text-white font-medium">— Dr. Rao, Environmental Studies</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Search, Tag, ArrowRight } from 'lucide-react';
import { FaLeaf, FaWallet, FaRecycle } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-green-700 to-green-900 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 678">
          <path className="text-white text-opacity-10" fill="currentColor" d="M0 0c31.5 21 63 42 94.5 63l283.5 189L567 378l189 126 189 126h378c31.5 0 63 0 94.5-1.5l47.25-1.5 47.25-1.5V0H0z" />
        </svg>
      </div>
      <div className="relative py-20 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-green-600 bg-opacity-30 px-4 py-2 rounded-full mb-6">
              <p className="text-white text-sm font-semibold">Sustainable Student Marketplace</p>
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block">Empowering Students</span>
              <span className="block">Through Sustainable</span>
              <span className="block text-yellow-400">Exchange & Reuse</span>
            </h1>
            <p className="mt-6 max-w-lg text-xl text-white text-opacity-90">
              Buy, sell, and exchange used items within your campus community. Save money while reducing waste.
            </p>
            <div className="mt-10 flex gap-4 flex-wrap">
              <Link href="/marketplace">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-lg">
                  <Search className="mr-2 h-4 w-4" />Browse Products
                </Button>
              </Link>
              <Link href="/sell">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-green-900 shadow-lg">
                  <Tag className="mr-2 h-4 w-4" />List an Item
                </Button>
              </Link>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaRecycle className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-white font-semibold">5000+ Items</p>
                  <p className="text-white text-opacity-80 text-sm">Exchanged</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaLeaf className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-white font-semibold">12 Campuses</p>
                  <p className="text-white text-opacity-80 text-sm">Participating</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Students exchanging items on campus" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent px-6 py-4">
                <p className="text-white text-lg font-semibold">Empowering sustainable choices</p>
                <Link href="/about" className="text-yellow-400 flex items-center text-sm mt-1 hover:underline">
                  Learn about our mission <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 animate-[float_3s_ease-in-out_infinite] [animation-delay:0.5s] max-w-[250px]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaLeaf className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Saved 2.5 tons of CO₂</p>
                  <p className="text-xs text-gray-500">through campus-wide reusing</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-xl p-4 animate-[float_3s_ease-in-out_infinite] [animation-delay:1s] max-w-[250px]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaWallet className="text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Students saved ₹8.5 Lakhs</p>
                  <p className="text-xs text-gray-500">through sustainable exchanges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

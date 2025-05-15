import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Camera, MessageSquare, DollarSign, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Camera,
      title: "List Your Items",
      description: "Pay a small listing fee (₹20) and list items you no longer need. Clear photos and honest descriptions get better responses.",
      bgClass: "bg-blue-100",
      textClass: "text-blue-600",
      number: "01"
    },
    {
      icon: MessageSquare,
      title: "Connect with Buyers",
      description: "Interested buyers pay a small access fee (₹5) to contact you. Arrange meetups on campus for safe exchanges.",
      bgClass: "bg-purple-100",
      textClass: "text-purple-600",
      number: "02"
    },
    {
      icon: DollarSign,
      title: "Earn & Save",
      description: "Complete the sale and get 50% of your listing fee back. Buyers save money while helping reduce campus waste.",
      bgClass: "bg-green-100",
      textClass: "text-green-600",
      number: "03"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full -translate-y-1/2 translate-x-1/4 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100 rounded-full translate-y-1/4 -translate-x-1/4 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h5 className="text-green-600 font-medium mb-2">HOW IT WORKS</h5>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
          <p className="text-gray-600">Our platform makes it easy to buy, sell, and exchange items with a transparent and secure process</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="absolute -top-5 -right-5 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 right-0 w-12 h-2 translate-x-full">
                  <div className="w-full h-full flex items-center justify-center">
                    <ArrowRight className="text-green-400 w-10 h-10" />
                  </div>
                </div>
              )}
              
              <div className={`w-16 h-16 rounded-full ${step.bgClass} flex items-center justify-center ${step.textClass} text-2xl mb-6`}>
                <step.icon />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-green-700 rounded-xl p-8 text-white text-center md:text-left md:flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Ready to get started?</h3>
            <p className="text-green-100 max-w-lg">Join our community of eco-conscious students making a difference one exchange at a time.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link href="/about">
              <Button className="bg-white hover:bg-gray-100 text-green-700 shadow-lg">
                Learn More About Our Platform
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

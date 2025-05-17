import { User, Quote } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science, 3rd Year",
      text: "I sold my old laptop and three textbooks on Parivartana. The process was so smooth, and I made over ₹20,000 from items that would have just collected dust!",
      rating: 5,
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Rahul Patel",
      role: "Mechanical Engineering, 1st Year",
      text: "As a fresher, I saved thousands buying second-hand drawing equipment and last year's textbooks. Everything was in great condition and cost half the price!",
      rating: 4.5,
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      name: "Ananya Singh",
      role: "English Literature, 2nd Year",
      text: "Finding course books was always a struggle until I discovered Parivartana. Not only did I get all my required readings at a fraction of the cost, but I also made friends with seniors in my department!",
      rating: 5,
      photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  const impactStats = [
    { value: "5,000+", label: "Items exchanged", bgColor: "bg-blue-500" },
    { value: "₹8.5L+", label: "Student savings", bgColor: "bg-green-500" },
    { value: "5,000kg", label: "Waste prevented", bgColor: "bg-yellow-500" },
    { value: "12", label: "Campus communities", bgColor: "bg-purple-500" }
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="h-4 w-4 text-yellow-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
          </svg>
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <svg key={i + fullStars + (hasHalfStar ? 1 : 0)} className="h-4 w-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-16">
          <h5 className="text-green-600 font-medium mb-2">TESTIMONIALS</h5>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">What Our Community Says</h2>
          <p className="text-gray-600">Hear from students who have experienced the benefits of sustainability through our marketplace</p>
        </div>
        
        <div className="mb-16">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 h-full flex flex-col mx-2">
                    <div className="text-green-400 mb-4">
                      <Quote size={32} />
                    </div>
                    <p className="text-gray-700 flex-grow mb-6 text-lg italic">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.photoUrl} 
                        alt={testimonial.name} 
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                        <div className="mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="relative -left-0 top-0 translate-y-0 mr-2" />
              <CarouselNext className="relative -right-0 top-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
        
        <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Environmental Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                {impactStats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center">
                    <div className={`${stat.bgColor} w-12 h-12 rounded-full mb-3 flex items-center justify-center text-white`}>
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-gray-600 text-sm">Every exchange on our platform contributes to reduced waste and helps build a more sustainable future for campus communities.</p>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1534531173927-aeb928d54385?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Students participating in campus sustainability initiative" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

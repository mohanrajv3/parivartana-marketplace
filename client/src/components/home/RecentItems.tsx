import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Star, Heart, MessageCircle, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Product } from '@shared/schema';

const ProductCard = ({ product }: { product: Product }) => {
  const formatPrice = (price: number) => {
    // Convert from paisa to rupees
    return `₹${(price / 100).toFixed(2)}`;
  };

  const formatTimeSince = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  const getCategoryBadgeClass = (category: string) => {
    switch(category) {
      case 'books': return 'bg-blue-100 text-blue-600';
      case 'electronics': return 'bg-purple-100 text-purple-600';
      case 'clothes': return 'bg-pink-100 text-pink-600';
      case 'stationery': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-green-100 text-green-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Choose a placeholder image based on category
  const getPlaceholderImage = (category: string) => {
    switch(category) {
      case 'books': 
        return 'https://images.unsplash.com/photo-1588580000645-4562a6d2c839?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300';
      case 'electronics': 
        return 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300';
      case 'clothes': 
        return 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300';
      case 'stationery': 
        return 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300';
      default: 
        return 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300';
    }
  };

  const getConditionLabel = (condition: string) => {
    return condition.replace('_', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative">
        <img 
          src={product.imageUrl || getPlaceholderImage(product.category)} 
          alt={product.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${getCategoryBadgeClass(product.category)} border-none`}>
            {getCategoryLabel(product.category)}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium">View Details</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.title}</h3>
          <span className="font-bold text-green-600">{formatPrice(product.price)}</span>
        </div>
        <div className="flex items-center mb-2 text-xs">
          <Badge variant="outline" className="text-gray-600 rounded-full font-normal mr-2">
            {getConditionLabel(product.condition)}
          </Badge>
          <span className="flex items-center text-gray-500">
            <Clock className="mr-1 h-3 w-3" />
            {formatTimeSince(product.createdAt)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
            <MessageCircle className="mr-1 h-4 w-4" /> Contact Seller
          </button>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-gray-600">4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentItems = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['/api/products'],
    refetchOnWindowFocus: false,
  });

  if (error) {
    console.error('Error fetching recent products:', error);
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h5 className="text-green-600 font-medium mb-2">MARKETPLACE</h5>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Recently Listed Items</h2>
          <p className="text-gray-600">Discover the latest items from our student community that help reduce waste and save money</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Skeleton loading state
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              </div>
            ))
          ) : products && products.length > 0 ? (
            products.slice(0, 4).map((product: Product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No items available at the moment. Be the first to list an item!</p>
              <Link href="/sell" className="mt-4 inline-block">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg">
                  List an Item
                </button>
              </Link>
            </div>
          )}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/marketplace">
            <button className="bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-lg inline-flex items-center">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentItems;

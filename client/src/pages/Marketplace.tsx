import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { Product } from '@shared/schema';

import CategoryFilter from '@/components/marketplace/CategoryFilter';
import SortFilter from '@/components/marketplace/SortFilter';
import ProductCard from '@/components/marketplace/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

const Marketplace = () => {
  const [sortOption, setSortOption] = useState('newest');
  const [, navigate] = useLocation();
  
  // Get category from URL if present
  const [match, params] = useRoute('/marketplace/:category');
  const category = match ? params.category : null;
  
  // Fetch products based on category
  const queryKey = category 
    ? [`/api/products?category=${category}`] 
    : ['/api/products'];
    
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey,
    refetchOnWindowFocus: false,
  });
  
  const sortProducts = (productsToSort: Product[]) => {
    if (!productsToSort) return [];
    
    const sortedProducts = [...productsToSort];
    
    switch (sortOption) {
      case 'newest':
        return sortedProducts.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'lowest':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'highest':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating':
        // In a real app you would have actual ratings to sort by
        return sortedProducts;
      default:
        return sortedProducts;
    }
  };
  
  const sortedProducts = sortProducts(products || []);
  
  const getPageTitle = () => {
    if (!category) return 'All Products';
    
    const categoryMap: { [key: string]: string } = {
      'books': 'Books',
      'electronics': 'Electronics',
      'clothes': 'Clothes',
      'stationery': 'Stationery',
      'misc': 'Miscellaneous'
    };
    
    return categoryMap[category] || 'Products';
  };

  if (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <>
      <Helmet>
        <title>{`${getPageTitle()} - Parivartana Marketplace`}</title>
        <meta name="description" content={`Browse ${category || 'all'} items for sale in the Parivartana student marketplace. Find great deals on used items from your campus community.`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">{getPageTitle()}</h1>
          <p className="text-gray-600">
            Browse sustainable pre-owned items from your campus community
          </p>
        </div>
        
        <CategoryFilter />
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            {!isLoading && products ? `${products.length} items found` : 'Loading items...'}
          </div>
          <SortFilter value={sortOption} onChange={setSortOption} />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg">
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
            ))}
          </div>
        ) : sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => navigate(`/product/${product.id}`)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">No products found</h3>
            <p className="text-gray-500 mt-2 mb-6">Be the first to list an item in this category!</p>
            <button 
              onClick={() => navigate('/sell')}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg"
            >
              List an Item
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Marketplace;

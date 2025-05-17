import { 
  FaBook, 
  FaLaptop, 
  FaTshirt, 
  FaPencilAlt, 
  FaPuzzlePiece 
} from 'react-icons/fa';
import { Link, useLocation } from 'wouter';

const CategoryFilter = () => {
  const [location] = useLocation();
  
  const categories = [
    { 
      id: 'all',
      href: "/marketplace", 
      icon: () => <span className="text-2xl">🏠</span>, 
      label: "All", 
      bgActiveClass: "bg-gray-800",
      bgClass: "bg-gray-100", 
      iconActiveClass: "text-white",
      iconClass: "text-gray-700" 
    },
    { 
      id: 'books',
      href: "/marketplace/books", 
      icon: FaBook, 
      label: "Books", 
      bgActiveClass: "bg-primary-500",
      bgClass: "bg-primary-100", 
      iconActiveClass: "text-white",
      iconClass: "text-primary-500" 
    },
    { 
      id: 'electronics',
      href: "/marketplace/electronics", 
      icon: FaLaptop, 
      label: "Electronics", 
      bgActiveClass: "bg-secondary-500",
      bgClass: "bg-secondary-100", 
      iconActiveClass: "text-white",
      iconClass: "text-secondary-500" 
    },
    { 
      id: 'clothes',
      href: "/marketplace/clothes", 
      icon: FaTshirt, 
      label: "Clothes", 
      bgActiveClass: "bg-accent-500",
      bgClass: "bg-accent-100", 
      iconActiveClass: "text-gray-800",
      iconClass: "text-accent-500" 
    },
    { 
      id: 'stationery',
      href: "/marketplace/stationery", 
      icon: FaPencilAlt, 
      label: "Stationery", 
      bgActiveClass: "bg-primary-500",
      bgClass: "bg-primary-100", 
      iconActiveClass: "text-white",
      iconClass: "text-primary-500" 
    },
    { 
      id: 'misc',
      href: "/marketplace/misc", 
      icon: FaPuzzlePiece, 
      label: "Misc", 
      bgActiveClass: "bg-secondary-500",
      bgClass: "bg-secondary-100", 
      iconActiveClass: "text-white",
      iconClass: "text-secondary-500" 
    }
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex space-x-4 min-w-max px-1 py-2">
        {categories.map((category) => {
          const active = isActive(category.href);
          const Icon = category.icon;
          return (
            <Link href={category.href} key={category.id}>
              <div className="flex flex-col items-center cursor-pointer group">
                <div 
                  className={`
                    w-14 h-14 rounded-full flex items-center justify-center 
                    ${active ? category.bgActiveClass : category.bgClass} 
                    transition-colors duration-300
                  `}
                >
                  {typeof Icon === 'function' ? (
                    <Icon className={`text-xl ${active ? category.iconActiveClass : category.iconClass}`} />
                  ) : (
                    Icon
                  )}
                </div>
                <span className={`mt-2 text-sm font-medium ${active ? 'text-gray-900' : 'text-gray-600'}`}>
                  {category.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;

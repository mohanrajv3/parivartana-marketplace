import { Link } from 'wouter';
import { 
  FaBook, 
  FaLaptop, 
  FaTshirt, 
  FaPencilAlt, 
  FaPuzzlePiece,
  FaChevronRight 
} from 'react-icons/fa';

const CategoryItem = ({ 
  href, 
  icon: Icon, 
  label, 
  bgColorClass, 
  iconColorClass,
  count 
}: { 
  href: string; 
  icon: React.ElementType; 
  label: string; 
  bgColorClass: string; 
  iconColorClass: string;
  count: number;
}) => {
  return (
    <Link href={href}>
      <div className="group bg-white rounded-xl shadow-md hover:shadow-lg p-6 transition-all duration-300 border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 ${bgColorClass} rounded-full flex items-center justify-center ${iconColorClass}`}>
            <Icon className="text-2xl" />
          </div>
          <span className="text-gray-400 text-sm">{count} items</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{label}</h3>
        <div className="flex items-center text-sm text-green-700 group-hover:text-green-500 font-medium">
          Browse {label} <FaChevronRight className="ml-1 h-3 w-3" />
        </div>
      </div>
    </Link>
  );
};

const CategoriesSection = () => {
  const categories = [
    { 
      href: "/marketplace/books", 
      icon: FaBook, 
      label: "Books", 
      bgColorClass: "bg-blue-100", 
      iconColorClass: "text-blue-600",
      count: 245
    },
    { 
      href: "/marketplace/electronics", 
      icon: FaLaptop, 
      label: "Electronics", 
      bgColorClass: "bg-purple-100", 
      iconColorClass: "text-purple-600",
      count: 157
    },
    { 
      href: "/marketplace/clothes", 
      icon: FaTshirt, 
      label: "Clothes", 
      bgColorClass: "bg-pink-100", 
      iconColorClass: "text-pink-600",
      count: 183
    },
    { 
      href: "/marketplace/stationery", 
      icon: FaPencilAlt, 
      label: "Stationery", 
      bgColorClass: "bg-yellow-100", 
      iconColorClass: "text-yellow-600",
      count: 124
    },
    { 
      href: "/marketplace/misc", 
      icon: FaPuzzlePiece, 
      label: "Misc", 
      bgColorClass: "bg-green-100", 
      iconColorClass: "text-green-600",
      count: 96
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-12">
          <h5 className="text-green-600 font-medium mb-2">CATEGORIES</h5>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Browse Categories</h2>
          <p className="text-gray-600">Discover thousands of products available across various categories from your campus community</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <CategoryItem key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

import { Link } from 'wouter';
import { FaRecycle, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <FaRecycle className="text-accent-500 text-2xl mr-2" />
              <span className="font-display font-bold text-xl">Parivartana</span>
            </div>
            <p className="text-gray-400 mb-4">The sustainable student marketplace that makes a difference.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent-500" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-500" aria-label="Twitter">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-500" aria-label="Facebook">
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-accent-500">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-gray-400 hover:text-accent-500">
                  Sell Items
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-accent-500">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-accent-500">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/marketplace/books" className="text-gray-400 hover:text-accent-500">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/marketplace/electronics" className="text-gray-400 hover:text-accent-500">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/marketplace/clothes" className="text-gray-400 hover:text-accent-500">
                  Clothes
                </Link>
              </li>
              <li>
                <Link href="/marketplace/stationery" className="text-gray-400 hover:text-accent-500">
                  Stationery
                </Link>
              </li>
              <li>
                <Link href="/marketplace/misc" className="text-gray-400 hover:text-accent-500">
                  Miscellaneous
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about#faq" className="text-gray-400 hover:text-accent-500">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="text-gray-400 hover:text-accent-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about#privacy" className="text-gray-400 hover:text-accent-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about#terms" className="text-gray-400 hover:text-accent-500">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Parivartana. All rights reserved.</p>
          <p className="mt-2">Made with ♻️ for a sustainable campus future.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

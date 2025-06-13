
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";

// Replace with your actual logo import
import RomsayLogo from "/Rumsay-nobg.png"; // Adjust the path as necessary

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-700">
          
          {/* Hotel Info with Logo */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src={RomsayLogo} 
                alt="Romsay Luxury Hotel" 
                className="h-12 w-auto"
              />
              <div className="border-l border-gray-600 pl-3">
                <p className="text-xs text-gold-500 tracking-widest">LUXURY COLLECTION</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Where timeless elegance meets contemporary comfort in the heart of the city.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-gold-500 font-serif">Explore</h3>
            <ul className="space-y-3">
              {['Rooms & Suites', 'Dining', 'Spa', 'Gallery', 'Special Offers', 'Events'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-white text-sm transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-gold-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-gold-500 font-serif">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="flex-shrink-0 mt-1 text-gold-500" size={16} />
                <span>1 Luxury Avenue, Downtown District<br />Metropolis, 100001</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold-500" size={16} />
                <span>reservations@romsay.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold-500" size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-gold-500 font-serif">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for exclusive offers and luxury insights
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-white px-4 py-2 text-sm rounded-l focus:outline-none focus:ring-1 focus:ring-gold-500 w-full"
                required
              />
              <button
                type="submit"
                className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 text-sm rounded-r transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 text-xs mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Romsay Hotels International. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Sitemap', 'Careers', 'Press'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 hover:text-gold-500 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
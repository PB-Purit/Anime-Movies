import React, { useState } from 'react';
import { Search, User, ChevronDown } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="/" className="text-xl font-bold">
              Homepage
            </a>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1"
              >
                <span>Categories</span>
                <ChevronDown size={16} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg">
                  <a href="/category/anime" className="block px-4 py-2 hover:bg-gray-100">
                    Anime
                  </a>
                  <a href="/category/movies" className="block px-4 py-2 hover:bg-gray-100">
                    Movies
                  </a>
                </div>
              )}
            </div>
            
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-700 text-white px-4 py-1 rounded-full w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="text-gray-400" size={18} />
              </button>
            </form>

            <div className="relative">
              <button
                onClick={() => setIsLoginOpen(!isLoginOpen)}
                className="flex items-center space-x-1"
              >
                <User size={20} />
              </button>

              {isLoginOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-900 rounded-md shadow-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Login</h3>
                  <input
                    type="text"
                    placeholder="Username or Email"
                    className="w-full mb-2 px-3 py-2 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-3 py-2 border rounded"
                  />
                  <button className="w-full bg-blue-600 text-white py-2 rounded mb-2">
                    Login
                  </button>
                  <div className="flex justify-between text-sm">
                    <a href="/register" className="text-blue-600">Register an account</a>
                    <a href="/forgot-password" className="text-blue-600">Forgot Password?</a>
                  </div>
                  <div className="mt-4 border-t pt-4">
                    <button className="w-full bg-red-600 text-white py-2 rounded mb-2">
                      Login with Google
                    </button>
                    <button className="w-full bg-blue-800 text-white py-2 rounded mb-2">
                      Login with Facebook
                    </button>
                    <button className="w-full bg-blue-500 text-white py-2 rounded">
                      Login with Hotmail
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
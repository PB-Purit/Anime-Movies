import React, { useState } from 'react';
import { Anime, Movie } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentGridProps {
  title: string;
  items: (Anime | Movie)[];
  type: 'anime' | 'movie';
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ title, items, type, currentPage, onPageChange }) => {
  const [selectedItem, setSelectedItem] = useState<Anime | Movie | null>(null);

  const handleItemClick = (item: Anime | Movie) => {
    setSelectedItem(item);
  };

  return (
    <div className="p-6 bg-black">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {items.map((item) => (
          <div 
            key={type === 'anime' ? (item as Anime).mal_id : (item as Movie).id} 
            className="relative group cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <img
              src={type === 'anime' ? (item as Anime).images.jpg.image_url : `https://image.tmdb.org/t/p/w500${(item as Movie).poster_path}`}
              alt={type === 'anime' ? (item as Anime).title : (item as Movie).title}
              className="w-full h-48 object-cover rounded-lg transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2">
                <h3 className="text-sm font-semibold">
                  {type === 'anime' ? (item as Anime).title : (item as Movie).title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-gray-800 rounded-full disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>
        
        {[currentPage - 1, currentPage, currentPage + 1].map((page) => (
          page > 0 && (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-full ${
                currentPage === page ? 'bg-white text-black' : 'bg-gray-800 text-white'
              }`}
            >
              {page}
            </button>
          )
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 bg-gray-800 rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full">
            <div className="flex mb-4">
              <img
                src={type === 'anime' ? (selectedItem as Anime).images.jpg.image_url : `https://image.tmdb.org/t/p/w500${(selectedItem as Movie).poster_path}`}
                alt={type === 'anime' ? (selectedItem as Anime).title : (selectedItem as Movie).title}
                className="w-48 h-72 object-cover rounded-lg"
              />
              <div className="ml-6">
                <h3 className="text-xl font-bold mb-2">
                  {type === 'anime' ? (selectedItem as Anime).title : (selectedItem as Movie).title}
                </h3>
                <p className="text-gray-300">
                  {type === 'anime' ? (selectedItem as Anime).synopsis : (selectedItem as Movie).overview}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGrid;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import ContentGrid from './components/ContentGrid';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Anime, Movie } from './types';

function App() {
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trending anime
        const animeResponse = await fetch(`https://api.jikan.moe/v4/top/anime?page=${currentPage}`);
        const animeData = await animeResponse.json();
        setTrendingAnime(animeData?.data?.slice(0, 16) || []);

        // Fetch trending movies
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&page=${currentPage}`
        );

        const movieData = await movieResponse.json();
        setTrendingMovies(movieData?.results?.slice(0, 16) || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) return;

    try {
      // Search anime
      const animeResponse = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&page=1`);
      const animeData = await animeResponse.json();
      setTrendingAnime(animeData?.data?.slice(0, 16) || []);

      // Search movies
      const movieResponse = await fetch(
        `https://www.themoviedb.org/documentation/api${import.meta.env.VITE_TMDB_API_KEY}&query=${query}&page=1`
      );
      const movieData = await movieResponse.json();
      setTrendingMovies(movieData?.results?.slice(0, 16) || []);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar onSearch={handleSearch} />

        <main className="pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <Carousel />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <ContentGrid
                    title={searchQuery ? `Search Results for "${searchQuery}"` : "Trending Now"}
                    items={trendingAnime}
                    type="anime"
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            } />
            <Route path="/category/:type" element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ContentGrid
                  title="Category Results"
                  items={trendingAnime}
                  type="anime"
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            } />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
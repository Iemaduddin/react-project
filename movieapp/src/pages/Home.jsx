// File: src/pages/Home.jsx
import { useEffect, useState } from "react";
import { fetchMovies } from "../api/tmdb";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [popular, setPopular] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);

  useEffect(() => {
    fetchMovies(query, page).then((data) => {
      let results = data.results || [];
      if (selectedGenre) {
        results = results.filter((movie) => movie.genre_ids.includes(selectedGenre));
      }
      if (ratingFilter) {
        results = results.filter((movie) => movie.vote_average >= ratingFilter);
      }
      setMovies(results);
      setTotalPages(data.total_pages || 1);
    });
  }, [query, page, selectedGenre, ratingFilter]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&page=1`)
      .then((res) => res.json())
      .then((data) => setPopular(data.results.slice(0, 5)));

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchBar onChange={(q) => setQuery(q)} />

      {popular.length > 0 && (
        <div className="my-6">
          <Carousel autoPlay infiniteLoop interval={4000} showThumbs={false} showStatus={false} showIndicators={true}>
            {popular.map((movie) => (
              <div key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className="h-[300px] w-full object-cover rounded" />
                <p className="legend bg-black bg-opacity-50 text-white text-sm">{movie.title}</p>
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* Genre Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setSelectedGenre(null)} className={`px-3 py-1 rounded ${selectedGenre === null ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          All Genres
        </button>
        {genres.map((genre) => (
          <button key={genre.id} onClick={() => setSelectedGenre(genre.id)} className={`px-3 py-1 rounded ${selectedGenre === genre.id ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            {genre.name}
          </button>
        ))}
      </div>

      {/* Rating Filter */}
      <div className="flex gap-2 mb-6 items-center">
        <span className="text-sm">Minimum Rating:</span>
        {[5, 6, 7, 8, 9].map((r) => (
          <button key={r} onClick={() => setRatingFilter(r)} className={`px-2 py-1 rounded text-sm ${ratingFilter === r ? "bg-yellow-500 text-white" : "bg-gray-100"}`}>
            {r}+
          </button>
        ))}
        {ratingFilter && (
          <button onClick={() => setRatingFilter(null)} className="ml-2 text-sm text-red-600">
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
}

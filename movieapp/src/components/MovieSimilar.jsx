import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieModal from "./MovieModal";

export default function MovieSimilar() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, [id]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Similar Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <button key={movie.id} onClick={() => setSelectedMovie(movie)} className="bg-white p-3 rounded shadow hover:bg-gray-50 text-left">
            <p className="font-medium text-gray-800 truncate">{movie.title}</p>
          </button>
        ))}
      </div>
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}

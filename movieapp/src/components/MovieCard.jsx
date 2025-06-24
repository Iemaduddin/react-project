import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`} className="block bg-white rounded shadow hover:shadow-md overflow-hidden">
      <img src={posterUrl} alt={movie.title} className="w-full h-72 object-cover" />
      <div className="p-2 text-sm font-semibold text-center truncate">{movie.title}</div>
    </Link>
  );
}

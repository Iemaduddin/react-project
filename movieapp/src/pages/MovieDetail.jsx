// File: src/pages/MovieDetail.jsx
import { useEffect, useState } from "react";
import { useParams, NavLink, Outlet, Link } from "react-router-dom";
import { fetchMovieDetail, fetchMovieVideos } from "../api/tmdb";
import TrailerModal from "../components/TrailerModal";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    fetchMovieDetail(id)
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchMovieVideos(id).then((vids) => {
      const trailer = vids.find((v) => v.type === "Trailer" && v.site === "YouTube");
      setTrailerKey(trailer?.key || null);
    });
  }, [id]);

  const handleShowTrailer = () => {
    if (trailerKey) {
      setShowTrailer(true);
    } else {
      alert("Trailer tidak tersedia.");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (!movie) return <p className="text-center mt-4">Movie not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mt-10 text-center">
        <Link to="/" className="text-blue-500 underline hover:text-blue-700 text-sm">
          ⬅ Kembali ke Home
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg p-4">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full md:w-1/3 object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">{movie.title}</h1>
          <p className="text-sm text-gray-600 mb-2">Released: {movie.release_date}</p>
          <p className="text-gray-800 mb-4 text-justify">{movie.overview}</p>
          <p className="text-sm text-yellow-600 font-medium mb-4">⭐ {movie.vote_average} / 10</p>

          <button onClick={handleShowTrailer} className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            🎬 Lihat Trailer
          </button>

          <div className="mt-4 space-x-6 border-t pt-4 text-sm">
            <NavLink to="cast" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600")}>
              Cast
            </NavLink>
            <NavLink to="similar" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600")}>
              Similar
            </NavLink>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>

      <TrailerModal isOpen={showTrailer} onClose={() => setShowTrailer(false)} videoKey={trailerKey} />
    </div>
  );
}
